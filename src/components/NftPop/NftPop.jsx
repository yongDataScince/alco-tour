import bg from "../../assets/card.png"
import "./styles.scss";

export const NftPop = () => {
  return (
    <div className="nft-pop-main">
      <div className="nft-pop-main__item">
        <div className="close" />
        <div className="nft-pop-main__item--content">
          <p className="title">
            Congrats, Cap!
          </p>
          <p className="sub-title">
            Here is your NFT:
          </p>

          <div className="nft-pop-main__item--content-img-container">
            <img className="nft-img" alt="" src={bg} />
            <div className="nft-title">
              Rum #21212
            </div>
          </div>
        </div>
      </div>
      <div className="nft-pop-main__item">
        <div className="close" />
        <div className="nft-pop-main__item--content">
          <p className="title">
            Congrats, Cap!
          </p>
          <p className="sub-title">
            Here is your NFT:
          </p>

          <div className="nft-pop-main__item--content-img-container">
            <img className="nft-img" alt="" src={bg} />
            <div className="nft-title">
              Rum #21212
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}