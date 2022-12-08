import "./styles.scss"

export const StakingCard = ({ src, name, action }) => {
    
  return (
    <div className="staking-card">
      <p className="staking-card__name">{name}</p>
      <img src={src} alt="" />
    </div>
  )
}