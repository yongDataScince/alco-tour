import { configureStore, createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import NFTBox from "../assets/abi/NFTBox.json"
import NFTBottle from "../assets/abi/NFTBottle.json"
import BottleStaking from "../assets/abi/BottleStaking.json"
import Lottery from "../assets/abi/Lottery.json"

const initialContractsState = {
  accounts: [],
  nftBoxContract: undefined,
  nftBottleContract: undefined,
  bottleStakingContract: undefined,
  lotteryContract: undefined
}

export const initContracts = createAsyncThunk("contracts/init-contracts", async () => {
  if (!window.ethereum) {
    return {
      error: "No metamask"
    }
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const accounts = await provider.send("eth_requestAccounts", []);

  const nftBoxContract = new ethers.Contract('0x1E53d88f5599D6E297306C645Af00179183e7E64', NFTBox.abi, provider)
  const nftBottleContract = new ethers.Contract('0xa30a01083d91Ca190870BeC5F063da1560389F71', NFTBottle.abi, provider)
  const bottleStakingContract = new ethers.Contract('0x4bccb5A735DBb06C187d011ADF82f4109D85692e', BottleStaking.abi, provider)
  const lotteryContract = new ethers.Contract('0x7Ac5b0cbf28E5CD820ADcB68abAFC50C4249998A', Lottery.abi, provider)

  await nftBoxContract.attach("0x1E53d88f5599D6E297306C645Af00179183e7E64")
  await nftBottleContract.attach("0xa30a01083d91Ca190870BeC5F063da1560389F71")
  await bottleStakingContract.attach("0x4bccb5A735DBb06C187d011ADF82f4109D85692e")
  await lotteryContract.attach("0x7Ac5b0cbf28E5CD820ADcB68abAFC50C4249998A")


  return {
    accounts,
    nftBoxContract,
    nftBottleContract,
    bottleStakingContract,
    lotteryContract
  }
})

export const lotteryResult = createAsyncThunk("contracts/lottery-result", async () => {

})

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState: initialContractsState,
  extraReducers: (builder) => {
    builder.addCase(initContracts.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.bottleStakingContract = payload.bottleStakingContract;
      state.nftBottleContract = payload.nftBottleContract;
      state.lotteryContract = payload.lotteryContract;
      state.nftBoxContract = payload.nftBoxContract;
    })
  }
})

// сюда импортим и вставляем на редусер
const rootReducer = combineReducers({
  contracts: contractsSlice.reducer
});


export default configureStore({
  reducer: rootReducer,
  middleware: (defMiddleware) => defMiddleware({
    serializableCheck: false
  })
})