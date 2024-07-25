import {Routes,Route, BrowserRouter} from "react-router-dom"
import './index.css'
import Home from "./pages/Home";
import DashBoardPage from "./pages/DashboardPage";
import ComparePage from "./pages/ComparePage";
import CoinPage from "./pages/CoinPage";
function App() {
  return <div className="App">
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<DashBoardPage/>}/>
            <Route path="/coin/:id" element={<CoinPage/>}/>
            <Route path="/compare" element={<ComparePage/>}/>
            <Route path="/*" element={<h1>Invalid Url....</h1>}/>
            </Routes>
        </BrowserRouter>
  </div>
}

export default App;
