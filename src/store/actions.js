export const addBoxId = (state, { payload }) => {
  state.userBoxesNFTs.push(payload)
}

export const addTypeId = (state, { payload }) => {
  let id;
  switch (payload) {
    case 1:
      id = {
        id: state.contracts.userBoxesNFTs.filter((nft) => nft.id >= 0 && nft.id <= 10000)[0],
        type: payload
      }
      break;
    
    case 2:
      id = {
        id: state.contracts.userBoxesNFTs.filter((nft) => nft.id >= 10001 && nft.id <= 16000)[0],
        type: payload
      }
      break;
  
    default:
      id = {
        id: state.contracts.userBoxesNFTs.filter((nft) => nft.id >= 16001 && nft.id <= 20000)[0],
        type: payload
      }
      break;
  }
  // [...new Map(objArray.map((item) => [item["id"], item])).values()];

  if (!!id) {
    let alreadyAdd = [...new Map(state.currentIds.map((item) => [item["type"], item])).values()].length;
    console.log(alreadyAdd);
    state.currentIds.push(id)
  }
}
