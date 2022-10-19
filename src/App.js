import Button from './components/UI/Button';
import './App.css';
import { useState } from 'react';

function App() {

  const [inp, setInp] = useState('');

  return (
    <div className="App">
      <Button text="btn" width={100} height={50} />
      <Button text="btn" width={200} height={100} />
      <Button text="btn" width={300} height={150} />
    </div>
  );
}

export default App;
