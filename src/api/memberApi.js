import axios from "axios";


export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/v1/members`;


// 로그인 요청 : POST 요청
// 폼 데이터 형식으로 API 서버에 전달
export const postLogin = async ( loginParam ) => {

    const header = { headers: { "Content-Type": "x-www-form-urlencoded" } }

    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.password)

    const res = await axios.post(`${prefix}/login`, form, header)

    console.log('res.data : ', res.data);

    return res.data

}