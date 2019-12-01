import React from 'react'
import { useForm } from './useForm'

export const Entry = () => {

    const [values, handleChange] = useForm({principle:"", interest: "", duration: "" })
        // console.log(values)

        let data = {}

    const runCals = (vals) => {
        let iterations = vals.duration
        let monthInt = parseFloat(vals.interest) / 1200.0
        let calcPrinciple = vals.principle
        let remainingMonths = vals.duration
        
        for( let i = 0;i< iterations;i++){
           
                let compoundInt = (1+ monthInt )**(remainingMonths-i)
                let multiplier = (monthInt * compoundInt) / (compoundInt - 1)
                let payment = Math.round(multiplier * calcPrinciple * 100) /100 
                let interest = Math.round(calcPrinciple * monthInt * 100) / 100
                let principlePay = Math.round((payment - interest) * 100) /100
            if (payment > calcPrinciple){
                payment = calcPrinciple 
                interest = Math.round(calcPrinciple * monthInt * 100) / 100
                principlePay = Math.round((payment - interest) * 100) / 100
                calcPrinciple = Math.round((calcPrinciple - payment) * 100) / 100
            } else {
                calcPrinciple = Math.round((calcPrinciple - principlePay) * 100) /100

            }




                data[`months${i}`] = {payment, interest, principlePay, calcPrinciple}
                
                // console.log(iterations, monthInt, compoundInt, multiplier, payment, interest, principlePay)
            }
            console.log(data)
            return data
    }


    return (
    <>
        <div>Enter Loan Information</div>
        <div className="entryGrid">

            <label>New Loan Amount:
                <input type='text' name="principle" value={values.principle} onChange={handleChange}></input>
            </label>
            <label> Enter Interest Rate (ex. 7.5):
                <input type='text' name="interest" value={values.interest} onChange={handleChange}></input>
            </label>
            <label> Enter Duration in Months(ex. 360):
                <input type='text' name="duration" value={values.duration} onChange={handleChange}></input>
            </label>
        </div>
            <button onClick={() => runCals(values) }>Calculate</button>
            
    </>

    )
}

//mortgage calculation

//M = P[r(1+r)^n/((1+r)^n)-1]
// M = monthly Payment
// P = Principal loan amount
// r = monthly interst rate (interst / 12)
// n = number of payments over the course of loan 