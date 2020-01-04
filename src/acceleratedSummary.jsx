import React from 'react'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export const Summary = ({ calcsTotalPay, extraTotalPay, calcsTotalInt, extraTotalInt, duration, totalMonths, runExtras }) => {

    if (runExtras) {

        let payDiff = (parseFloat(calcsTotalPay) - parseFloat(extraTotalPay))
        let intDiff = (parseFloat(calcsTotalInt) - parseFloat(extraTotalInt))
        let timeDiff = parseInt(duration) - parseInt(totalMonths)

        return (
            <>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto auto",
                    border: "1px solid black",
                    width: "80%",
                    margin: "10px",
                    padding: "5px"
                }}>
                    <div style={{ gridArea: "1 / span 4", textAlign: "center" }}>Summary</div>
                    <div>Legend</div>
                    <div>As Scheduled </div>
                    <div>Accelerated</div>
                    <div>Difference</div>
                    <div>Payments</div>
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
                </div>
                <br />
                <div>Interest Savings: {formatter.format(intDiff)}  </div>
                <div>Months Paid off Early: {timeDiff}</div>
            </>
        )

    }

}