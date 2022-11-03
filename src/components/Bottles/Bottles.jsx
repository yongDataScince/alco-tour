import "./styles.scss"
import chest from "../../assets/bottle_chest.png";
import Button from "../UI/Button";

export const Bottles = () => {
  return (
    <div className="bottles__main">
      <div className="bottles__main-box">
        <img src={chest} alt="" />
        <Button text="Open Rum Box" width="100%" height={70} variant="blue" />
      </div>
      <div className="bottles__main-box">
        <img src={chest} alt="" />
        <Button text="Open Rum Box" width="100%" height={70} variant="blue" />
      </div>
      <div className="bottles__main-box">
        <img src={chest} alt="" />
        <Button text="Open Rum Box" width="100%" height={70} variant="blue" />
      </div>
    </div>
  )
}