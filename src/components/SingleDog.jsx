import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Moment from 'react-moment'
import EditDogForm from './EditDogForm'

export default function SingleDog(props) {
    const [dog, setDog] = useState({})
    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [showform, setShowform] = useState(false)

    const { id } = useParams()

    const toggleForm = () => {
        setShowform(true)
    }

    const updateDog = async (e) => {
        e.preventDefault()
        try {
            await Axios.put(`https://dogapp-backend.herokuapp.com/api/v1/dogs/${id}`, { name: name, breed: breed }, { withCredentials: true })
            setShowform(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function fetchData() {
            const res = await Axios.get(`https://dogapp-backend.herokuapp.com/api/v1/dogs/${id}`,
                { withCredentials: true }
            )
            setDog(res.data.data)
            setName(res.data.data.name)
            setBreed(res.data.data.breed)
        }
        fetchData()
    }, [])
    return (
        <div className="cardCont">
            <Card className="bg-dark text-white" style={{ width: '23rem', marginBottom: '10px' }}>
                <Card.Title>NAME: {name}</Card.Title>
                <Card.Text>BREED: {breed}</Card.Text>
                Dog Added:
                <Moment fromNow>{dog.created_at}</Moment>
                {/* <Card.Text>OWNER NAME: {dog.owner.username}</Card.Text> */}
            </Card>
            {showform ?
                <EditDogForm
                    dog={dog}
                    name={name}
                    breed={breed}
                    setName={setName}
                    setBreed={setBreed}
                    updateDog={updateDog} />  :
            <Button onClick={toggleForm}>
                EDIT
            </Button>
            }
        </div>
    )
}
