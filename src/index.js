import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

var divide = (x,y) => x/y
var multiply = (x,y) => x*y
var minus = (x,y) => x-y
var plus = (x,y) => x+y

function Button(props){
  return (
    <button onClick={() => props.onClick()}>{props.value}</button>
  )
}

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      display: '0',
      num1: 0,
      num2: null,
      op: null,
      newNum: true
    };
  }

  allClear(){
    this.setState({
      display: '0',
      num1: 0,
      num2: null,
      op: null,
      newNum: true
    })
  }

  negate(){
    const display = this.state.display.includes('.') ? parseFloat(this.state.display) : parseInt(this.state.display)
    const num1 = this.state.num1
    const num2 = this.state.num2
    const op = this.state.op

    this.setState({
      display: (display*-1).toString()
    })

    if(op == null){
      this.setState({
        num1: num1*-1
      })
    }
    else{
      this.setState({
        num2: num2*-1
      })
    }
  }

  percent(){
    const display = this.state.display.includes('.') ? parseFloat(this.state.display) : parseInt(this.state.display)
    const num1 = this.state.num1
    const num2 = this.state.num2
    const op = this.state.op

    this.setState({
      display: display/100
    })

    if(op == null){
      this.setState({
        num1: num1/100
      })
    }
    else{
      this.setState({
        num2: num2/100
      })
    }
  }

  addOp(newOp){
    const num1 = this.state.num1
    const num2 = this.state.num2
    const op = this.state.op

    if(num1 != null && op != null && num2 != null){
      this.equal()
      this.setState({
        op: newOp,
        newNum: true
      })
    }
    else{
      this.setState({
        op: newOp,
        newNum: true
      })
    }
  }

  handleClick(i){
    const display = this.state.display
    const op = this.state.op
    const newNum = this.state.newNum

    if(newNum != false){
      this.setState({
        display: i.toString(),
        newNum: false
      })
      
      if(op == null){
        this.setState({
          num1: i
        })
      }
      else{
        this.setState({
          num2: i
        })
      }
    }

    else{
      this.setState({
        display: display + i
      })

      if(op == null){
        this.setState({
          num1: (display+i).includes('.') ? parseFloat(display+i) : parseInt(display+i)
        })
      }
      else{
        this.setState({
          num2: (display+i).includes('.') ? parseFloat(display+i) : parseInt(display+i)
        })
      }
    }
  }

  decimal(){
    const display = this.state.display

    if(display.includes('.')) return

    this.setState({
      display: display+'.'
    })
  }

  equal(){
    const num1 = this.state.num1
    const num2 = this.state.num2
    const op = this.state.op

    if(num1 != null && op != null && num2 != null){
      this.setState({
        display: op(num1, num2).toString(),
        num1: op(num1, num2),
        num2: null,
        op: null,
        newNum: true
      })
    }
  }

  render(){
    const display = this.state.display
    const num1 = this.state.num1
    const op = this.state.op
    const num2 = this.state.num2
    const newNum = this.state.newNum

    return (
      <div>
        <div>{display}</div>
        <div>
          <Button value="AC" onClick={() => this.allClear()} />
          <Button value="+/-" onClick={() => this.negate()} />
          <Button value="%" onClick={() => this.percent()} />
          <Button value="/" onClick={() => this.addOp(divide)} />
        </div>
        <div>
          <Button value="7" onClick={() => this.handleClick(7)}/>
          <Button value="8" onClick={() => this.handleClick(8)}/>
          <Button value="9" onClick={() => this.handleClick(9)}/>
          <Button value="x" onClick={() => this.addOp(multiply)} />
        </div>
        <div>
          <Button value="4" onClick={() => this.handleClick(4)}/>
          <Button value="5" onClick={() => this.handleClick(5)}/>
          <Button value="6" onClick={() => this.handleClick(6)}/>
          <Button value="-" onClick={() => this.addOp(minus)} />
        </div>
        <div>
          <Button value="1" onClick={() => this.handleClick(1)}/>
          <Button value="2" onClick={() => this.handleClick(2)}/>
          <Button value="3" onClick={() => this.handleClick(3)}/>
          <Button value="+" onClick={() => this.addOp(plus)} />
        </div>
        <div>
          <Button value="0" onClick={() => this.handleClick(0)}/>
          <Button value="." onClick={() => this.decimal()} />
          <Button value="=" onClick={() => this.equal()} />
        </div>
        <div>
          {num1} {num2} {newNum ? 'true': 'false'}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Calculator/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
