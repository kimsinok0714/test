
import { configureStore } from '@reduxjs/toolkit';
import loginSlice  from './slices/loginSlice'


export default configureStore({

    reducer: {
		// loginSlice 슬리이스로 만든 리듀서 함수 등록
        'login': loginSlice   // 슬라이스 이름: const loginSlice =  createSlice({})
    }
    
	// loginSlice 슬리이스로 만든 리듀서를 Redux Store에 등록하면 다음과 같은 형식으로 슬라이스의 State(상태)를 관리한다.
	/*
		state = {
		    login: {
		        email: 'XXX'    
		    }
		}
	*/


})
