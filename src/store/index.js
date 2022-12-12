import { configureStore, createSlice, createAsyncThunk, combineReducers, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit'
import { addBoxId, addTypeId } from './actions'
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
  currentIds: [],
  lpIds: [],
  activePreSale: false,
  activeSale: false,
  userBottlesNFTs: [],
  userBoxesNFTs: [],
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

export const getUserNFTs = createAsyncThunk("contracts/nfts", async (type, { getState }) => {
  let { contracts } = getState();

  let bottles = contracts.nftBottleContract;
  let boxes = contracts.nftBoxContract;

  if (type === 'all') {
    let bottlesIds = (await bottles.getIdNFT(contracts.signerAddr))?.map((id) => {
      let nftInfo = {};
      nftInfo.id = id;
      bottles.tokenURI(id).then((uri) => {
        nftInfo.url = uri
      });
      nftInfo.name = "#" + String(id).padStart(4, '0')

      return nftInfo;
    });
    let boxesIds = (await boxes.getIdNFT(contracts.signerAddr))?.map((id) => {
      let nftInfo = {};
      nftInfo.id = id;
      boxes.tokenURI(id).then((uri) => {
        nftInfo.url = uri
      });
      nftInfo.name = "#" + String(id).padStart(4, '0')

      return nftInfo;
    });

    return {
      bottlesIds,
      boxesIds
    }
  } else if (type === 'bottle') {
    let bottlesIds = [];

    return {
      bottlesIds
    }
  } else {
    let boxesIds = [];

    return {
      boxesIds
    }
  }
})

export const claimTokens = createAsyncThunk("contracts/claim", async (_, { getState }) => {
  const { contracts } = getState()
  const tx = await contracts.BottleStaking.withdraw(
    contracts.lpIds
  )

  await tx.wait()
})

export const disconnect = createAsyncThunk("contracts/disconnect", async () => {})

export const initContracts = createAsyncThunk("contracts/init-contracts", async (prv) => {
  let provider = new ethers.providers.Web3Provider(prv)
  const signer = provider.getSigner();

  const nftBoxContract = new ethers.Contract('0xe2227a5A6c8a2a69fF7a413b1CA3EF36f46D2dA9', NFTBox, signer)
  const nftBottleContract = new ethers.Contract('0x914223Bb22450d5349E7174f39b4E805f28901B4', NFTBottle, signer)
  const bottleStakingContract = new ethers.Contract('0x9b9a0500895AD9ce2fF1C75D8B5af250d0797Aa1', BottleStaking, signer)
  const lotteryContract = new ethers.Contract('0x7f98de88ef31238136A3D60b2D71D9C8Ef2bF0d7', Lottery, signer)

  await nftBoxContract.attach("0xe2227a5A6c8a2a69fF7a413b1CA3EF36f46D2dA9")
  await nftBottleContract.attach("0x914223Bb22450d5349E7174f39b4E805f28901B4")
  await bottleStakingContract.attach("0x9b9a0500895AD9ce2fF1C75D8B5af250d0797Aa1")
  await lotteryContract.attach("0x7f98de88ef31238136A3D60b2D71D9C8Ef2bF0d7")

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

  console.log(await nftBottleContract.getIdNFT(signerAddr));
  // let bottlesIds = (await nftBottleContract.getIdNFT(signerAddr))?.map((id) => {
  //   let nftInfo = {};
  //   nftInfo.id = id;
  //   nftBottleContract.tokenURI(id).then((uri) => {
  //     nftInfo.url = uri
  //   });
  //   nftInfo.name = "#" + String(id).padStart(4, '0')

  //   return nftInfo;
  // });
  // let boxesIds = (await nftBoxContract.getIdNFT(signerAddr))?.map((id) => {
  //   let nftInfo = {};
  //   nftInfo.id = id;
  //   nftBoxContract.tokenURI(id).then((uri) => {
  //     nftInfo.url = uri
  //   });
  //   nftInfo.name = "#" + String(id).padStart(4, '0')

  //   return nftInfo;
  // });

  return {
    isAdmin: boxOwner === signerAddr && bottleOwner === signerAddr && stakingOwner === signerAddr && lotteryOwner === signerAddr,
    bottlesIds: [],
    beerAmount,
    rumAmount,
    wineAmount,
    boxesIds: [],
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

  let stakingContract = contracts.bottleStakingContract;

  let tx = await stakingContract.getLP(contracts.currentIds);
  await tx.wait()

  let ckurrLpId = null;
  stakingContract.on("GetLP(address,uint256)", (user, lpId) => {
    ckurrLpId = lpId
  })
  return ckurrLpId
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

  let ids = [];
  switch (boxType) {
    case 1:
      ids = contracts.userBoxesNFTs.filter((nft) => nft.id >= 0 && nft.id <= 10000)
      break;
    
    case 2:
      ids = contracts.userBoxesNFTs.filter((nft) => nft.id >= 10001 && nft.id <= 16000)
      break;
  
    default:
      ids = contracts.userBoxesNFTs.filter((nft) => nft.id >= 16001 && nft.id <= 20000)
      break;
  }

  const tx = await contracts.nftBottleContract.openBox(ids[0].id)
  await tx.wait();
  let newBottleId = 0;

  contracts.nftBottleContract.on("OpenBox(address,uint256)", (address, id) => {
    if (address === contracts.signerAddr) {
      newBottleId = id
    }
  })

  const bottleUri = await contracts.nftBottleContract.tokenURI(newBottleId)

  return {
    boxleId: ids[0].id,
    bottleId: newBottleId,
    bottleUri
  }
})

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState: initialContractsState,
  reducers: {
    addBoxId,
    addTypeId,
  },
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

    builder.addCase(openBox.fulfilled, (state, { payload }) => {
      state.userBoxesNFTs = state.userBoxesNFTs.filter((box) => box.id !== payload.boxleId)
      state.userBottlesNFTs.push({
        id: payload.bottleId,
        url: payload.bottleUri,
        name: "#" + String(payload.bottleId).padStart(4, '0')
      })
    })

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

    builder.addCase(stakeIds.fulfilled, (state, { payload }) => {
      state.lpIds.push(payload)
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

export const {
  addBoxId: addBoxIdAct,
  addTypeId: addTypeIdAct
} = contractsSlice.reducer

const rootReducer = combineReducers({
  contracts: contractsSlice.reducer
});


export default configureStore({
  reducer: rootReducer,
  middleware: (defMiddleware) => defMiddleware({
    serializableCheck: false
  })
})