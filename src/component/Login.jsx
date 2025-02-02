import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, postLoginAsync }  from '../slices/loginSlice'
import { postLogin } from '../api/memberApi';
import { useNavigate } from "react-router-dom";
// import { useCustomLogin } from '../hooks/useCustomLogin'


const initialState = {
    email: '',
    password: ''
}


const Login = () => {

    const dispatch = useDispatch();  
    
    const navigate = useNavigate();

    const [ loginParam, setLoginParam ] = useState({ ...initialState });

    
    const handleChange = (e) => {

        loginParam[e.target.name] = e.target.value;

        setLoginParam({ ...loginParam });

    }

  
    // 1.   
    const handleClickLogin = () => {

      postLogin( loginParam )  // 중요
        .then(data => {         

          console.log('data : ', data);

          if ( !data.error ) {   
              // Redux에서 login(loginParam) 실행 → 액션 생성자 함수룰 호출. 액션 객체 생성한다.
              // 액션 객체가 dispatch()를 통해 loginSlice의 login 리듀서로 전달된다.
              // 
              // { 
              //   type: 'loginSlice/login',
              //   payload: { email: 'user1@gmail.com', password: '1111' }
              // }             
              
              dispatch(login(loginParam)); 

              setLoginParam({ ... initialState });  
              
              navigate({pathname: '../'}, {replace: true});  // 홈 페이지로 이동
              
          } else {
            
              alert('Please enter your ID and password correctly.');    
           
              setLoginParam({ ... initialState });  
          }

        })
        .catch(error => {
            console.log('error : {}', error);
        })
    }
    


      
      // 2. 
      // Redux에서 관리하는 비동기 상태 (fulfilled, rejected)를 관리 및 활용할 수 있다.
      // const handleClickLogin = () => {

      //     dispatch(postLoginAsync(loginParam))
      //     .unwrap()
      //     .then(data => {

      //         console.log('---------------------- handleClickLogin'); 
      //         console.log('data : ', data);
              
      //         if (data.error) {       // 'ERROR_LOGIN'

      //           alert('Please enter your ID and password correctly.');   
      //           setLoginParam({ ... initialState });      

      //         } else {                

      //           setLoginParam({ ... initialState });  
      //           navigate({pathname: '../'}, {replace: true});              

      //         }
      //     })
      //     .catch(error => {
              
      //         console.log('Error : ', error);

      //     })
      // }          
    
  
    return (
        <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>          
          <form>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" value={loginParam.email} placeholder="Enter your email" onChange={handleChange}/>  
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={loginParam.password} placeholder="Enter your Password" onChange={handleChange}/>  
            <button type="button" onClick={handleClickLogin}>Login</button>
          </form>
        </div>
  
        <style jsx>{`
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
  
          .login-container {
            width: 100%;
            max-width: 400px;
          }
  
          .login-box {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
          }
  
          h2 {
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
            color: #333;
          }
  
          label {
            display: block;
            margin: 10px 0 5px;
            font-size: 14px;
            text-align: left;
            color: #555;
          }
  
          input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
          }
  
          input:focus {
            border-color: #007bff;
            outline: none;
          }
  
          button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }
  
          button:hover {
            background-color: #0056b3;
          }
        `}</style>
      </div>
    );
  };
  
  
  export default Login;
  