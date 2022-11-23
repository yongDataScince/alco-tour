import { useDispatch } from "react-redux"
import { adminFunction } from "../../store";
import Button from "../UI/Button"
import "./styles.scss"

export const Paper = () => {
  const dispatch = useDispatch();

  return (
    <div className="paper__main">
      <h1 className="font-77 paper__main--title">Registration<br />Pirate Paper Hunting</h1>
      <Button text="Catch your reward!" width={350} height={120} variant="blue" onClick={() => {
        dispatch(adminFunction({ method: 'participateInWpLottery', contract: 'lotteryContract', args: [] }))
      }} />
    </div>
  )
}