import Button from './components/UI/Button';
import Input from './components/UI/Input';
import './App.css';
import { useState } from 'react';
import { InputGroup } from './components/UI/InputGroup/InputGroup';

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
