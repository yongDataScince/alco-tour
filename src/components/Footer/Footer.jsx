import Twitter from "../../assets/twitter.svg"
import Telegram from "../../assets/telegram.svg"
import Reddit from "../../assets/reddit.svg"
import "./styles.scss"

export const Footer = () => {
  return (
    <div className="footer__main">
      <div className="tag">Social media</div>

      <h1 className="font-96 footer__main--title">WTF, Cap?</h1>
      <p className="footer__main--sub-title">Don`t miss anything! Join our WTFam. </p>

      <div className="links-block">
        <div className="link-btn">
          <img src={Twitter} alt="" />
        </div>
        <div className="link-btn">
          <img src={Telegram} alt="" />
          chat
        </div>
        <div className="link-btn">
          <img src={Reddit} alt="" />
        </div>
      </div>

      <div className="sub-info">
        <div className="text">Privacy Policy</div>
        <div className="text">Terms of Use</div>
        <div className="text">All Rights Reserved</div>
      </div>
    </div>
  )
}