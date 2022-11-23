import { useDispatch } from "react-redux"
import Button from "../Button"
import { adminFunction } from '../../../store/index'
import "./styles.scss"

export const StakingCard = ({ src, name, action }) => {
  const dispatch = useDispatch();
  
  return (
    <div className="staking-card">
      <img src={src} alt="" />
      <p className="staking-card__name">{name}</p>
      <div className="staking-card__btn-group">
        <Button className="staking-card__btn" text={action === 'stake' ? 'stake' : 'claim'} variant={action === 'stake' ? 'yellow' : 'blue'} onClick={() => {
          dispatch(adminFunction({ 
            method: action,
            contract: 'bottleStakingContract',
            args: [
              []
            ]
          }))
        }} />
      </div>
    </div>
  )
}