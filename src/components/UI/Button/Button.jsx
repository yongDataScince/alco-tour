import "./style.scss";
import cn from 'classnames';

export const Button = ({ className, text, variant, width, height, onClick }) => {
  return (
    <button className={
      cn(`main-btn ${className}`, {
        "yellow": !variant || variant === "yellow",
        "blue": variant === "blue"
      })
    } style={{ width, height }} onClick={onClick}>
      {text}
    </button>
  )
}