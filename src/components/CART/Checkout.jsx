import classes from "./Checkout.module.css"
import { useRef, useState } from "react"


const isWellEntered = (value) => value.trim() !== ''
const isFiveChars = value => value.trim().length === 5

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    city: true,
    postal: true,
    street : true
  })
const nameInput = useRef()
const streetInput = useRef()
const postalInput = useRef()
const cityInput = useRef()

const confirmHandler = (event) => {
    event.preventDefault()
    const enteredName = nameInput.current.value
    const enteredStreet = streetInput.current.value
    const enteredPostal = postalInput.current.value
    const enteredCity = cityInput.current.value


    const validName = isWellEntered(enteredName)
    const validStreet = isWellEntered(enteredStreet)
    const validPostal = isFiveChars(enteredPostal)
  const validCity = isWellEntered(enteredCity)
  setFormValidity({
    name: validName,
    street: validStreet,
    postal: validPostal,
    city : validCity
  })
  
  const formIsValid =
    validName &&
    validStreet &&
    validPostal &&
    validCity

  if (!formIsValid) {
    return
   
  }
  console.log('jesus is lord')
 //submit form
  
  props.onConfirm({
    name : enteredName,
    city: enteredCity,
    postal : enteredPostal,
    street : enteredStreet
  })
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler} >
      <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`   }>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formValidity.name && <p>please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formValidity.street && <p>please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${formValidity.postal ? '' : classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInput} />
        {!formValidity.postal && <p>please enter a valid postal address (5 characters longs)</p>}
      </div>
      <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formValidity.city && <p>please enter a city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
