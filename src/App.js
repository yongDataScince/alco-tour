import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ethers } from 'ethers'
import logo from "./assets/logo.svg";
import { Footer } from './components/Footer/Footer';
import { Main } from './routes/Main';
import { Staking } from './routes/Staking';
import { Link } from "react-router-dom";
import { Admin } from './routes/Admin/Admin';
import { ConnectBtn } from './components/ConnectBtn/ConnectBtn';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from './components/Menu/Menu';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from './hooks';
import { addBoxIdAct } from './store';

function App() {
  const { isAdmin, connected, signerAddr, provider, nftBoxContract, loading } = useSelector((state) => state.contracts)
  const [opened, setOpened] = useState(false)
  const menuRef = useRef(null)
  const dispatch = useDispatch();

  useEffect(() => {
    setOpened(false)
    if (connected) {
      nftBoxContract.on("BuyBox(address,uint256)", (address, id) => {
        console.log("Buy", address, Number(id));
        dispatch(addBoxIdAct(Number(id)))
      })
    }
  }, [connected, dispatch, nftBoxContract, provider])

  useOnClickOutside(menuRef, () => {
    setOpened(false)
  })

  return (
    <div className="App">
      { loading && <div className='loading' />}
      <Router>
        <Menu opened={opened} ref={menuRef} />
        <header className="header__main-nav">
        {signerAddr && <p className='header__main-text desctop address'>{signerAddr.slice(0, 7)}..{signerAddr.slice(35, 42)}</p>}
          <button className='open-btn' onClick={() => setOpened(true)} />
          <Link to={'/'} className="logo-link"><img src={logo} className="header__main-logo" alt="" /></Link>
          <p className="header__main-text font-16-p">
            <Link to="/staking">Staking</Link>
            { isAdmin && <Link to="/admin" className='desctop'>Admin</Link> }
            <ConnectBtn res="desctop" />
          </p>
        </header>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/staking' element={<Staking />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
