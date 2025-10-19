
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postLogin } from '../api/memberApi';
import { setCookies, getCookies, removeCookie } from '../util/cookieUtil'


const initialState = {
    email: ''  ,
    // nickname: ''
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

// Slice : 상태(state) 관리와 관련된 로직(액션 및 리듀서)을 모듈화하는 데 사용된다.
const loginSlice =  createSlice({

    name: 'loginSlice',  // 슬라이스 이름

    // 사용자가 앱을 재실행하거나 새로고침했을 때 쿠키에 저장된 로그인 정보로 상태를 복원할 수 있습니다.
    initialState: loadMemberCookie() || initialState,  // 쿠키 정보가 있을 경우 쿠키에서 가져온 값을 상태의 초기값으로 사용

    // 상태와 액션을 받아 Slice 상태를 업데이트하는 리듀서 함수들의 집합
    reducers: {    

        login: (state, action) => {  // 슬라이스의 현재 상태, 액션 : 디스패치 시 전달된 데이터(주로 action.payload))

            console.log('------------------------------- login');
                      
            console.log('action : ', action);
            /* 
                { 
                    type: 'login/login',   // [슬라이스 이름]/[리듀서 이름]
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

// login과 logout 함수를 외부에서 사용할 수 있도록 export 하는 것입니다.
export const { login, logout } = loginSlice.actions;  

export default loginSlice.reducer;

