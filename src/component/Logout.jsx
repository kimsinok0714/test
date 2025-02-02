import { useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";
import { useNavigate } from "react-router-dom";


const Logout = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleClickLogout = () => {

        console.log('----------------- handleClickLogout');
        
        dispatch(logout());
        
        navigate({pathname: '/'});
    
    }


    return (

        <div>
            <h1>Logout Page</h1> 
            <br/><br/>           
            <button type="button" onClick={handleClickLogout}>Logout</button>
        </div>
    )

}


export default Logout;