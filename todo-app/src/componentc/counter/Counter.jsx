import React from "react"; 
export default function Counter({value,counterIncrement,counterDecrement}){
    function countIncrement(){
        counterIncrement(value);
    }
    function countDecrement(){
        counterDecrement(value);
    }
    return(
        <div className="Counter">
            <button className="counterbutton" onClick={countIncrement}>+{value}</button>
            <button className="counterbutton" onClick={countDecrement}>-{value}</button>
        </div>
    );
}