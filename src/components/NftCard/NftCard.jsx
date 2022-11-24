import "./styles.scss"

export const NftCard = ({ img, name }) => {
  return (
    <div className="nft-card">
      <img src={img} alt="" className="nft-card--img" />
      <div className="nft-card--title">{name}</div>
    </div>
  )
}