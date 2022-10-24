import Button from "../UI/Button"
import "./styles.scss"

export const Paper = () => {
  return (
    <div className="paper__main">
      <h1 className="font-77 paper__main--title">Registration Pirate Paper Hunting</h1>
      <Button text="Catch your reward!" width={350} height={120} variant="blue" />
    </div>
  )
}