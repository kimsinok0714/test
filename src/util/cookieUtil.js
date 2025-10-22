
import { Cookies } from "react-cookie";


const cookies = new Cookies();
// 쿠키 생성
export const setCookies = ( name, value, days ) => {

    // cookie expire
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);  // 객체의 UTC 기준 날짜(day) 부분만 가져옵니다.

    // 쿠키 경로 설정 : 모든 요청 경로에  쿠키를 적용한다.
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
