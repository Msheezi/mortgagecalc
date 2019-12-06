import React from 'react'

const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

 class Entry2 extends React.Component {
     constructor(props){
         super(props)

        this.state = {
            
                principle: "", 
                interest: "", 
                duration: "", 
                extraPay: "", 
                start: "",
                end: "" ,
            calcs:{

            },
            extraCalcs:{

            },
            
        }

        this.runAllCalcs = this.runAllCalcs.bind(this)
        this.renderAmort = this.renderAmort.bind(this)

         }


         handleInput(field){
           return e => {
               this.setState({[field]: e.target.value}
               )
           }  
         }
    
    runCals(){
        let data = {}
        let iterations = this.state.duration
        let monthInt = parseFloat(this.state.interest) / 1200.0
        let calcPrinciple = this.state.principle
        let remainingMonths = this.state.duration
        let totalInt = 0
        let totalPay = 0

        for (let i = 0; i < iterations; i++) {

            let compoundInt = (1 + monthInt) ** (remainingMonths - i)
            let multiplier = (monthInt * compoundInt) / (compoundInt - 1)
            let payment = Math.round(multiplier * calcPrinciple * 100) / 100
            let interest = Math.round(calcPrinciple * monthInt * 100) / 100

            let principlePay = Math.round((payment - interest) * 100) / 100
            if (payment > calcPrinciple) {
                payment = calcPrinciple
                interest = Math.round(calcPrinciple * monthInt * 100) / 100
                principlePay = Math.round((payment - interest) * 100) / 100

                calcPrinciple = Math.round((calcPrinciple - payment) * 100) / 100
                totalInt += interest
                totalPay += payment
            } else {
                calcPrinciple = Math.round((calcPrinciple - principlePay) * 100) / 100
                totalInt += interest
                totalPay += payment
            }

            data[i] = { payment, interest, principlePay, calcPrinciple }
            
        }
        // console.log(data)
        totalInt = formatter.format(totalInt)
        totalPay = formatter.format(totalPay)

        // setInterest(totalInt)
        // setPayments(totalPay)
        // setState(data)
        // console.log(state)
        // debugger
       return  this.setState({ calcs: data })
    }

        runExtraCals(){
            let extraData = {}
            let iterations = this.state.duration
            let monthInt = parseFloat(this.state.interest) / 1200.0
            let calcPrinciple = this.state.principle
            let remainingMonths = this.state.duration
        let totalInt = 0
        let totalPay = 0
            let extra = parseFloat(this.state.extraPay) // will need to change this to reflect the new method
        let compoundInt = (1 + monthInt) ** (remainingMonths)
        let multiplier = (monthInt * compoundInt) / (compoundInt - 1)
        let calcPayment = Math.round(multiplier * calcPrinciple * 100) / 100

            
        for (let i = 0; i < iterations; i++) {
            if (calcPrinciple === 0) {
                return this.setState({ extraCalcs: extraData })
            }
            let interest = Math.round(calcPrinciple * monthInt * 100) / 100
            let displayPayment = Math.round((calcPayment + extra) * 100) / 100

            let principlePay = Math.round(((calcPayment - interest) + extra) * 100) / 100
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

            extraData[i] = { displayPayment, interest, principlePay, calcPrinciple }

        }

            console.log(extraData)
        console.log(extra)
        totalInt = formatter.format(totalInt)
        totalPay = formatter.format(totalPay)

        // setInterest(totalInt)
        // setPayments(totalPay)
        // setExtraState(data)
        // console.log(state)
            
        }

     renderAmort () {
         let input
         let objArr
         
        if (this.state.extraCalcs.hasOwnProperty(0)) {
              input = this.state.extraCalcs
            objArr = Object.keys(input).map(key => {
                return (
                    <>

                        <div className="month" key={key}>{parseInt(key) + 1}</div>
                        <div >{formatter.format(input[key].displayPayment)}</div>
                        <div >{formatter.format(input[key].interest)}</div>
                        <div >{formatter.format(input[key].principlePay)}</div>
                        <div >{formatter.format(input[key].calcPrinciple)}</div>
                    </>

                )
            })

            return objArr 
            }
              
              else { 
                  input = this.state.calcs
        }
             objArr = Object.keys(input).map(key => {
                 return (
                     <>

                         <div className="month" key={key}>{parseInt(key) + 1}</div>
                         <div >{formatter.format(input[key].payment)}</div>
                         <div >{formatter.format(input[key].interest)}</div>
                         <div >{formatter.format(input[key].principlePay)}</div>
                         <div >{formatter.format(input[key].calcPrinciple)}</div>
                     </>
                     
                 )
             })

         return objArr   
         
     }

     whichAmort(){
         
         if (this.state.extraCalcs) {
             return this.state.extraCalcs
         }

             return this.state
         }

     

     runAllCalcs() {
         
        if (this.state.calcs.hasOwnProperty(0)){
            this.setState({calcs:{}})
        } 
        
        if (this.state.extraCalcs.hasOwnProperty(0)){
            this.setState({ extraCalcs: {} })
        }

         if (this.state.extraPay !== "") {
             //    range(values.start, values.end, values.extraPay)
             //    setState(runCals(values))
             //    setExtraState(runCalsExtra(values))
             this.runExtraCals(this.state)
            //  this.runCals(this.state)

             // renderAmort(extraState)



         }
         this.runCals(this.state)
         // renderAmort(state)




         // else {
         //     renderAmort(state)
         // }
     }

     render(){
         
         return (

        
         <>
             <div className="gridcontainer">
             
                <div className="grid-header"  >Enter Loan Information</div>

                     <label className="grid-loan-amt">New Loan Amount or Existing Loan Balance</label>
                    <input className="grid-loan-entry" type='text' name="principle" value={this.state.principle} onChange={this.handleInput("principle")}></input>
                
                     <label className="grid-interest"> Enter Interest Rate (ex. 7.5): </label>
                     <input className="grid-interest-entry" type='text' name="interest" value={this.state.interest} onChange={this.handleInput("interest")}></input>
                
                     <label className="grid-duration"> Enter Duration in Months (ex. 360): </label >
                     <input className="grid-duration-entry" type='text' name="duration" value={this.state.duration} onChange={this.handleInput("duration")}></input>
               
               </div>
                <br/>
                <div className="extra-pay-grid">
                
                <div className="grid-extra-header">Enter Extra Monthly Payments: </div>
                        <label>Entry</label>
                        <label>Extra Payment</label>
                        <label>Starting Month</label>
                        <label>Ending Month</label>
                        <label>1</label>
                            <input></input>
                            <input></input>
                            <input></input>
                            
                        <label>2</label>
                            <input></input>
                            <input></input>
                            <input></input>
                            
                        <label>3</label>
                            <input></input>
                            <input></input>
                            <input></input>
                            
                        <label>4</label>
                            <input></input>
                            <input></input>
                            <input></input>
                            
                     
                     {/* <label className="grid-extra1">  </label>
                    <input type='number' name="extraPay" value={this.state.extraPay} onChange={this.handleInput("extraPay")}></input>
                     <label className="grid-extra2">  </label>
                    <input type='number' name="extraPay" value={this.state.extraPay} onChange={this.handleInput("extraPay")}></input>
                     <label className="grid-extra3">  </label>
                    <input type='number' name="extraPay" value={this.state.extraPay} onChange={this.handleInput("extraPay")}></input>
                     <label className="grid-extra4">  </label>
                    <input type='number' name="extraPay" value={this.state.extraPay} onChange={this.handleInput("extraPay")}></input>
                */}
{/* 
                     <label className="grid-start"> Extra Monthly Payments Start: </label>
                    <input type='text' name="start" value={this.state.start} onChange={this.handleInput("start")}></input>
                
                     <label className="grid-end"> Extra Monthly Payments End: </label>
                    <input type='text' name="end" value={this.state.end} onChange={this.handleInput("end")}></input> */}
                
             </div>
             
                 <button id="calc-button" onClick={this.runAllCalcs }>Calculate</button>
             {/* <button onClick={}>Calculate</button> */}
             {/* <div>Total Interest Paid: {interest ? interest : ""} </div>
             <div>Total Payments: {payments ? payments : ""} </div>
             <br />
             {/* <div className="gridcontainer"> */}

             <div className="flexcontainer">
                 <div className="header">Month</div>
                 <div className="header">Payment</div>
                 <div className="header">Interest</div>
                 <div className="header">Principal</div>
                 {/* <div className="month-header">ExtraPayment</div> */}
                 <div className="header">Balance</div>

                 { this.renderAmort()}

             </div>

             </>)
     }

     }
 

     export default Entry2