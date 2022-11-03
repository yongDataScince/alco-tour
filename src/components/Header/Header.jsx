import React, { useState } from "react";
import cn from "classnames";
import card from "../../assets/card.png"
import chest from "../../assets/chest.png";
import Button from "../UI/Button";
import "./styles.scss";


export const Header = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="header__main">
      {/* <img src={headerBg} className="header__main-image" alt="" /> */}

      <div className="header__main--title-block">
        <h1 className="font-96">
          Be ready to Drink<br/>and Earn!
        </h1>

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
            <div className="header__main--chests-block">
            <div className="chest-box">
              <img className="chest-box--img" src={chest} alt="" />
              <Button text="Buy Rum Box" variant="blue" height={100} width={230} />
              <button className="buy-btn">2,25 ETH</button>
              <p className="sub-text">The amount on sale: XX</p>
            </div>
            <div className="chest-box">
              <img className="chest-box--img" src={chest} alt="" />
              <Button text="Buy Rum Box" variant="blue" height={100} width={230} />
              <button className="buy-btn">2,25 ETH</button>
              <p className="sub-text">The amount on sale: XX</p>
            </div>
            <div className="chest-box">
              <img className="chest-box--img" src={chest} alt="" />
              <Button text="Buy Rum Box" variant="blue" height={100} width={230} />
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
      </div>
    </div>
  )
}