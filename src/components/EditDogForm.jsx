import React from 'react'
import { Form, Button } from 'react-bootstrap'

export default function EditDogForm(props) {
    return (
        <div className="dogformcont">
                {/* {toHome ? <Redirect to={`/dogs`} /> : null} */}
            <Form onSubmit={props.updateDog}>
                <Form.Group controlId="editformGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={props.name} onChange={e => props.setName(e.target.value)} type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="editformGroupBreed">
                    <Form.Label>Breed</Form.Label>
                    <Form.Control value={props.breed} onChange={e => props.setBreed(e.target.value)} type="text" placeholder="Breed" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
