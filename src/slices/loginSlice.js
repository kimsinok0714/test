
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postLogin } from '../api/memberApi';
import { setCookies, getCookies, removeCookie } from '../util/cookieUtil'


const initialState = {
    email: ''  
}

// 쿠키에 저장된 로그인 정보는 애플리케이션 실행 시에 사용되어야 한다.
const loadMemberCookie = () => {

    const memberInfo = getCookies('member');

    if (memberInfo && memberInfo.nickname) {

        memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    }

    console.log('============================== loadMemberCookies');
    console.log('memberInfo : ', memberInfo);

    return memberInfo;
}


// createAsyncThunk : Redux Toolkit에서 비동기 액션을 생성한다.
// Redux에서 비동기 작업(예: API 요청)을 쉽게 처리할 수 있도록 도와주는 함수입니다.
// Redux의 dispatch를 통해 postLoginAsync를 호출하면 내부적으로 비동기 요청을 수행하고, 그에 따른 상태 변화를 관리합니다.
// "loginSlice/postLoginAsync" : 액션 타입
export const postLoginAsync = createAsyncThunk("loginSlice/postLoginAsync" , async (param) => {
    
    const res = await postLogin(param); // 비동기 함수 호출

    console.log('res : ', res);

    return res;   // 반드시 res를  반환한다. (중요!!)  Promise 객체를 반환
    
})


const loginSlice =  createSlice({

    name: 'loginSlice',
    
    initialState: loadMemberCookie() || initialState,  // 쿠키가 없는 경우 초기값 사용
    
    reducers: {    

        login: (state, action) => {

            console.log('------------------------------- login');
                      
            console.log('action : ', action);
            /* 
                { 
                    type: 'loginSlice/login',
                    payload: { email: 'user1@gmail.com', password: '1111', ... }
                }             
            */
            console.log('action.payload : {}', action.payload);  

            // Redux는 불변성을 유지하기 때문에 상태를 직접 수정하지 않고, 새로운 상태를 반환하여 업데이트 한다.
            return { email: action.payload.email }
        
        } ,
       
        logout: (state, action) => {

            console.log('-------------------------------- logout');

            removeCookie('member');
            
            return { ...initialState }  // 중요
        }

    } ,
    extraReducers: (builder) => {  // 비동기 액션의 상태 변화에 따라 특정 로직을 실행하는 역할
        builder
            .addCase(postLoginAsync.pending, (state, action) => {  // "postLoginAsync/pending"

                console.log('pending');

            })
            .addCase(postLoginAsync.fulfilled, (state, action) => { // 비동기 작업이 성공했을때 API 응답 데이터가 action.payload로 전달된다.
               
                console.log('fulfilled');
                
                console.log('action : {}', action);
                
                const payload = action.payload;  
         
                console.log('action.payload : {}', action.payload);

                // 로그인 요청 수행 후 인증된 사용자 정보를 쿠키에 저장
                if (!payload.error) {
                    setCookies('member', JSON.stringify(payload), 1);  // 1일 : JSON 문자열 반환
                }
               
                return payload;

            })
            .addCase(postLoginAsync.rejected, (state, action) => { // 비동기 요청이 실패했을 때 실행됨. 에러 처리

                console.log('rejected');

            } )
    }

});


export const { login, logout } = loginSlice.actions;  // 액션 생성자 함수

export default loginSlice.reducer;

