import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {

    // connect to server
    const SERVER = "http://127.0.0.1:8000/app/";

    // use state for user details for login
    const [username, setuname] = useState("")
    const [password, setpassword] = useState("")
  
    // usestate for the token (in order to make login)
    const [myToken, setmytoken] = useState("")

    // usestate that point if the user is connect or not
    const [logged, setlogged] = useState(false)

    // usestate to display message when the user do login 
    const [msg, setmsg] = useState("---")

    // use stata for products (in order to display by GET)
    const [products, setproducts] = useState([])

    // func to make login
    const login = () => {
        axios.post(SERVER + "login/", { username, password })
            .then((res) => setmytoken(res.data.access));
    };

    // func to update the login with the token into Bearer token type and approve the access to the products 
    const getTasks = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        };

        await axios.get(SERVER + "products", config).then((res) => setproducts(res.data));
    };

    // use Effect to change from unlogged to kogged mood (after the token approved)
    useEffect(() => {
        if (myToken)
            setlogged(true)
    }, [myToken]);

      // use Effect : when the user change just then change the msg (that appear at the welcome..)
    useEffect(() => {
        if (myToken) setmsg(username);
    }, [myToken]);
   
    return (
        <div>
            <h4 style={{textAlign: "center" , color: "violet"}}> login:</h4>
            {logged && 'welcome mr: ' + msg}<hr></hr>
            User name: <input onChange={(e) => setuname(e.target.value)} />
            Password: <input onChange={(e) => setpassword(e.target.value)} />
            <button onClick={() => login()}>Login</button>
            <button onClick={() => getTasks()}>get data</button>

            {products.map((prod, i) => (
                <div key={i}>
                    Title: {prod.desc},desc: {prod.price}
                </div>
            ))}
           
        </div>
    );
};

export default Login;