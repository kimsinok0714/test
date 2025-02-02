import '../BasicLayout.css'

//     props :   
//     <h1>안녕하세요, 이것은 Header 컴포넌트입니다!</h1> : jsx -> React Element (Javascript Object)
//
//     {
//          type: 'h1',
//          props: {
//              children: "안녕하세요, 이것은 Header 컴포넌트입니다!"
//          }

//     }



const BasicLayout = ({children}) => { // 객체 구조 분해 할당

    console.log('children : ', children);

    return (
        <>
            <header>
                <h1>Header Section</h1>
                <p>Welcome to the website!</p>                
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>&copy; 2024 My Website. All rights reserved.</p>
            </footer>
        </>

    );


}


export default BasicLayout;