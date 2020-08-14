import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Dogs(props) {
    const [dogs, setDogs] = useState([])
    useEffect(() => {
        async function fetchData() {
            const res = await Axios.get(`http://localhost:8000/api/v1/dogs/dogsbyowner/${props.cookies.cookies.userid}`,
                { withCredentials: true }
            )
            setDogs(res.data.data)
        }
        fetchData()
    }, [])
    return (
        <div className="cardCont">
            <h2 className="dogTitle">{props.cookies.cookies.username}'s Doggos</h2>
            <Link to='/adddog'><Button>ADD DOG</Button></Link>
            <br/>
            {dogs.map((dog, i) => {
                return <Card className="bg-dark text-white" key={i} style={{ width: '23rem', marginBottom: '10px' }}>
                    <Card.Title>NAME: <Link to={{
                        pathname: `/dogs/${dog.id}`,
                        state:{
                            id: dog.id
                        }
                    }}>{dog.name}</Link></Card.Title>
                    <Card.Text>BREED: {dog.breed}</Card.Text>
                    <Card.Text>OWNER NAME: {dog.owner.username}</Card.Text>
                </Card>

            })}
        </div>
    )
}

