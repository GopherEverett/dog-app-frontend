import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Moment from 'react-moment'

export default function SingleDog(props) {
    const [dog, setDog] = useState({})
    const { id } = useParams()
    useEffect(() => {
        async function fetchData() {
            const res = await Axios.get(`http://localhost:8000/api/v1/dogs/${id}`,
                { withCredentials: true }
            )
            setDog(res.data.data)
        }
        fetchData()
    }, [])
    return (
        <div className="cardCont">
            <Card className="bg-dark text-white" style={{ width: '23rem', marginBottom: '10px' }}>
                <Card.Title>NAME: {dog.name}</Card.Title>
                <Card.Text>BREED: {dog.breed}</Card.Text>
                Dog Added:
                <Moment fromNow>{dog.created_at}</Moment>
                {/* <Card.Text>OWNER NAME: {dog.owner.username}</Card.Text> */}
            </Card>
        </div>
    )
}
