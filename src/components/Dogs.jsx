import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Dogs() {
    const [dogs, setDogs] = useState([])
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:8000/api/v1/dogs/',
                { withCredentials: true }
            )
            setDogs(res.data.data)
        }
        fetchData()
    }, [])
    return (
        <div>
            {dogs.map((dog, i) => {
                return <div key={i}>
                    <p>NAME: {dog.name}</p>
                    <p>BREED: {dog.breed}</p>
                    <p>OWNER NAME: {dog.owner.username}</p>
                </div>

            })}
        </div>
    )
}

