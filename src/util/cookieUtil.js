
import { Cookies } from "react-cookie";


const cookies = new Cookies();


// 쿠키 생성
export const setCookies = ( name, value, days ) => {

    // cookie expire
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);

    // 쿠키 경로 설정 : 웹 사이트 모든 페이지에 쿠키를 사용할 수 있다. (보안상 주의)
    cookies.set(name, value, { expires: expires, path: '/' }); 

}

// 쿠키 정보 조회
export const getCookies = ( name ) => {
    return cookies.get(name);
}


// 해당 경로에서 쿠키 삭제
export const removeCookie = ( name, path='/' ) => {
    
    cookies.remove(name, {path: path});

}