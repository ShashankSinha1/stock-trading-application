import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {StockOverviewPage} from "./pages/StockOverviewPage";
import {StockDetailPage} from "./pages/StockDetailPage";
import { WatchListContextProvider } from './context/watchListContext';


export default function App() {
  return (
    <main className='container'>
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<StockOverviewPage />} />
            <Route path="/detail/:stock" element={<StockDetailPage/>}/>
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}


