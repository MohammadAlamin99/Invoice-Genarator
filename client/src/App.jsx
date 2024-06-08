import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReservationPage from './pages/ReservationPage';
import Invoice from './components/Invoice';

function App() {
 
  return (
    <>
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<ReservationPage/>}/>
                <Route path="/invoice" element={<Invoice/>}/>
            </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
