
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import { Todo, Calculator,WorkAllocator,CurrencyConvertor,CountryLens } from './pages/navPages';


function App(){
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/todo' element={<Todo/>}/>
        <Route path='/calculator' element={<Calculator/>}/>
        <Route path='/workAllocator' element={<WorkAllocator/>}/>
        <Route path='/currencyConvertor' element={<CurrencyConvertor/>}/>
        <Route path='/countryLens' element={<CountryLens/>}/>
        
      </Routes>
    </Router>
  );
}



export default App;