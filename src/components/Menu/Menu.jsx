import { ConnectBtn } from "../ConnectBtn/ConnectBtn"
import cn from "classnames"
import "./styles.scss"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { forwardRef } from "react"

export const Menu = forwardRef(({ opened }, ref) => {
  const { isAdmin } = useSelector((state) => state.contracts)

  return (
    <div ref={ref} className={cn("menu", {
      opened
    })} >
      <ConnectBtn res="mobile" />
      { isAdmin && <Link to="/admin">Admin</Link> }
    </div>
  )
})