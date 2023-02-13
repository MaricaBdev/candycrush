const PORT = 8000
const axios = require('axios');
const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())

require('dotenv').config()

app.use(express.json())


app.get('/', (req,res) => {
    res.json('this works')
})

app.get('/scores', (req,res) => {
    const options = {
        method: 'GET',
        headers: {
            accepts: 'application/json',
            'X-Cassandra-Token': process.env.ASTRA_TOKKEN
        }
    }
    axios(`${process.env.URL}?page-size=5`, options)
        .then(response =>  res.status(200).json(response.data))
        .catch(err=> res.status(500).json({message: err}))
})


app.post('/addscore', (req,res) => {
    const bodyContent = req.body

    const options = {
        method: 'POST',
        headers: {
            accepts: 'application/json',
            'X-Cassandra-Token': process.env.ASTRA_TOKKEN,
            'Content-Type': 'application/json'
        },
        data: bodyContent
    }
    axios(process.env.URL, options)
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))