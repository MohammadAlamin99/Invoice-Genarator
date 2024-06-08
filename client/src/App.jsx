import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReservationPage from './pages/ReservationPage';

function App() {
 
  return (
    <>
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<ReservationPage/>}/>
            </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
