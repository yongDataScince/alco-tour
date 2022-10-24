import { Bottles } from "../components/Bottles/Bottles"
import { Footer } from "../components/Footer/Footer"
import Header from "../components/Header"
import { Paper } from "../components/Paper/Paper"
import Button from "../components/UI/Button"

export const Main = () => {
  return (
    <>
      <Header />
      <Bottles />
      <Button className="lottery" text="Result lottery" width="40%" height={160} />
      <Paper />
      <Footer />
    </>
  )
}