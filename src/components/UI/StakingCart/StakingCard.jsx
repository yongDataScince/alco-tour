import Button from "../Button"
import "./styles.scss"

export const StakingCard = ({ src, name }) => {
  return (
    <div className="staking-card">
      <img src={src} alt="" />
      <p className="staking-card__name">{name}</p>
      <div className="staking-card__btn-group">
        <Button className="staking-card__btn" text='claim' />
      </div>
    </div>
  )
}