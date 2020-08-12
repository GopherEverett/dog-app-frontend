import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

export default function UserLogin(props) {

    // const submitUser = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const res = await axios.post('http://localhost:8000/user/login', {
    //             username: username,
    //             email: email,
    //             password: password
    //         }, { withCredentials: true })
    //         setCookie('useraname', res.data.data.username, { path: '/'})
    //         auth.login(() => {
    //             props.setLogin(auth.isAuthenticated())
    //         })
    //         setTimeout(()=> setToHome(true), 2000)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        <div>
            {props.toHome ? <Redirect to={'/dogs'}/> : null}
            <h2>LOGIN</h2>
            <Form onSubmit={props.submitUser}>
                <Form.Control type="text" value={props.username} onChange={e => props.setUsername(e.target.value)} placeholder="Username" />
                <Form.Control type="email" value={props.email} onChange={e => props.setEmail(e.target.value)} placeholder={"Email"} name="" id=""/>
                <Form.Control type="password" value={props.password} onChange={e => props.setPassword(e.target.value)} placeholder={"Password"} name="" id=""/>
                <Button type="submit" variant='primary'>SUBMIT</Button>
            </Form>
        </div>
    )
}
