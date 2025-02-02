
//import axios from "axios";

import jwtAxios from "../util/jwtUtil";

const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/v1`;


export const getItems = async () => {

    const res = await jwtAxios.get(`${prefix}/items`);

    return res.data;


}
