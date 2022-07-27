import React, { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
  items: [],
  totalAmount: 0,
}
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const UpdatedAmount =
      state.totalAmount + action.item.price * action.item.amount
    //this is to group item selected more than once
    const existingFoodItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )
    const existingFoodItem = state.items[existingFoodItemIndex]
    let UpdatedItems

    if (existingFoodItem) {
      const updatedItem = {
        ...existingFoodItem,
        amount: existingFoodItem.amount + action.item.amount,
      }
      UpdatedItems = [...state.items]
      UpdatedItems[existingFoodItemIndex] = updatedItem
    } else {
      UpdatedItems = state.items.concat(action.item)
    }
    return {
      items: UpdatedItems,
      totalAmount: UpdatedAmount,
    }

  }
  if (action.type === 'REMOVE_ITEM') {
   const existingFoodItemIndex = state.items.findIndex(
     (item) => item.id === action.id
    )
    const existingFoodItem = state.items[existingFoodItemIndex]
    const UpdatedAmount = state.totalAmount - existingFoodItem.price
    let updatedItems
    if (existingFoodItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      const updatedItem = { ...existingFoodItem, amount: existingFoodItem.amount - 1 }
      updatedItems = [...state.items]
      updatedItems[existingFoodItemIndex] = updatedItem
    }
    return {
      items: updatedItems,
      totalAmount: UpdatedAmount,
    }
  }
  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  return defaultCartState;
}

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )
  const addItemstocartHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    })
  }
  const removeItemsfromcartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    })
  }
  const clearCartHandler = () => {
  dispatchCartAction({type : 'CLEAR'})
}
  const cartContexts = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemstocartHandler,
    removeItem: removeItemsfromcartHandler,
    clearCart : clearCartHandler
  }
  return (
    <CartContext.Provider value={cartContexts}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
