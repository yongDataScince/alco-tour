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

function App() {

  return (
    <div className="App">
      <Router>
        <header className="header__main-nav">
          <ConnectBtn />
          <img src={logo} className="header__main-logo" alt="" />
          <p className="header__main-text font-16-p">
            <Link to="/staking">Staking</Link>
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
