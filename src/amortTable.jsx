import React from 'react'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export const AmortTable = ({extraCalcs, calcs}) => {
    
        let input
        let objArr

        if (extraCalcs.hasOwnProperty(0)) {
            input = extraCalcs
            objArr = Object.keys(input).map(key => {
                return (
                    <>

                        <div className="month" key={key}>{parseInt(key) + 1}</div>
                        <div >{formatter.format(input[key].displayPayment)}</div>
                        <div >{formatter.format(input[key].interest)}</div>
                        <div >{formatter.format(input[key].principlePay)}</div>
                        <div >{formatter.format(input[key].extra)}</div>

                        <div >{formatter.format(input[key].calcPrinciple)}</div>
                    </>

                )
            })

            return objArr
        }

        else {
            input = calcs
        }
        objArr = Object.keys(input).map(key => {
            return (
                <>

                    <div className="month" key={key}>{parseInt(key) + 1}</div>
                    <div >{formatter.format(input[key].payment)}</div>
                    <div >{formatter.format(input[key].interest)}</div>
                    <div >{formatter.format(input[key].principlePay)}</div>
                    <div >{formatter.format(0)}</div>
                    <div >{formatter.format(input[key].calcPrinciple)}</div>
                </>

            )
        })

        return objArr

    
}

