import Twitter from "../../assets/twitter.svg"
import Telegram from "../../assets/telegram.svg"
import Reddit from "../../assets/reddit.svg"
import Mail from "../../assets/mail.svg"
import "./styles.scss"

export const Footer = () => {
  return (
    <div className="footer__main">
      <div className="tag">Social media</div>

      <h1 className="font-96 footer__main--title">WTF, Cap?</h1>
      <p className="footer__main--sub-title">Don`t miss anything! Join our WTFam. </p>

      <div className="links-block">
        <a className="link-btn" href="https://twitter.com/AlcoTripGames">
          <img src={Twitter} alt="" />
        </a>
        <a className="link-btn" href="https://t.me/AlcoTripChat">
          <img src={Telegram} alt="" />
          chat
        </a>
        <a className="link-btn" href="https://discord.com/invite/yUPDRz7v5s">
          <img src={Reddit} alt="" />
        </a>
      </div>

      <div className="sub-info">
        <div className="text">Privacy Policy</div>
        <div className="text">Terms of Use</div>
        <div className="text">All Rights Reserved</div>
        <div className="text text__mail">
            <img src={Mail} alt="mail" className="sub-inf__img"/>
            info@alcotrip.games
        </div>
      </div>
    </div>
  )
}