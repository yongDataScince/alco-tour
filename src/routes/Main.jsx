import { Bottles } from "../components/Bottles/Bottles"
import cn from "classnames";
import card from "../assets/card.png"
import chest from "../assets/chest.png";
import Button from "../components/UI/Button";
import { Paper } from "../components/Paper/Paper"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { buyBox } from "../store";

export const Main = () => {
  const [isActive, setIsActive] = useState(true);
  const dispatch = useDispatch()

  return (
    <>
      <div className="buttons">
          <button className={cn("font-24", {
            active: isActive
          })} onClick={() => setIsActive(true)}>Buy NFT</button>
          <button className={cn("font-24", {
            active: !isActive
          })} onClick={() => setIsActive(false)}>My NFT</button>
        </div>

        {
          isActive ? (
            <div className="chests-block">
            <div className="chest-box">
              <img className="chest-box--img" src={chest} alt="" />
              <Button text="Buy Rum Box" variant="blue" height={100} width={230} onClick={() => {
                dispatch(buyBox({ boxType: 1, price: '2.25' }))
              }} />
              <button className="buy-btn">2,25 ETH</button>
              <p className="sub-text">The amount on sale: XX</p>
            </div>
            <div className="chest-box">
              <img className="chest-box--img" src={chest} alt="" />
              <Button text="Buy Wine Box" variant="blue" height={100} width={230} onClick={() => {
                dispatch(buyBox({ boxType: 2, price: '2.25' }))
              }} />
              <button className="buy-btn">2,25 ETH</button>
              <p className="sub-text">The amount on sale: XX</p>
            </div>
            <div className="chest-box">
              <img className="chest-box--img" src={chest} alt="" />
              <Button text="Buy Beer Box" variant="blue" height={100} width={230} onClick={() => {
                dispatch(buyBox({ boxType: 3, price: '2.25' }))
              }} />
              <button className="buy-btn">2,25 ETH</button>
              <p className="sub-text">The amount on sale: XX</p>
            </div>
          </div>
          ) : (
            <div className="header__main--self-collection">
              <div className="nft-card">
                <img src={card} alt="" />
                <p className="nft-card--title">Beer #0299</p>
              </div>
              <div className="nft-card">
                <img src={card} alt="" />
                <p className="nft-card--title">Beer #0299</p>
              </div>
              <div className="nft-card">
                <img src={card} alt="" />
                <p className="nft-card--title">Beer #0299</p>
              </div>
            </div>
          )
        }
      <Bottles />
      <Button className="lottery" text="Result lottery" width="40%" height={160} />
      <Paper />
    </>
  )
}