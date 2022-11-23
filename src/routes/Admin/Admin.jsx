import Input from "../../components/UI/Input"
import Button from "../../components/UI/Button"

import "./styles.scss"
import { useDispatch, useSelector } from "react-redux"
import { adminFunction } from "../../store"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Admin = () => {
  const dispatch = useDispatch();
  const { isAdmin, activePreSale, activeSale } = useSelector((state) => state.contracts);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAdmin);
    if (!isAdmin) navigate('/')
  }, [isAdmin, navigate])

  const [values, setValues] = useState({
    whiteList: '',
    stakingTime: '',
    boxInfo: {
      typeBox: '',
      amountNftBox: '',
      presalePrice: '',
      salePrice: '',
      tokenIdBox: '',
      lastTokenIdBox: '',
      presaleAmount: ''
    },
    saleTime: '',
    preSaleTime: '',
    baseUri: '',
    limitBox: '',
    boxTime: '',
    boxActiveTime: '',
    withdrawAddr: '',
  });

  return (
    <div className="admin-main">
      <p className="admin-main__text">Always Remember the Secret Rule#77 of the Pirate Codex</p>
      <p className="admin-main__title">Alco Trip Team is the best in the whole Open Sea!</p>
      <div className="admin-main__block">
        <div className="admin-main__row">
          <div className="admin-main__block-input_group">
            <p className="admin-main__block-input_group--title">NFT Box</p>
            
            <p className="admin-main__block-input_group--label">White List</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} onChange={(e) => setValues({
                ...values,
                whiteList: [[e.target.value.replace(' ', '').split(',')]]
              })} value={values.whiteList} />
              <Button width={290} height={77} text="Add White List" variant="blue" onClick={() => {
                dispatch(adminFunction({ method: 'addWhitelist', contract: 'nftBoxContract', args: values.whiteList }))
              }} />
            </div>

            <p className="admin-main__block-input_group--label">Box Info</p>
            <div className="admin-main__block-input_group--inp-block column">
              <div className="multy-inputs">
                <Input width={380} height={77} value={values.boxInfo.typeBox} onChange={(e) => setValues({
                  ...values,
                  boxInfo: {
                    ...values.boxInfo,
                    typeBox: e.target.value
                  }
                })} />
                <Input width={380} height={77} value={values.boxInfo.amountNftBox} onChange={(e) => setValues({
                  ...values,
                  boxInfo: {
                    ...values.boxInfo,
                    amountNftBox: e.target.value
                  }
                })}/>
                <Input width={380} height={77} value={values.boxInfo.presalePrice} onChange={(e) => setValues({
                  ...values,
                  boxInfo: {
                    ...values.boxInfo,
                    presalePrice: e.target.value
                  }
                })}/>
                <Input width={380} height={77} value={values.boxInfo.salePrice} onChange={(e) => setValues({
                  ...values,
                  boxInfo: {
                    ...values.boxInfo,
                    salePrice: e.target.value
                  }
                })}/>
                <Input width={380} height={77} value={values.boxInfo.tokenIdBox} onChange={(e) => setValues({
                  ...values,
                  boxInfo: {
                    ...values.boxInfo,
                    tokenIdBox: e.target.value
                  }
                })}/>
                <Input width={380} height={77} value={values.boxInfo.presaleAmount} onChange={(e) => setValues({
                  ...values,
                  boxInfo: {
                    ...values.boxInfo,
                    presaleAmount: e.target.value
                  }
                })}/>
              </div>
              <Button width={290} height={77} text="Set Box Info" variant="blue" className="mlt-btn" onClick={() => {
                dispatch(adminFunction({ method: 'setBoxInfo', contract: 'nftBoxContract', args: Object.values(values.boxInfo) }))
              }} />
            </div>

            <p className="admin-main__block-input_group--label">Base URL</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} value={values.baseUri} onChange={(e) => setValues({
                ...values,
                baseUri: e.target.value
              })} />
              <Button width={290} height={77} text="Set Base URL" variant="blue" onClick={() => {
                dispatch(adminFunction({ method: 'setBaseURI', contract: 'nftBoxContract', args: values.baseUri }))
              }} />
            </div>
            
            <p className="admin-main__block-input_group--label">Limit box</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} value={values.limitBox} onChange={(e) => setValues({
                ...values,
                limitBox: e.target.value               
              })} />
              <Button width={290} height={77} text="Set Limit Box" variant="blue" onClick={() => {
                dispatch(adminFunction({ method: 'setLimitBox', contract: 'nftBoxContract', args: values.limitBox }))
              }} />
            </div>

            <p className="admin-main__block-input_group--label">Time</p>
            <div className="admin-main__block-input_group--inp-block column">
              <div className="multy-inputs">
                <Input width={380} height={77} value={values.saleTime} onChange={(e) => setValues({
                  ...values,
                  saleTime: e.target.value
                })} />
                <Input width={380} height={77} value={values.preSaleTime} onChange={(e) => setValues({
                  ...values,
                  preSaleTime: e.target.value
                })} />
              </div>
              <Button width={290} height={77} text="Set Time" variant="blue" className="mlt-btn" onClick={() => {
                dispatch(adminFunction({ method: 'setTime', contract: 'nftBoxContract', args: [values.saleTime, values.preSaleTime] }))
              }} />
            </div>

            <p className="admin-main__block-input_group--label">Active Time</p>
            <div className="admin-main__block-input_group--inp-block">
              <Button text={activePreSale ? 'Deactivate presale' : 'Activate presale'} variant={activePreSale ? 'yellow' : 'blue'} onClick={() => {
                dispatch(adminFunction({ method: 'setActiveTime', contract: 'nftBoxContract', args: [activeSale, !activePreSale] }))
              }} />
              <Button text={activeSale ? 'Deactivate sale' : 'Activate sale'}  variant={activeSale ? 'yellow' : 'blue'} onClick={() => {
                dispatch(adminFunction({ method: 'setActiveTime', contract: 'nftBoxContract', args: [!activeSale, activePreSale] }))
              }} />
            </div>

            <p className="admin-main__block-input_group--label">Withdraw</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} value={values.withdrawAddr} onChange={(e) => {
                setValues({
                  ...values,
                  withdrawAddr: e.target.value
                })
              }} />
              <Button width={290} height={77} text="Withdraw" variant="blue" onClick={() => {
                dispatch(adminFunction({ method: 'withdraw', contract: 'nftBoxContract', args: values.withdrawAddr }))           
              }} />
            </div>

            <p className="admin-main__block-input_group--label">Withdraw All</p>
            <div className="admin-main__block-input_group--inp-block">
              <Button width={290} height={77} text="Withdraw All" variant="blue" onClick={() => {
                dispatch(adminFunction({ method: 'withdrawALl', contract: 'nftBoxContract', args: [] }))           
              }} />
            </div>
          </div>
          <div className="admin-main__block-input_group">
            <p className="admin-main__block-input_group--title">Staking</p>
            
            <p className="admin-main__block-input_group--label">Staking Time</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} value={values.stakingTime} onChange={(e) => {
                setValues({
                  ...values,
                  stakingTime: e.target.value
                })
              }}/>
              <Button width={290} height={77} text="Set Staking Time" variant="blue" onClick={() => {
                dispatch(adminFunction({ method: 'setStakingTime', contract: 'lotteryContract', args: values.stakingTime }))
              }} />
            </div>
          </div>
        </div>

        <div className="admin-main__row">
          <div className="admin-main__block-input_group">
            <p className="admin-main__block-input_group--title">NFT Bottle</p>

            <p className="admin-main__block-input_group--label">Type Bottle Max Volume</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} />
              <Button width={290} height={77} text="Set Type Bottle MV" variant="blue" />
            </div>

            <p className="admin-main__block-input_group--label">Type Bottle ABV</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} />
              <Button width={290} height={77} text="Set Type Bottle ABV" variant="blue" />
            </div>
          </div>
    
          <div className="admin-main__block-input_group">
          <p className="admin-main__block-input_group--title">Lottery</p>

            <p className="admin-main__block-input_group--label">Winner Wp</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} />
              <Button width={290} height={77} text="Calc Winner Wp" variant="blue" />
            </div>
            
            <p className="admin-main__block-input_group--label">Winners Beer</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} />
              <Button width={290} height={77} text="Calc Winners Beer" variant="blue" />
            </div>

            <p className="admin-main__block-input_group--label">Winners Wine</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} />
              <Button width={290} height={77} text="Calc Winners Wine" variant="blue" />
            </div>

            <p className="admin-main__block-input_group--label">Winners Rum</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} />
              <Button width={290} height={77} text="Calc Winners Rum" variant="blue" />
            </div>

            <p className="admin-main__block-input_group--label">Amount Beer</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} />
              <Button width={290} height={77} text="Set Amount Beer" variant="blue" />
            </div>

            <p className="admin-main__block-input_group--label">Amount Wine</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} />
              <Button width={290} height={77} text="Set Amount Wine" variant="blue" />
            </div>

            <p className="admin-main__block-input_group--label">Amount Rum</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} />
              <Button width={290} height={77} text="Set Amount Run" variant="blue" />
            </div>

            <p className="admin-main__block-input_group--label">Amount Wp</p>
            <div className="admin-main__block-input_group--inp-block">
              <Input width={380} height={77} />
              <Button width={290} height={77} text="Set Amount Wp" variant="blue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}