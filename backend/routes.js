//import external modules
const express = require('express')

// import internal modules
const {getNotes,  getNoteById, postNotes, updateNoteById, deleteNoteById, authorizeUser, registerUser, loginUser} = require('./handler')


// using modules
const router = express.Router()

// routes
const routes = [
    //notes
    router.get('/notes', getNotes),
    router.get('/notes/:id', authorizeUser, getNoteById),
    router.post('/notes', authorizeUser, postNotes),
    router.put('/notes/:id', authorizeUser, updateNoteById),
    router.delete('/notes/:id', authorizeUser, deleteNoteById),

    //user
    router.post('/register', registerUser),
    router.post('/login', loginUser)
]


module.exports = routes