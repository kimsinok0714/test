import { useEffect, useState } from "react";
import { getItems } from "../api/itemApi";
import { useCustomLogin } from '../hooks/useCustomLogin';




const Item = () => {

    const { exceptionHandler } = useCustomLogin();

    const [ items, setItems ]= useState([]);

    useEffect(() => {

        getItems()
            .then(data => {
                console.log(data);
                setItems(data);
            })
            .catch(ex => {

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
                // console.error('Error : ', error)
                // alert('You must log in');
                // navigate({pathname: '/login', search: errorStr});
                //exceptionHandler(error);
            })

    }, [])


    return (
        <>
            <h1>상품 목록 조회 페이지</h1>
            <br/><br/>  
            {
                items.map( (item) => {
                    return <div key={item.id}>
                        <span style={{margin: '2px'}}> {item.id} </span>
                        <span style={{margin: '2px'}}> {item.name} </span>
                    </div>
                    
                })


            }

        </>
    );


}


export default Item;
