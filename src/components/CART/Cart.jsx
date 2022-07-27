import React, { useContext, useState } from "react"
import classes from "./Cart.module.css"
import Modal from "../UI/Modal"
import CartItem from './CartItem'
import CartContext from "../../contextStore/cart-context"
import Checkout from "./Checkout"

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0
  const [isCheckOut, setIsCheckOut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successfulSubmit, setSuccessfulSubmit] = useState(false)
  const onAddItemToCart = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }


  const onRemoveItemFromCart = (id) => {
    cartCtx.removeItem(id)
  }

  const onConfirmHandler = async (dataValue) => {
    setIsSubmitting(true)
    await fetch('https://foodmeal-app-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: dataValue,
        items: cartCtx.items
      })
    })
    setIsSubmitting(false)
    setSuccessfulSubmit(true)
    cartCtx.clearCart()
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={onRemoveItemFromCart.bind(null, item.id)}
          onAdd={onAddItemToCart.bind(null, item)}
        />
      ))}
    </ul>
  )
  const showCheckout = () => {
    setIsCheckOut(true)
  }
  const submittingMsg = <p>please waiting while we submit</p>
  const successMsg = <p>congratulations! your food order has been submitted</p>
  const modalBtn = <div className={classes.actions}>
    <button className={classes["button__alt"]} onClick={props.onHideCart}>Close</button>
    {hasItems && <button className={classes.button} onClick={showCheckout}>Order</button>}
  </div>

  const cartWholePage = <React.Fragment>{cartItems}
    <div className={classes.total}>
      <span> total amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckOut && <Checkout onConfirm={onConfirmHandler} onCancel={props.onHideCart} />}
    {!isCheckOut && modalBtn}</React.Fragment>
  return (
    <Modal onCloseCart={props.onHideCart}>
      {!isSubmitting && !successfulSubmit && cartWholePage}
      {isSubmitting && submittingMsg}
      {!isSubmitting && successfulSubmit && successMsg}
    </Modal>
  )
}

export default Cart
