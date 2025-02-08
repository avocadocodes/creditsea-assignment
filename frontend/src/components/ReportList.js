import React from "react";

const ReportList = ({ reports }) => {
  return (
    <div className="report-list">
      <h2>📑 Uploaded Credit Reports</h2>
      {reports.length === 0 ? (
        <p>No reports uploaded yet.</p>
      ) : (
        reports.map((report, index) => (
          <div key={index} className="report-card">
            <h3>{report.name}</h3>
            <p>📞 Mobile: {report.mobile}</p>
            <p>📄 PAN: {report.pan}</p>
            <p>📊 Total Accounts: {report.totalAccounts}</p>
            <p>💰 Current Balance: ₹{report.currentBalance}</p>
            <h4>🔹 Credit Accounts</h4>
            <ul className="credit-accounts">
              {report.creditAccounts.map((acc, i) => (
                <li key={i}>
                  🏦 {acc.bankName} | A/c: {acc.accountNumber} | Overdue: ₹{acc.amountOverdue}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportList;
