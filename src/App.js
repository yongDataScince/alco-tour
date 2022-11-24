import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import logo from "./assets/logo.svg";
import { Footer } from './components/Footer/Footer';
import { Main } from './routes/Main';
import { Staking } from './routes/Staking';
import { Link } from "react-router-dom";
import { Admin } from './routes/Admin/Admin';
import { ConnectBtn } from './components/ConnectBtn/ConnectBtn';
import { useSelector } from 'react-redux';

function App() {
  const { connected, isAdmin } = useSelector((state) => state.contracts)
  return (
    <div className="App">
      <Router>
        <header className="header__main-nav">
          <div style={{ opacity: Number(!connected), visibility: !connected ? 'visible' : 'hidden', transition: '0.1s' }}><ConnectBtn /></div>
          <Link to={'/'}><img src={logo} className="header__main-logo" alt="" /></Link>
          <p className="header__main-text font-16-p">
            <Link to="/staking">Staking</Link>
            { isAdmin && <Link to="/admin">Admin</Link> }
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
