import StakingCart from "../components/UI/StakingCart"
import bg from "../assets/card.png"

export const Staking = () => {
  return (
    <div className="staking">
      <h1 className="font-96">Staking</h1>
      <div className="staking__cards-block">
        <StakingCart src={bg} name="beer" action="stake" />
        <StakingCart src={bg} name="wine" action="stake"/>
        <StakingCart src={bg} name="rum" action="stake"/>
      </div>
    </div>
  )
}