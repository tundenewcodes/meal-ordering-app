import  React from 'react'

const CartContext = React.createContext({
    // values passed below are only needed for the IDE
    items : [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart : () => { }
})


export default CartContext