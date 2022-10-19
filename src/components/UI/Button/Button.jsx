import "./style.scss";
import cn from 'classnames';
import YeBg from "../../../assets/button-bg-ye.svg"
import BlBg from "../../../assets/button-bg-bl.svg"

export const Button = ({ text, variant, width, height }) => {
  return (
    <div className={cn("btn-group", {
      "yellow": !variant || variant === "yellow",
      "blue": variant === "blue"
    })} style={{ width, height, marginTop: (height / 100) * 10 }}>
      <img className="btn-bg" src={
        !variant || variant === "yellow" ? YeBg : BlBg
      } alt="" />
      <button className="main-btn" style={{ fontSize: (height / 100) * 22, paddingTop: (height / 100) * 20 }}>
        {text}
      </button>
    </div>
  )
}