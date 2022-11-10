import bg from "../../assets/card.png"
import "./styles.scss";

export const NftPop = ({ onClose }) => {
  return (
    <div className="nft-pop-main">
      <div className="nft-pop-main__container">
        <div className="nft-pop-main__item">
          <div className="close" onClick={onClose} />
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
    </div>
  )
}