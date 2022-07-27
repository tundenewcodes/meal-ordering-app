import React,{useState} from "react"
import Header from "./components/LAYOUTS/Header"
import Meals from "./components/MEALS/Meals"
import Cart from './components/CART/Cart'
import CartContextProvider from "./contextStore/CartContextProvider"
function App() {
  const [showCart, setShowCart] = useState(false)

  const showCarthandler = () => {
    setShowCart(true)
  }
  const hideCarthandler = () => {
    setShowCart(false)
  }
  return (
    <CartContextProvider>
     { showCart && <Cart  onHideCart = {hideCarthandler}/>}
      <Header  onShowCart = {showCarthandler}/>
      <main  onClick={hideCarthandler}>
        <Meals />
      </main>
    </CartContextProvider>
  )
}

export default App
