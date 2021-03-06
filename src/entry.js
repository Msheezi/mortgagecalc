import React, {useState, useEffect} from 'react'
import { useForm } from './useForm'

export const Entry = () => {

    const [state, setState] = useState({})
    const [extraState, setExtraState] = useState({})
    const [formState, setFormState] = useState({})
    const [payments, setPayments] = useState()
    const [interest, setInterest] = useState()


    const [values, handleChange] = useForm({principle:"", interest: "", duration: "", extraPay: "", start: "", end:"" })
        // console.log(values)
        // let data = {}

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    
    // use the function below to create an array to use in creating
    //extra payments for a particular range of months(indexes) and values for adding 
    // extra payments.  probably do this for each input range
    // const range = (values, start, end, value) => {
    //    let ans = []
    //    if (!values.end){
    //        end = values.duration
    //    }
    //     for (let i=start;i<=end;i++){
    //         ans.push([i, value])
    //     }
        
    // }


    const runCals = (vals) => {

        let data = {}
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
            console.log(data)
        totalInt = formatter.format(totalInt)
        totalPay = formatter.format(totalPay)

        setInterest(totalInt)
        setPayments(totalPay)
            setState(data)
            // console.log(state)
            // debugger
            return data
        //    return <AmortLayout props={data}/>
    }

    const runCalsExtra = (vals) => {
        //add function to combine all the extra payments by index number and sum the 
        //extra payments by index number to add into formula
        //adjust payments to check index and add in the payment value, be sure to add in 
        //the payments for display
        // duplicate function to compare
        // add summary to show the extra payments, reduced number of months and savings
        let data = {}
        let iterations = vals.duration
        let monthInt = parseFloat(vals.interest) / 1200.0
        let calcPrinciple = vals.principle
        let remainingMonths = vals.duration
        let totalInt = 0
        let totalPay = 0
        let extra = parseFloat(vals.extraPay)
        let compoundInt = (1 + monthInt) ** (remainingMonths )
        let multiplier = (monthInt * compoundInt) / (compoundInt - 1)
        let calcPayment = Math.round(multiplier * calcPrinciple * 100) / 100
        
        
        for (let i = 0; i < iterations; i++) {
            if (calcPrinciple === 0){
                return data
            }
            let interest = Math.round(calcPrinciple * monthInt * 100) / 100
            let displayPayment =  Math.round((calcPayment + extra)*100) /100
            
            let principlePay = Math.round(((calcPayment - interest )+ extra )* 100) / 100
            if (calcPayment > calcPrinciple) {
                displayPayment = calcPrinciple
                calcPayment = calcPrinciple
                interest = Math.round(calcPrinciple * monthInt * 100) / 100
                principlePay = Math.round((displayPayment - interest) * 100) / 100

                calcPrinciple = Math.round((calcPrinciple - calcPayment) * 100) / 100
                totalInt += interest
                totalPay += displayPayment
                
            } else {
                
                calcPrinciple = Math.round((calcPrinciple - principlePay) * 100) / 100
                totalInt += interest
                totalPay += displayPayment
            }

            data[i] = { displayPayment, interest, principlePay, calcPrinciple }
           
        }
        
        console.log(data)
        console.log(extra)
        totalInt = formatter.format(totalInt)
        totalPay = formatter.format(totalPay)

        setInterest(totalInt)
        setPayments(totalPay)
        setExtraState(data)
        // console.log(state)
        // debugger
        return data
        //    return <AmortLayout props={data}/>
    }

    
   

   const renderAmort = (input) => {
      
       if (input) {
           let objArr = Object.keys(input).map(key => {
           return (
        <>
            <div className="month" key={key}>{parseInt(key) + 1}</div>
                   <div >{formatter.format(input[key].displayPayment)}</div>
                   <div >{formatter.format(input[key].interest )}</div>
                   <div >{formatter.format(input[key].principlePay )}</div>
                   <div >{formatter.format(input[key].calcPrinciple )}</div>
        </>       
               ) 
       })
       
       return objArr
    }
}
    const whichAmort = () => {
        debugger
        
        if (extraState){
            return extraState
        } else if (state){

            return state
        }
        
    }

    const runAllCalcs = (formState) => {
                  debugger
        if (formState.extraPay !== "") {
            //    range(values.start, values.end, values.extraPay)
            //    setState(runCals(values))
            //    setExtraState(runCalsExtra(values))
            runCals(formState)
            runCalsExtra(formState)
                // renderAmort(extraState)

               

            } 
        setState(runCals(formState))
                // renderAmort(state)
                
            
        
        
        // else {
        //     renderAmort(state)
        // }
    }



//     useEffect(() => {
//         //   debugger
//         if(formState.principle !== ""){
//             console.log("fukk i ran")
//            runAllCalcs(formState)
// // eslint-disable-next-line 
//         }
//     }, [formState]
// )
   
//     useEffect(() => {
//         if (extraState){
//             renderAmort(extraState)
//         } else {
//             renderAmort(state)
//         }


//     }, [state,extraState])

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
                <input type='number' name="extraPay" value={values.extraPay} onChange={handleChange}></input>
            </label>
            <label> Extra Monthly Payments Start:
                <input type='text' name="start" value={values.start} onChange={handleChange}></input>
            </label>
            <label> Extra Monthly Payments End:
                <input type='text' name="end" value={values.end} onChange={handleChange}></input>
            </label>
        </div>
            {/* <button onClick={() => runAllCalcs(values) }>Calculate</button> */}
            <button onClick={() => setFormState(values)}>Calculate</button>
            <div>Total Interest Paid: {interest ? interest : ""} </div>
            <div>Total Payments: {payments ? payments: ""} </div>
            <br/>
            {/* <div className="gridcontainer"> */}
                
            <div className="flexcontainer">
                <div className="header">Month</div>
                <div className="header">Payment</div>
                <div className="header">Interest</div>
                <div className="header">Principal</div>
                {/* <div className="month-header">ExtraPayment</div> */}
                <div className="header">Balance</div>
                    
                    {renderAmort( whichAmort())}
                
            </div>
            
    </>

    )
}
