import React from "react"
import classes from "./Input.module.css"

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        type={props.input.type}
        defaultValue={props.input.value}
        min={props.input.min}
        max={props.input.max}
        step={props.input.step}
        id={props.input.id}
        ref = {ref}
      />
    </div>
  )
})

export default Input
