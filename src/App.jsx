
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import './App.css'
import Home from './component/Home'
import Item from './component/Item'
import Login from './component/Login'
import Logout from './component/Logout'
import { useSelector } from 'react-redux';

// import { useCustomLogin } from './hooks/useCustomLogin'


function App() {

  const email = useSelector(state => state.loginSlice.email);

  console.log('email : ', email);

  return (
      <>      
        <div>
            <span style={{margin: '5px'}}><Link to={'/'}>홈</Link></span>
            {
                email ? <span style={{margin: '5px'}}><Link to={'/items'}>상품 조회</Link></span> : <></>
            }         

            {
                !email ? <span style={{margin: '5px'}}><Link to={'/login'}>로그인</Link></span> :               
                         <span style={{margin: '5px'}}><Link to={'/logout'}>로그아웃</Link></span> 
            }   
        </div>
    
        <Routes>        
          <Route path='/' element={<Home />} />          
          <Route path='/items' element={<Item />} />
          <Route path='/login' element={<Login />} />    
          <Route path='/logout' element={<Logout />} /> 
        </Routes>

      </>
  );
}

export default App;

