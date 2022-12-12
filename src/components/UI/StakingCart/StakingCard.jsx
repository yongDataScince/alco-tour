import "./styles.scss"

export const StakingCard = ({ src, name, action, onClick }) => {
    
  return (
    <div className="staking-card" onClick={onClick}>
      <p className="staking-card__name">{name}</p>
      <img src={src} alt="" />
    </div>
  )
}