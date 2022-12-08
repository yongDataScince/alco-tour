import StakingCart from "../components/UI/StakingCart"
import "./styles.scss"
import bg from "../assets/card.png"
import Button from "../components/UI/Button"
import { useDispatch, useSelector } from "react-redux";
import { adminFunction, stakeIds } from "../store";
import { useState } from "react";

export const Staking = () => {
  const dispatch = useDispatch();
  const [ids, setIds] = useState([])

  return (
    <div className="staking">
      <h1 className="font-96">Staking</h1>
      <div className="staking__cards-block">
        <StakingCart src={bg} name="beer" action="stake" onClick={() => setIds()} />
        <StakingCart src={bg} name="wine" action="stake" />
        <StakingCart src={bg} name="rum" action="stake" />
      </div>
      <div className="staking--btn-group">
        <Button className="staking--btn" text="stake" variant="yellow" onClick={() => {
          dispatch(stakeIds(ids))
        }} />
        <Button className="staking--btn" text="claim" variant="blue" onClick={() => {
          dispatch()
        }} />
      </div>
    </div>
  )
}