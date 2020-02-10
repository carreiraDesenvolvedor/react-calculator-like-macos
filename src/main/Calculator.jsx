import React, {Component} from 'react'
import './Calculator.css'

import Button from '../components/button'
import Display from '../components/display'

const initialState = {
    displayValue:'0',
    clearDisplay:false,
    operation: null,
    values: [0,0],
    current:0,
    history:[]
}

export default class Main extends Component {

    state = {...initialState}

    clearMemory = () => {
        this.setState({...initialState})
    }

    setOperation = operation => {

        if(this.state.current === 0){

            this.setState({operation, current: 1, clearDisplay: true})

        }else{

            const equals = operation === '='

            const currentOperation = this.state.operation

            const values = [...this.state.values]

            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            }catch (e){
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0].toFixed(2),
                operation: equals ? null : operation,
                values,
                current:equals ? 0 : 1,
                clearDisplay: !equals

            })

        }


        console.log(operation)

    }

    addDigit = digit => {

        if(digit === '.' && this.state.displayValue.includes('.'))
            return

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue

        const displayValue = currentValue + digit

        console.log(clearDisplay, displayValue)

        this.setState({
            displayValue,
            clearDisplay: false
        })

        if(digit !== '.'){

            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
            console.log(values)
        }


        console.log(digit)
    }

    render(){

        return (

            <div className="calculator">

                <Display value={this.state.displayValue} history={this.state.history} />

                <Button triple label={'AC'} click={this.clearMemory}/>

                <Button operation label={'/'} click={this.setOperation} />

                <Button label={'7'} click={this.addDigit}/>
                <Button label={'8'} click={this.addDigit}/>
                <Button label={'9'} click={this.addDigit}/>

                <Button operation label={'*'} click={this.setOperation} />

                <Button label={'4'} click={this.addDigit}/>
                <Button label={'5'} click={this.addDigit}/>
                <Button label={'6'} click={this.addDigit}/>

                <Button operation label={'-'} click={this.setOperation} />

                <Button label={'1'} click={this.addDigit}/>
                <Button label={'2'} click={this.addDigit}/>
                <Button label={'3'} click={this.addDigit}/>

                <Button operation label={'+'} click={this.setOperation} />

                <Button double label={'0'} click={this.addDigit}/>
                <Button label={'.'} click={this.addDigit}/>

                <Button operation label={'='} click={this.setOperation} />

            </div>

        )

    }

}