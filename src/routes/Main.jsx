import { Bottles } from "../components/Bottles/Bottles"
import cn from "classnames";
import chest from "../assets/chest.png";
import Button from "../components/UI/Button";
import { Paper } from "../components/Paper/Paper"
import NftCard from "../components/NftCard"

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyBox, getUserNFTs } from "../store";

export const Main = () => {
  const [isActive, setIsActive] = useState(true);
  const { prices, userBottlesNFTs, userBoxesNFTs, beerAmount, rumAmount, wineAmount } = useSelector((state) => state.contracts);
  const dispatch = useDispatch()

  return (
    <>
        <div className="main-page__title">
            Be ready to Drink and Earn!
        </div>
      <div className="buttons">
          <button className={cn("font-24", {
            active: isActive
          })} onClick={() => setIsActive(true)}>Buy NFT</button>
          <button className={cn("font-24", {
            active: !isActive
          })} onClick={() => {
            dispatch(getUserNFTs("all"))
            setIsActive(false)
          }}>My NFT</button>
        </div>

        {
          isActive ? (
            <div className="chests-block">
            <div className="chest-box">
              <img className="chest-box--img" src={chest} alt="" />
              <Button text="Buy Rum Box" className="buy-nft-btn" variant="blue" height={100} width={230} onClick={() => {
                dispatch(buyBox({ boxType: 1, price: prices.rumPrice }))
              }} />
              <button className="buy-btn">{prices.rumPrice} ETH</button>
              <p className="sub-text">The amount on sale: { rumAmount }</p>
            </div>
            <div className="chest-box">
              <img className="chest-box--img" src={chest} alt="" />
              <Button text="Buy Wine Box" className="buy-nft-btn" variant="blue" height={100} width={230} onClick={() => {
                dispatch(buyBox({ boxType: 2, price: prices.winePrice }))
              }} />
              <button className="buy-btn">{prices.winePrice} ETH</button>
              <p className="sub-text">The amount on sale: { wineAmount }</p>
            </div>
            <div className="chest-box">
              <img className="chest-box--img" src={chest} alt="" />
              <Button text="Buy Beer Box" className="buy-nft-btn" variant="blue" height={100} width={230} onClick={() => {
                dispatch(buyBox({ boxType: 3, price: prices.beerPrice }))
              }} />
              <button className="buy-btn">{prices.beerPrice} ETH</button>
              <p className="sub-text">The amount on sale: { beerAmount }</p>
            </div>
          </div>
          ) : (
            userBottlesNFTs.length > 0 || userBoxesNFTs.length > 0 ? (
              <div className="nfts">
                {
                  userBoxesNFTs.map((info) => (
                    <NftCard img={info.url} name={info.name} key={info.id} />
                  ))
                }
              </div>
            ) : (
              <h1 className="no-nft" style={{ color: "#FFF" }}>You're not have any NFTs</h1>
            )
          )
        }
      <Bottles />
      <Button className="lottery" text="Result lottery" width="40%" height={160} />
      <Paper />
    </>
  )
}