import { useState } from "react";
import Counter from './Counter'
export default function CounterDisplay(){
    const [count,setCount]=useState(0);
    function counterIncrement(value){
        setCount(count+value);
    }
    function counterDecrement(value){
        setCount(count-value);
    }
    function reset(){
        setCount(0);
    }
    
    return(
        <>
        <Counter value={1} counterIncrement={counterIncrement} counterDecrement={counterDecrement}></Counter>
        <Counter value={2} counterIncrement={counterIncrement} counterDecrement={counterDecrement}></Counter>
        <Counter value={5} counterIncrement={counterIncrement} counterDecrement={counterDecrement}></Counter>
        <div className="counter" >{count}</div>
        <button className="reset" onClick={reset}>Reset</button>        
        </>
    );

}