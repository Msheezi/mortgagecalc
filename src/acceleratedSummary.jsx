import React from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export const Summary = ({
  calcsTotalPay,
  extraTotalPay,
  calcsTotalInt,
  extraTotalInt,
  duration,
  totalMonths,
  runExtras
}) => {
  if (runExtras) {
    let payDiff = parseFloat(calcsTotalPay) - parseFloat(extraTotalPay);
    let intDiff = parseFloat(calcsTotalInt) - parseFloat(extraTotalInt);
    let timeDiff = parseInt(duration) - parseInt(totalMonths);

    return (
      <>
        <div className="summarygrid">
          <div className="header">Summary</div>
          <div> </div>
          <div className="summtitle">As Scheduled </div>
          <div className="summtitle">Accelerated</div>
          <div className="summtitle">Difference</div>
          <div className="summtitle">Payments</div>
          <div>{formatter.format(calcsTotalPay)}</div>
          <div>{formatter.format(extraTotalPay)}</div>

          <div> {formatter.format(payDiff)}</div>
          <div>Interest</div>
          <div>{formatter.format(calcsTotalInt)}</div>
          <div>{formatter.format(extraTotalInt)}</div>
          <div>{formatter.format(intDiff)}</div>
          <div>Time</div>
          <div>{duration}</div>
          <div>{totalMonths}</div>
          <div>{timeDiff}</div>
          <br />
          <div>Interest Savings: {formatter.format(intDiff)} </div>
          <div>Months Paid off Early: {timeDiff}</div>
        </div>
      </>
    );
  }
};
