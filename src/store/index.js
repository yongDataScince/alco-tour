import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Contract, ethers } from 'ethers'
import NFTBox from "../assets/abi/NFTBox.json"
import NFTBottle from "../assets/abi/NFTBottle.json"
import BottleStaking from "../assets/abi/BottleStaking.json"
import Lottery from "../assets/abi/Lottery.json"


const initialContractsState = {
  nftBoxContract: Contract,
  nftBottleContract: Contract,
  bottleStakingContract: Contract,
  lotteryContract: Contract
}

export const initContracts = createAsyncThunk("contracts/init-contracts", async () => {
  const provider = await ethers.providers.getDefaultProvider()
  const nftBoxContract = new ethers.Contract('0x1E53d88f5599D6E297306C645Af00179183e7E64', NFTBox.abi, provider)
  const nftBottleContract = new ethers.Contract('0xa30a01083d91Ca190870BeC5F063da1560389F71', NFTBottle.abi, provider)
  const bottleStakingContract = new ethers.Contract('0x4bccb5A735DBb06C187d011ADF82f4109D85692e', BottleStaking.abi, provider)
  const lotteryContract = new ethers.Contract('0x7Ac5b0cbf28E5CD820ADcB68abAFC50C4249998A', Lottery.abi, provider)
})

export const lotteryResult = createAsyncThunk("contracts/lottery-result", async () => {

})

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState: initialContractsState
})

export default configureStore({
  reducer: {},
})