import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Convert from './components/Convert';
import Invest from './components/Invest';

function App() {
  return (
    <div className='container mt-4'>
      <Convert></Convert>
      <Invest></Invest>
    </div>
  );
}

export default App;
