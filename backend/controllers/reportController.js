const multer = require("multer");
const xml2js = require("xml2js");
const Report = require("../models/Report");

// Multer storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to parse XML
const parseXML = async (xmlString) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Upload File and Process Data
const uploadFile = async (req, res) => {
  try {
    const xmlString = req.file.buffer.toString("utf-8");
    const parsedData = await parseXML(xmlString);

    console.log("Parsed XML Data:", JSON.stringify(parsedData, null, 2)); // Debugging line

    const applicantDetails = parsedData?.INProfileResponse?.Current_Application?.Current_Application_Details?.Current_Applicant_Details;
    const summary = parsedData?.INProfileResponse?.CAIS_Account?.CAIS_Summary?.Credit_Account;
    const balance = parsedData?.INProfileResponse?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance;
    const accounts = parsedData?.INProfileResponse?.CAIS_Account?.CAIS_Account_DETAILS || [];

    if (!applicantDetails) {
      return res.status(400).json({ error: "Invalid XML structure: Missing Applicant Details" });
    }

    // Extracting credit accounts data
    const creditAccounts = Array.isArray(accounts)
      ? accounts.map(acc => ({
          bankName: acc?.Subscriber_Name?.trim() || "Unknown",
          accountNumber: acc?.Account_Number?.trim() || "N/A",
          amountOverdue: parseFloat(acc?.Amount_Past_Due) || 0,
          currentBalance: parseFloat(acc?.Current_Balance) || 0,
        }))
      : [];

    // Creating a new report
    const report = new Report({
      name: `${applicantDetails.First_Name || "Unknown"} ${applicantDetails.Last_Name || ""}`,
      mobile: applicantDetails.MobilePhoneNumber || "N/A",
      pan: parsedData?.INProfileResponse?.CAIS_Account?.CAIS_Holder_Details?.Income_TAX_PAN || "N/A",
      creditScore: "N/A",
      totalAccounts: parseInt(summary?.CreditAccountTotal) || 0,
      activeAccounts: parseInt(summary?.CreditAccountActive) || 0,
      closedAccounts: parseInt(summary?.CreditAccountClosed) || 0,
      currentBalance: parseFloat(balance?.Outstanding_Balance_All) || 0,
      securedAmount: parseFloat(balance?.Outstanding_Balance_Secured) || 0,
      unsecuredAmount: parseFloat(balance?.Outstanding_Balance_UnSecured) || 0,
      creditEnquiries: 0,
      creditAccounts
    });

    await report.save();
    res.json({ message: "File processed successfully!", report });

  } catch (error) {
    console.error("Parsing Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Fetch Reports
const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { uploadFile, getReports, upload };
