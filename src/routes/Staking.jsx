import StakingCart from "../components/UI/StakingCart"
import "./styles.scss"
import bg from "../assets/card.png"
import Button from "../components/UI/Button"
import { useDispatch, useSelector } from "react-redux";
import { addTypeIdAct, claimTokens, stakeIds } from "../store";

export const Staking = () => {
  const dispatch = useDispatch();
  const { currendIds } = useSelector((state) => state.contracts)

  return (
    <div className="staking">
      <h1 className="font-96">Staking</h1>
      <div className="staking__cards-block">
        <StakingCart src={bg} name="beer" action="stake" onClick={() => dispatch(addTypeIdAct(1))} />
        <StakingCart src={bg} name="wine" action="stake" onClick={() => dispatch(addTypeIdAct(2))} />
        <StakingCart src={bg} name="rum" action="stake" onClick={() => dispatch(addTypeIdAct(3))} />
      </div>
      <div className="staking--btn-group">
        <Button className="staking--btn" text="stake" variant="yellow" onClick={() => {
          dispatch(stakeIds(currendIds))
        }} />
        <Button className="staking--btn" text="claim" variant="blue" onClick={() => {
          dispatch(claimTokens())
        }} />
      </div>
    </div>
  )
}