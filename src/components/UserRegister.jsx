import React from 'react'
import { Redirect } from 'react-router-dom'
import LoaderButton from './LoaderButton'
import { Form } from 'react-bootstrap'

export default function UserRegister(props) {

    return (
        <div>
            {props.toDogs ? <Redirect to={'/dogs'} /> : null}
            <h2 className="formTitle">SIGN UP</h2>
            <Form onSubmit={props.createUser} className="submitForm">
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={props.username} onChange={e => props.setUsername(e.target.value)} placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={props.email} onChange={e => props.setEmail(e.target.value)} placeholder={"Email"} name="" id="" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={props.password} onChange={e => props.setPassword(e.target.value)} placeholder={"Password"} name="" id="" />
                </Form.Group>
                <LoaderButton type="submit" variant='primary' isLoading={props.isLoading}>SUBMIT</LoaderButton>
            </Form>
        </div>
    )
}
