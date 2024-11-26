import axios from "axios";
import React, { useEffect } from "react";

const Test = () => {
    const Fetch = async () => {
        try {
            const response = await axios.post(`https://webgrowproject-1.onrender.com/api/v1/auth/register`, {
                "firstname": "aakarsh",
                "lastname": "kamboj",
                "email": "singhaakarsh54321@gmail.com",
                "mobile": "0987654321",
                "password": "Aakarsh@1234",
                "organization": "akgec",
                "designation": "head",
                "role": "HOST"
            })
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        Fetch();
    }, [])

    return (
        <>
        </>
    )
}
export default Test;