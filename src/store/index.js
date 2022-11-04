import { configureStore, createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import NFTBox from "../assets/abi/NFTBox.json"
import NFTBottle from "../assets/abi/NFTBottle.json"
import BottleStaking from "../assets/abi/BottleStaking.json"
import Lottery from "../assets/abi/Lottery.json"

const initialContractsState = {
  provider: null,
  accounts: [],
  nftBoxContract: undefined,
  nftBottleContract: undefined,
  bottleStakingContract: undefined,
  lotteryContract: undefined
}

export const initContracts = createAsyncThunk("contracts/init-contracts", async (prv) => {
  let provider = new ethers.providers.Web3Provider(prv)
  const signer = provider.getSigner();

  const nftBoxContract = new ethers.Contract('0x1E53d88f5599D6E297306C645Af00179183e7E64', NFTBox.abi, signer)
  const nftBottleContract = new ethers.Contract('0xa30a01083d91Ca190870BeC5F063da1560389F71', NFTBottle.abi, signer)
  const bottleStakingContract = new ethers.Contract('0x4bccb5A735DBb06C187d011ADF82f4109D85692e', BottleStaking.abi, signer)
  const lotteryContract = new ethers.Contract('0x7Ac5b0cbf28E5CD820ADcB68abAFC50C4249998A', Lottery.abi, signer)

  await nftBoxContract.attach("0x1E53d88f5599D6E297306C645Af00179183e7E64")
  await nftBottleContract.attach("0xa30a01083d91Ca190870BeC5F063da1560389F71")
  await bottleStakingContract.attach("0x4bccb5A735DBb06C187d011ADF82f4109D85692e")
  await lotteryContract.attach("0x7Ac5b0cbf28E5CD820ADcB68abAFC50C4249998A")


  const res = await nftBoxContract.name();
  console.log(res);

  return {
    nftBoxContract,
    nftBottleContract,
    bottleStakingContract,
    lotteryContract,
    provider
  }
})

export const buyBox = createAsyncThunk("contracts/buy-box", async ({ boxType, price }, { getState }) => {
  let { contracts } = getState()

  let numType;

  switch (boxType) {
    case 'rum': {
      numType = 1;
      break;
    }

    case 'wine': {
      numType = 2;
      break;
    }

    default: {
      numType = 3;
    }
  }

  await contracts.nftBoxContract.buyBox(1, numType, { value: ethers.utils.parseEther(price) })
})

export const openBox = createAsyncThunk("contracts/open-box", async (boxType, { getState }) => {
  let { contracts } = getState()
  
  await contracts.nftBottleContract.openBox(boxType)
})

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState: initialContractsState,
  extraReducers: (builder) => {
    builder.addCase(initContracts.fulfilled, (state, { payload }) => {
      state.provider = payload.provider;
      state.bottleStakingContract = payload.bottleStakingContract;
      state.nftBottleContract = payload.nftBottleContract;
      state.lotteryContract = payload.lotteryContract;
      state.nftBoxContract = payload.nftBoxContract;
    })

    builder.addCase(initContracts.rejected, (state, { error }) => {
      console.log(error);
    })

    builder.addCase(buyBox.fulfilled, () => {})

    builder.addCase(buyBox.rejected, (_s, { error }) => {
      console.log(error);
    })

    builder.addCase(openBox.fulfilled, () => {})

    builder.addCase(openBox.rejected, (_s, { error }) => {
      console.log(error);
    })
  }
})

const rootReducer = combineReducers({
  contracts: contractsSlice.reducer
});


export default configureStore({
  reducer: rootReducer,
  middleware: (defMiddleware) => defMiddleware({
    serializableCheck: false
  })
})