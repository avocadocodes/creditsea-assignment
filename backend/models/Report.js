const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  pan: String,
  creditScore: { type: String, default: "N/A" },
  totalAccounts: Number,
  activeAccounts: Number,
  closedAccounts: Number,
  currentBalance: Number,
  securedAmount: Number,
  unsecuredAmount: Number,
  creditEnquiries: { type: Number, default: 0 },
  creditAccounts: [
    {
      bankName: String,
      accountNumber: String,
      amountOverdue: Number,
      currentBalance: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;
