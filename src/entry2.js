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
            calcs:{},
            extraCalcs:{},
            calcExtraPay: {},
            ep1: {start: "", end: "", amount: ""},
            ep2: { start: "", end: "", amount: ""},
            ep3: { start: "", end: "", amount: ""},
            ep4: { start: "", end: "", amount: ""},
            runExtras: false,
            calcsTotalInt:"",
            calcsTotalPay:"",
            extraTotalInt:"",
            extraTotalPay:""

        }

        this.runAllCalcs = this.runAllCalcs.bind(this)
        this.renderAmort = this.renderAmort.bind(this)
        this.calculateExtraPayments = this.calculateExtraPayments.bind(this)

         }


         handleInput(field){
           return e => {
               this.setState({[field]: e.target.value}
               )
           }  
         }

         handleExtraInput(field, key){
            return e => {
                let newState = {...this.state[key]}
                newState[field] = e.target.value
                this.setState({[key]: newState})
            }

         }

         calculateExtraPayments(){

            let result = {}

            let ep1 = this.state.ep1 
                for (let i=ep1.start;i<=ep1.end;i++){
                    
                        if (!result[i]) {
                            result[i] = parseFloat(ep1.amount)
                        } else if (result[i]) {
                            result[i] += parseFloat(ep1.amount)
                        }
                    
                    
                }
             let ep2 = this.state.ep2
             for (let i = ep2.start; i <= ep2.end; i++) {
                 
                     if (!result[i]) {
                         result[i] = parseFloat(ep2.amount)
                     } else if (result[i]) {
                         result[i] += parseFloat(ep2.amount)
                     }
                 

             }
             let ep3 = this.state.ep3
             for (let i = ep3.start; i <= ep3.end; i++) {
                 
                     if (!result[i]) {
                         result[i] = parseFloat(ep3.amount)
                     } else if (result[i]) {
                         result[i] += parseFloat(ep3.amount)
                     }
                 

             }
             let ep4 = this.state.ep4
             for (let i = ep4.start; i <= ep4.end; i++) {
                 
                     if (!result[i]) {
                         result[i] = parseFloat(ep4.amount)
                     } else if (result[i]) {
                         result[i] += parseFloat(ep4.amount)
                     }
                 

             }



             this.setState({ calcExtraPay: result, runExtras: true}, () => this.runAllCalcs())

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
        
        totalInt = formatter.format(totalInt)
        totalPay = formatter.format(totalPay)

        // setInterest(totalInt)
        // setPayments(totalPay)
        // setState(data)
        // console.log(state)
        // debugger
       return  this.setState({ calcs: data, calcsTotalInt: totalInt, calcsTotalPay: totalPay })
    }

        runExtraCals(){
            let extraData = {}
            let iterations = this.state.duration
            let monthInt = parseFloat(this.state.interest) / 1200.0
            let calcPrinciple = this.state.principle
            let remainingMonths = this.state.duration
        let totalInt = 0
        let totalPay = 0
            let extra1 = this.state.calcExtraPay
             // will need to change this to reflect the new method
        let compoundInt = (1 + monthInt) ** (remainingMonths)
        let multiplier = (monthInt * compoundInt) / (compoundInt - 1)
        let calcPayment = Math.round(multiplier * calcPrinciple * 100) / 100
            
            
        for (let i = 0; i < iterations; i++) {
            let extra = extra1[i+1] ? extra1[i+1] : 0
            if (calcPrinciple === 0) {
                return this.setState({ extraCalcs: extraData, extraTotalInt: totalInt, extraTotalPay: totalPay })
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

            extraData[i] = { displayPayment, interest, principlePay, calcPrinciple, extra }

        }

        //     console.log(extraData)
        // console.log(extra)
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
                        <div >{formatter.format(input[key].extra)}</div>
                        
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
                         <div >{formatter.format(0)}</div>
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
        //  this.calculateExtraPayments()
        //  this.runExtraCals(this.state)
         
        if (this.state.calcs.hasOwnProperty(0)){
            this.setState({calcs:{}})
        } 
        
        if (this.state.extraCalcs.hasOwnProperty(0)){
            this.setState({ extraCalcs: {} })
        }
        
        //  if ( Object.keys(this.state.calcExtraPay).length > 0)
        if (this.state.runExtras)
          {
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
                     <input type='text' name="epAmount1" value={this.state.ep1.amount} onChange={this.handleExtraInput("amount", "ep1")}></input>
                     <input type='text' name="epStart1" value={this.state.ep1.start} onChange={this.handleExtraInput("start", "ep1")}></input>
                     <input type='text' name="epEnd1" value={this.state.ep1.end} onChange={this.handleExtraInput("end", "ep1")}></input>
                            
                        <label>2</label>
                     <input type='text' name="epAmount2" value={this.state.ep2.amount} onChange={this.handleExtraInput("amount", "ep2")}></input>
                     <input type='text' name="epStart2" value={this.state.ep2.start} onChange={this.handleExtraInput("start", "ep2")}></input>
                     <input type='text' name="epEnd2" value={this.state.ep2.end} onChange={this.handleExtraInput("end", "ep2")}></input>
                            
                        <label>3</label>
                     <input type='text' name="epAmount3" value={this.state.ep3.amount} onChange={this.handleExtraInput("amount", "ep3")}></input>
                     <input type='text' name="epStart3" value={this.state.ep3.start} onChange={this.handleExtraInput("start", "ep3")}></input>
                     <input type='text' name="epEnd3" value={this.state.ep3.end} onChange={this.handleExtraInput("end", "ep3")}></input>
                            
                        <label>4</label>
                     <input type='text' name="epAmount4" value={this.state.ep4.amount} onChange={this.handleExtraInput("amount", "ep4")}></input>
                     <input type='text' name="epStart4" value={this.state.ep4.start} onChange={this.handleExtraInput("start", "ep4")}></input>
                     <input type='text' name="epEnd4" value={this.state.ep4.end} onChange={this.handleExtraInput("end", "ep4")}></input>
                            
                                                        
             </div>
             
                 <button id="calc-button" onClick={this.calculateExtraPayments }>Calculate</button>


                 <div style={{display: "grid" }}> 
                     Summary: 
                    <div>{this.state.calcsTotalInt}</div>
                    <div>{this.state.calcsTotalPay}</div>
                    <div>{this.state.extraTotalInt}</div>
                    <div>{this.state.extraTotalPay}</div>
                     
                        
                 </div>
           
             <div className="flexcontainer">
                 <div className="header">Month</div>
                 <div className="header">Payment</div>
                 <div className="header">Interest</div>
                 <div className="header">Principal</div>
                 <div className="header">ExtraPayment</div>
                 <div className="header">Balance</div>

                 { this.renderAmort()}

             </div>

             </>)
     }

     }
 

     export default Entry2