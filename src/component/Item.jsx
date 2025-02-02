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
            .catch(error => {
                // console.error('Error : ', error)
                // alert('You must log in');
                // navigate({pathname: '/login', search: errorStr});
                exceptionHandler(error);
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