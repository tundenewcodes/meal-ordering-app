import React from "react"
import ReactDOM from "react-dom"
import classes from "./Modal.module.css"

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart}></div>
}
const ModalOverlays = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}
const portalElem = document.getElementById("overlays")
const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCloseCart={props.onCloseCart} />,
        portalElem
      )}
      {ReactDOM.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        portalElem
      )}
    </React.Fragment>
  )
}

export default Modal
