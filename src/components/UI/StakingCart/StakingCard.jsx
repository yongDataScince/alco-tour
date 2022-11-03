import "./styles.scss"

export const StakingCard = ({ src, name }) => {
  return (
    <div className="staking-card">
      <img src={src} alt="" />
      <p className="staking-card__name">{name}</p>
      <div className="staking-card__btn-group">
        <button className="staking-card__btn">Claim</button>
        <button className="staking-card__btn blue">Claim</button>
      </div>
    </div>
  )
}