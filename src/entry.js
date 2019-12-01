import React, {useState} from 'react'
import { useForm } from './useForm'
import {AmortLayout} from './amortLayout'

export const Entry = () => {

    const [state, setState] = useState({})
    const [payments, setPayments] = useState()
    const [interest, setInterest] = useState()

    const [values, handleChange] = useForm({principle:"", interest: "", duration: "", extraPay: "" })
        // console.log(values)
        let data = {}

    const runCals = (vals) => {
        let iterations = vals.duration
        let monthInt = parseFloat(vals.interest) / 1200.0
        let calcPrinciple = vals.principle
        let remainingMonths = vals.duration
        let totalInt = 0
        let totalPay = 0
        
        
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
                totalInt += interest
                totalPay += payment
            } else {
                calcPrinciple = Math.round((calcPrinciple - principlePay) * 100) /100
                totalInt += interest
                totalPay += payment
            }

                data[i] = {payment, interest, principlePay, calcPrinciple}
                // data["totalInterest"] = Math.round(totalInt * 100) / 100
                // data["totalPayments"] = Math.round(totalPay *100) / 100
                
                // console.log(iterations, monthInt, compoundInt, multiplier, payment, interest, principlePay)
            }
            // console.log(data)
        totalInt = Math.round((totalInt * 100) / 100.00)
        totalPay = Math.round((totalPay * 100) / 100.00)

        setInterest(totalInt)
        setPayments(totalPay)
            // setState(data)
            // console.log(state)
            return data
        //    return <AmortLayout props={data}/>
    }


   const renderAmort = (state) => {
      
       if (state) {
        let objArr = Object.keys(state).map(key => {
           return (
<>
            <div key={key}>{key}</div>
            <div >{state[key].payment}</div>
            <div >{ state[key].interest }</div>
            <div >{ state[key].principlePay }</div>
            <div >{ state[key].calcPrinciple }</div>
         </>       
               ) 
       })
       
       return objArr
    }
}

      console.log(payments, interest)

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
            <label> Extra Monthly Payments:
                <input type='text' name="extrapay" value={values.extraPay} onChange={handleChange}></input>
            </label>
        </div>
            <button onClick={() => setState(runCals(values)) }>Calculate</button>
            <div>Total Interest Paid: {interest ? interest : ""} </div>
            <div>Total Payments: {payments ? payments: ""} </div>
            <br/>
            {/* <div className="gridcontainer"> */}
                
            <div className="flexcontainer">
                <div >Month</div>
                <div >Payment</div>
                <div >Interest</div>
                <div >Principal</div>
                {/* <div className="month-header">ExtraPayment</div> */}
                <div >Balance</div>

                    {renderAmort(state)}
                
            </div>
            
    </>

    )
}
