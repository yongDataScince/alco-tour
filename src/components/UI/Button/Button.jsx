import "./style.scss";
import cn from 'classnames';

export const Button = ({ className, text, variant, width, onClick }) => {
  return (
    <button className={
      cn(`main-btn ${className}`, {
        "yellow": !variant || variant === "yellow",
        "blue": variant === "blue"
      })
    } onClick={onClick}>
        <div className="btn_text">
            {text}
        </div>

    </button>
  )
}