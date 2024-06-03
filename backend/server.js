//import modules
const express = require('express')
const routes = require('./routes')
const cors = require('cors')

//using modules
const app = express()

//general variables
const port = 3000

//appliying cors
app.use(cors())

//applying json
app.use(express.json())

//routes
app.use(routes)

//port listening
app.listen(port, () => console.log( `Server running on port ${port}`))
