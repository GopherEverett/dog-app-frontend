import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function AddDogForm(props) {
    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [toHome, setToHome] = useState(false)

    const createDog = async (e) => {
        e.preventDefault()
        try {
            await Axios.post('http://localhost:8000/api/v1/dogs/', {
                name: name,
                breed: breed
            }, { withCredentials: true })
            setToHome(true)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="dogformcont">
                {toHome ? <Redirect to={`/dogs`} /> : null}
            <Form onSubmit={createDog}>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formGroupBreed">
                    <Form.Label>Breed</Form.Label>
                    <Form.Control value={breed} onChange={e => setBreed(e.target.value)} type="text" placeholder="Breed" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
