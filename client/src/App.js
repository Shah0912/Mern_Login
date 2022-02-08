//import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage'
import ResetPassword from './components/resetpwd/ResetPassword'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Homepage/>} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
