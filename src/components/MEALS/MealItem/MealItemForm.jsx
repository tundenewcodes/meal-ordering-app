import React,{useRef, useState} from "react"
import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input"

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef()
  
  const submitHandler = (e) => {
    e.preventDefault()
     let enteredAmount = amountInputRef.current.value
   
    const enteredAmountNum = +enteredAmount
    if (enteredAmount.trim().length === 0 || enteredAmountNum > 5 || enteredAmountNum < 1) {
      setAmountIsValid(false)
      return
    }
    props.onAddToCart(enteredAmountNum)
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount" 
        input={{
          id: "amount_"+ props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          value: "1",
        }}
      />
      <button>+Add</button>
      {!amountIsValid && <p>please enter a valid amount (1-5)</p>}
    </form>
  )
}
 
export default MealItemForm
