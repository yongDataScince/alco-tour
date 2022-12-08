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
  userBottlesNFTs: [],
  userBoxesNFTs: [],
  currentIds: [],
  beerAmount: '-',
  rumAmount: '-',
  wineAmount: '-',
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

export const getUserNFTs = createAsyncThunk("cont/nfts", async (type, { getState }) => {
  let { contracts } = getState();

  let bottles = contracts.nftBottleContract;
  let boxes = contracts.nftBoxContract;


  if (type === 'all') {
    let resBottles = Number(ethers.utils.formatEther(await bottles.balanceOf(contracts.signerAddr)))
    let resBoxes = Number(ethers.utils.formatEther(await boxes.balanceOf(contracts.signerAddr)))

    let bottlesIds = [];
    let boxesIds = [];

    if (resBoxes > 0) {
      let id = 2;
      while (boxesIds.length < resBoxes) {
        let resAddr;
        try {
          resAddr = await boxes.ownerOf(id)
        } catch (error) {
          console.log(error);
          continue;
        }
        if (resAddr === contracts.signerAddr) {
          let nftInfo = {};
          nftInfo.id = id;
          nftInfo.url = await boxes.tokenURI(id);
          nftInfo.name = "#" + String(id).padStart(4, '0')

          boxesIds.push(nftInfo)
        }
        id += 1;
      }
    }

    if (resBottles > 0) {
      let id = 2;
      while (bottlesIds.length < resBottles) {
        let resAddr;
        try {
          resAddr = await bottles.ownerOf(id)
        } catch (error) {
          console.log(error);
          continue;
        }
        if (resAddr === contracts.signerAddr) {
          let nftInfo = {};
          nftInfo.id = id;
          nftInfo.url = bottles.tokenURI(id);
          nftInfo.name = "#" + String(id).padStart(4, '0')

          boxesIds.push(nftInfo)
        }
        id += 1;
      }
    }
  
    return {
      bottlesIds,
      boxesIds
    }
  } else if (type === 'bottle') {
    let bottlesIds = [];
    let id = 2;
    let resBottles = Number(ethers.utils.formatEther(await bottles.balanceOf(contracts.signerAddr)))

    while (bottlesIds.length < resBottles) {
      let resAddr = await bottles.ownerOf(id);
      if (resAddr === contracts.signerAddr) {
        let nftInfo = {};
        nftInfo.id = id;
        nftInfo.url = await bottles.tokenURI(id);
        nftInfo.name = "#" + String(id).padStart(4, '0')

        bottlesIds.push(nftInfo)
      }
      id += 1;
    }

    return {
      bottlesIds
    }
  } else {
    let boxesIds = [];
    let id = 2;
    let resBoxes = Number(ethers.utils.formatEther(await boxes.balanceOf(contracts.signerAddr)))
    
    while (boxesIds.length < resBoxes) {
      let resAddr = await boxes.ownerOf(id);
      if (resAddr === contracts.signerAddr) {
        let nftInfo = {};
        nftInfo.id = id;
        nftInfo.url = await boxes.tokenURI(id);
        nftInfo.name = "#" + String(id).padStart(4, '0')

        boxesIds.push(nftInfo)
      }
      id += 1;
    }

    return {
      boxesIds
    }
  }
})

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

  const beerAmount = Number( await nftBoxContract.amountBoxBeer())
  const rumAmount = Number(await nftBoxContract.amountBoxRum())
  const wineAmount = Number(await nftBoxContract.amountBoxWine())

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

  const bottles = nftBottleContract;
  const boxes = nftBoxContract;

  let resBottles = Number(ethers.utils.formatEther(await bottles.balanceOf(signerAddr)))
    let resBoxes = Number(ethers.utils.formatEther(await boxes.balanceOf(signerAddr)))

    let bottlesIds = [];
    let boxesIds = [];

    if (resBoxes > 0) {
      let id = 2;
      while (boxesIds.length < resBoxes) {
        let resAddr;
        try {
          resAddr = await boxes.ownerOf(id)
        } catch (error) {
          console.log(error);
          continue;
        }
        if (resAddr === signerAddr) {
          let nftInfo = {};
          nftInfo.id = id;
          nftInfo.url = await boxes.tokenURI(id);
          nftInfo.name = "#" + String(id).padStart(4, '0')

          boxesIds.push(nftInfo)
        }
        id += 1;
      }
    }

    if (resBottles > 0) {
      let id = 2;
      while (bottlesIds.length < resBottles) {
        let resAddr;
        try {
          resAddr = await bottles.ownerOf(id)
        } catch (error) {
          console.log(error);
          continue;
        }
        if (resAddr === signerAddr) {
          let nftInfo = {};
          nftInfo.id = id;
          nftInfo.url = bottles.tokenURI(id);
          nftInfo.name = "#" + String(id).padStart(4, '0')

          boxesIds.push(nftInfo)
        }
        id += 1;
      }
    }

  return {
    isAdmin: boxOwner === signerAddr && bottleOwner === signerAddr && stakingOwner === signerAddr && lotteryOwner === signerAddr,
    bottlesIds,
    beerAmount,
    rumAmount,
    wineAmount,
    boxesIds,
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

export const stakeIds = createAsyncThunk('contracts/stake', async (ids, { getState }) => {
  let { contracts } = getState();

  let provider = contracts.provider;
  let stakingContract = contracts.bottleStakingContract;

  let filter = {
    address: stakingContract.address,
    topics: [
      "GetLP(address,uint256)"
    ]
  }

  console.log("filter: ", stakingContract.filters.GetLP(contracts.signerAddr, null));

  // let lpIds = [];
  // provider.on(filter, () => {

  // })

  // const tx = await stakingContract.getLP(ids);
  // await tx.wait();

  // const tx2 = await stakingContract.stake(ids);

  // await tx2.wait()
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

  const tx = await contracts.nftBottleContract.openBox(contracts.userBoxesNFTs[0].id)
  await tx.wait();
})

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState: initialContractsState,
  extraReducers: (builder) => {
    
    builder.addCase(getUserNFTs.fulfilled, (state, { payload }) => {
      if (payload.bottlesIds) {
        state.userBottlesNFTs = payload.bottlesIds
      }
      if (payload.boxesIds) {
        state.userBoxesNFTs = payload.boxesIds
      }
    })

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
      state.userBottlesNFTs = payload.bottlesIds;
      state.userBoxesNFTs = payload.boxesIds;
      state.rumAmount = payload.rumAmount;
      state.beerAmount = payload.beerAmount;
      state.wineAmount = payload.wineAmount;
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