import React,{useContext, useEffect, useState} from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../CART/CartIcon'
import CartContext from '../../contextStore/cart-context'

const HeaderCartButton = (props) => {
  const[btnHighlighted, setBtnHighlighted] = useState(false)
  const cartCtx  = useContext(CartContext)

 const  numberofCartItems = cartCtx.items.reduce((currentNum, Item) => {
    return currentNum + Item.amount
  },0) 

  const buttonClass = `${classes.button} ${btnHighlighted ? classes.bump : ''}`
  const{items} = cartCtx
  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnHighlighted(true)
   const timer = setTimeout(() => { setBtnHighlighted(false) }, 300)
    
    return (() => {
      clearTimeout(timer)
    })
  },[items])
  return (
    <button className={buttonClass} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span> 
      <span>YOUR CART</span>
      <span className={classes.badge}>{numberofCartItems}</span>
    </button>
  )
}

export default HeaderCartButton