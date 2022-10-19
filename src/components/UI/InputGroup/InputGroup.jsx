import Button from "../Button"
import { Input } from "../Input/Input"
import "./style.scss"

export const InputGroup = ({ width, height, text, variant, value, onChange }) => {
  return (
    <div className="input-group" style={{ width, height }}>
      <Input width={width} height={height} value={value} onChange={onChange} />
      <Button width={width} height={height} variant={variant} text={text} />
    </div>
  )
}