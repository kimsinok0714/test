
import axios from "axios";
import { getCookies, setCookies } from "./cookieUtil"; 
import { API_SERVER_HOST } from '../api/memberApi'


// JWT 인증을 사용하는 경우, Authorization 요청 헤더에 JWT 토큰을 포함해야 한다.

const jwtAxios = axios.create();


const refreshJWT = async ( accessToken, refreshToken ) => {

    const host = API_SERVER_HOST;
    
    const header = { headers: { 'Authorization': `Bearer ${accessToken}`} }

    const res = await axios.get(`${host}/api/v1/members/refresh?refreshToken=${refreshToken}`, header);
    
    console.log('res : ', res);
    
    return res.data;

}


// HTTP 요청 헤더 (Authorization)에 Access Token 을 추가한다.
// config : Axios 요청 설정(request configuration) 을 포함하는 객체
const beforeReq = ( config ) => {

    const memberInfo = getCookies("member");

    console.log('memberInfo : ', memberInfo);

    if ( !memberInfo ) {
        console.log('Member not found');
        
        return Promise.reject({
            response: { data: { error: 'REQUIRED_LOGIN' } }
        })
    }

    const { accessToken } = memberInfo;

    // HTTP 요청 헤더 (Authorization)에 Access Token을 포함한다.
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;

}


const requestFail = ( error ) => {
    
    console.log('requestFail!!')

    return Promise.reject(error);

    
}


// 서버의 응답을 받은 후 Axios가 응답 데이터를 처리하기 전에 응답 인터셉터가 실행된다.
// res : Axios가 서버로부터 받은 응답을 포함하는 객체
const beforeRes = async ( res ) => {

    console.log('res : ', res);

    const data = res.data;

    if ( data && data.error === 'ERROR_ACCESS_TOKEN' ) {

        const memerCookieValue  = getCookies('member');

        const result = await refreshJWT(memerCookieValue.accessToken, memerCookieValue.refreshToken);

        console.log('---------------------------- beforeRes');
        console.log('result : ', result);

        memerCookieValue.accessToken = result.accessToken;
        memerCookieValue.refreshToken = result.refreshToken;

        setCookies('member', JSON.stringify(memerCookieValue), 1);  // 1일 동안 별도의 로그인 없이 API 서버 사용이 가능하다.

       
        // res.config는 Axios 요청이 수행될 때 사용된 요청 설정(configuration) 객체입니다.
        // 즉, originalRequest에는 기존 요청의 모든 정보(URL, 헤더, 메서드 등)가 포함됩니다.
        // 새로 발급받은 JWT 토큰을 'Authorization' 헤더에 추가하고, Axios 요청을 재시도 한다.
        const originalRequest = res.config;
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return await axios(originalRequest);

    }

    return res;
}


const responseFail = ( error ) => {

    console.log('------------------------- responseFail');

    console.log('error : ', error);  // error.response.data : 'REQUIRED_LOGIN'

    return Promise.reject(error);

}

// Axios Interceptor 설정

jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail );


export default jwtAxios;