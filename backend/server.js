//import modules
const express = require('express')
const routes = require('./routes')

//using modules
const app = express()

//general variables
const port = 3000

//applying json
app.use(express.json())

//routes
app.use(routes)

//port listening
app.listen(port, () => console.log( `Server running on port ${port}`))
