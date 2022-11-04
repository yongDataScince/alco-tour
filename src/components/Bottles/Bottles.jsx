import "./styles.scss"
import chest from "../../assets/bottle_chest.png";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { openBox } from "../../store";

export const Bottles = () => {
  const dispatch = useDispatch();

  return (
    <div className="bottles__main">
      <div className="bottles__main-box">
        <img src={chest} alt="" />
        <Button text="Open Rum Box" width="100%" height={70} variant="blue" onClick={() => {
          dispatch(openBox(1))
        }} />
      </div>
      <div className="bottles__main-box">
        <img src={chest} alt="" />
        <Button text="Open Rum Box" width="100%" height={70} variant="blue" onClick={() => {
          dispatch(openBox(2))
        }} />
      </div>
      <div className="bottles__main-box">
        <img src={chest} alt="" />
        <Button text="Open Rum Box" width="100%" height={70} variant="blue" onClick={() => {
          dispatch(openBox(3))
        }} />
      </div>
    </div>
  )
}