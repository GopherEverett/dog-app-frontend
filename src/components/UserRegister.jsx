import React,{ useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function UserRegister(props) {
    // const [username, setUsername] = useState([''])
    // const [email, setEmail] = useState([''])
    // const [password, setPassword] = useState([''])
    // const [toHome, setToHome] = useState(false)

    // const createUser = async (e) => {
    //     e.preventDefault()
    //     try {
    //         await axios.post('http://localhost:8000/user/register', {
    //             username: username,
    //             email: email,
    //             password: password
    //         }, { withCredentials: true })
    //         setTimeout(()=> setToHome(true), 2000)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        <div>
            {props.toHome ? <Redirect to={'/dogs'}/> : null}
            <form onSubmit={props.createUser}>
                <input type="text" value={props.username} onChange={e => props.setUsername(e.target.value)} placeholder="Enter Username" />
                <input type="email" value={props.email} onChange={e => props.setEmail(e.target.value)} placeholder={"Email"} name="" id=""/>
                <input type="password" value={props.password} onChange={e => props.setPassword(e.target.value)} name="" id=""/>
                <input type="submit" value="SUBMIT"/>
            </form>
        </div>
    )
}
