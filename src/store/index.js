import { configureStore, createSlice, createAsyncThunk, combineReducers, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import NFTBox from "../assets/abi/NFTBox.json"
import NFTBottle from "../assets/abi/NFTBottle.json"
import BottleStaking from "../assets/abi/BottleStaking.json"
import Lottery from "../assets/abi/Lottery.json"

const initialContractsState = {
  loading: false,
  isAdmin: false,
  provider: null,
  signerAddr: '',
  connected: false,
  activePreSale: false,
  activeSale: false,
  prices: {
    rumPrice: '0.0',
    winePrice: '0.0',
    beerPrice: '0.0'
  },
  accounts: [],
  nftBoxContract: undefined,
  nftBottleContract: undefined,
  bottleStakingContract: undefined,
  lotteryContract: undefined
}

export const disconnect = createAsyncThunk("contracts/disconnect", async () => {})

export const initContracts = createAsyncThunk("contracts/init-contracts", async (prv) => {
  let provider = new ethers.providers.Web3Provider(prv)
  const signer = provider.getSigner();

  const nftBoxContract = new ethers.Contract('0x6c9555AbAED8BAB65e844B661e2c49d97f0E26ba', NFTBox.abi, signer)
  const nftBottleContract = new ethers.Contract('0xC6Ed53E4E65267ac0ad91Df40FEF5680f2C91f91', NFTBottle.abi, signer)
  const bottleStakingContract = new ethers.Contract('0x9B33b710046aD4AD89fd40C6b88DbDb929c78521', BottleStaking.abi, signer)
  const lotteryContract = new ethers.Contract('0x174305fC184D4b0a77e7A1C1105990C6b87d3211', Lottery.abi, signer)

  await nftBoxContract.attach("0x6c9555AbAED8BAB65e844B661e2c49d97f0E26ba")
  await nftBottleContract.attach("0xC6Ed53E4E65267ac0ad91Df40FEF5680f2C91f91")
  await bottleStakingContract.attach("0x9B33b710046aD4AD89fd40C6b88DbDb929c78521")
  await lotteryContract.attach("0x174305fC184D4b0a77e7A1C1105990C6b87d3211")

  const signerAddr = await signer.getAddress()

  const boxOwner = await nftBoxContract.owner();
  const bottleOwner = await nftBottleContract.owner();
  const stakingOwner = await bottleStakingContract.owner();
  const lotteryOwner = await lotteryContract.owner();

  let rumPrice = ethers.utils.formatEther((await nftBoxContract.nftBoxes(1)).salePrice);
  let winePrice = ethers.utils.formatEther((await nftBoxContract.nftBoxes(2)).salePrice);
  let beerPrice = ethers.utils.formatEther((await nftBoxContract.nftBoxes(3)).salePrice);

  if (rumPrice === '0.0' || winePrice === '0.0' || beerPrice === '0.0') {
    rumPrice = ethers.utils.formatEther((await nftBoxContract.nftBoxes(1)).presalePrice);
    winePrice = ethers.utils.formatEther((await nftBoxContract.nftBoxes(2)).presalePrice);
    beerPrice = ethers.utils.formatEther((await nftBoxContract.nftBoxes(3)).presalePrice);
  }

  let activeSale = await nftBoxContract.activeSaleTime();
  let activePreSale = await nftBoxContract.activePresaleTime();


  return {
    isAdmin: boxOwner === signerAddr && bottleOwner === signerAddr && stakingOwner === signerAddr && lotteryOwner === signerAddr,
    signerAddr,
    activePreSale,
    activeSale,
    prices: {
      rumPrice,
      winePrice,
      beerPrice
    },
    nftBoxContract,
    nftBottleContract,
    bottleStakingContract,
    lotteryContract,
    provider
  }
})

export const adminFunction = createAsyncThunk('contracts/admin-func', async ({ method, contract, args }, { getState }) => {
  let { contracts } = getState();

  let currentContract = contracts[contract];

  const tx = await currentContract[method](...args);
  await tx.wait();

  if (method === 'setActiveTime') {
    let activeSale = await currentContract.activeSaleTime();
    let activePreSale = await currentContract.activePresaleTime();
    
    return {
      activeSale,
      activePreSale
    }
  }
})

export const buyBox = createAsyncThunk("contracts/buy-box", async ({ boxType, price }, { getState }) => {
  let { contracts } = getState()

  const tx = await contracts.nftBoxContract.buyBox(1, boxType, { value: ethers.utils.parseEther(price) })
  await tx.wait();
})

export const openBox = createAsyncThunk("contracts/open-box", async (boxType, { getState }) => {
  let { contracts } = getState()
  
  const tx = await contracts.nftBottleContract.openBox(boxType)
  await tx.wait();
})

export const getSelfNFTs = createAsyncThunk('contracts/get-nft', async (_, { getState }) => {
  let { contracts, signerAddr } = getState()
  
  const boxNft = contracts.nftBoxContract
  const bottleNft = contracts.nftBottleContract
  
  const transferFilter = boxNft.filters.BuyBox(null, null)

  console.log(transferFilter);

  const boxTokens = await boxNft.queryFilter(transferFilter)
  console.log(boxTokens);
})

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState: initialContractsState,
  extraReducers: (builder) => {
    builder.addCase(initContracts.fulfilled, (state, { payload }) => {
      state.signerAddr = payload.signerAddr;
      state.activePreSale = payload.activePreSale;
      state.activeSale = payload.activeSale;
      state.prices = payload.prices;
      state.connected = true;
      state.isAdmin = payload.isAdmin;
      state.provider = payload.provider;
      state.bottleStakingContract = payload.bottleStakingContract;
      state.nftBottleContract = payload.nftBottleContract;
      state.lotteryContract = payload.lotteryContract;
      state.nftBoxContract = payload.nftBoxContract;
    })

    builder.addCase(disconnect.fulfilled, (state) => {
      state.signerAddr = '';
      state.connected = false;
      state.isAdmin = false;
      state.provider = null;
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

    builder.addCase(adminFunction.fulfilled, (state, { payload }) => {
      state.activeSale = payload.activeSale;
      state.activePreSale = payload.activePreSale;
    })
    builder.addCase(adminFunction.rejected, (_s, { error }) => {
      console.log(error);
    })

    builder.addMatcher(isPending, (state, action) => {
      state.loading = true
      console.log(action);
    })

    builder.addMatcher(isFulfilled, (state, action) => {
      state.loading = false
      console.log(action);
    })

    builder.addMatcher(isRejected, (state) => {
      state.loading = false
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