import "./style.scss";
import cn from 'classnames';
import YeBg from "../../../assets/button-bg-ye.svg"
import BlBg from "../../../assets/button-bg-bl.svg"

export const Button = ({ className, text, variant, width, height, onClick }) => {
  return (
    <div className={cn(`btn-group ${className}`, {
      "yellow": !variant || variant === "yellow",
      "blue": variant === "blue"
    })} style={{ width, height, marginTop: (height / 100) * 10 }}>
      <img className="btn-bg" src={
        !variant || variant === "yellow" ? YeBg : BlBg
      } alt="" />
      <button className="main-btn" style={{ fontSize: (height / 100) * 25, paddingTop: (height / 100) * 14 }} onClick={onClick}>
        {text}
      </button>
    </div>
  )
}