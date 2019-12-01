import React from 'react'
import { useForm } from './useForm'

export const Entry = () => {

    const [values, handleChange] = useForm({principle:"", interest: "", duration: "" })
        console.log(values)

    const runCals = (vals) => {
        let iterations = vals.duration
        let monthInt = parseFloat(vals.interest) / 1200.0

        console.log(iterations, monthInt)
    }


    return (
    <>
        <div>Enter Loan Information</div>
        <div className="entryGrid">

            <label>New Loan Amount:
                <input type='text' name="loanAmt" value={values.principle} onChange={handleChange}></input>
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