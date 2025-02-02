import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, Navigate, useNavigate } from "react-router-dom"
import { postLoginAsync } from '../slices/loginSlice'


// 페이지 이동 재사용

export const useCustomLogin = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    

    // 로그인 상태
    // const loginState = useSelector(state => state.loginSlice);

    // console.log('loginState : ', loginState);   // { emai: '' }


    // 로그인 여부    
    // const isLogin = loginState.email ? true : false;

    // console.log('isLogin : ', isLogin); 

    
    const doLogin = async (loginParam) => {

        const action = await dispatch(postLoginAsync(loginParam));  // Redux 비동기 액션을 dispatch

        console.log('------------------------------------ doLogin');
        
        console.log('action.payload : {}', action.payload);

        return action.payload;
    }


    const doLogout = () => {

        dispatch(logout());

    }


    // 페이지 이동
    const moveToPath = ( path ) => {

        navigate({ pathname: path}, {replace: true});        

    }

    const moveToLogin = () => {

        navigate({ pathnname: '/login'}, {replace: true});        
        
    }


    const moveToLoginReturn  = () => {

        navigate({ pathnname: '/login'});        
    }


    // JWT 예외 처리
    const exceptionHandler = ( ex ) => {

        console.log('-------------------------------- exceptionHandler');

        console.log('ex : ', ex);

        const errorMsg = ex.response.data.error;

        const errorStr = createSearchParams({ error : errorMsg }).toString();

        if ( errorMsg === 'REQUIRED_LOGIN' ) {
            alert('You must log in');
            navigate({pathname: '/login', search: errorStr});
            return;
        }

        if ( errorMsg === 'ERROR_ACCESS_DENIED' ) {
            alert('Access denied');
            navigate({pathname: '/', search: errorStr});
            return;
        }
    }
    

    // return { loginState, isLogin, doLogin, doLogout, moveToPath,  moveToLogin, moveToLoginReturn, exceptionHandler };
    return { exceptionHandler };

}

