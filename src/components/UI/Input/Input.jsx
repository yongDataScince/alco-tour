import "./style.scss";
import BrImg from "../../../assets/input-border.svg";

export const Input = ({ value, onChange, width, height }) => {
  return (
    <div className="inp-group" style={{ width, height }}>
      <img className="inp-border" src={BrImg} alt="" />
      <input value={value} onChange={onChange} style={{ fontSize: (height / 100) * 22 }} />
    </div>
  )
}