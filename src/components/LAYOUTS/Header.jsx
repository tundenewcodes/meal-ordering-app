import React from "react"
import imgSrc from "../../ASSET/meals.jpg"
import classes from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton"
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
              <h2>MY_MEALAPP</h2>
              <HeaderCartButton onShowCart = {props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={imgSrc} alt="a table of food varieties" />
      </div>
    </React.Fragment>
  )
}

export default Header
