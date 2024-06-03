//import modules
const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid')

// using modules
const prisma = new PrismaClient()

//middleware
async function authorizeUser(req, res, next) {
  const {authorization} = req.headers

  if(!authorization) {
    return res.status(401).json({
      message: 'you are unauthorized'
    })
  }

  const token = authorization.split(' ')[1]

  const dataDecode = jwt.verify(token, 'secret')

  if(!dataDecode) {
    return res.status(500).json({
      message: 'internal server error'
    })
  }
  next()

}

//notes handler
async function getNotes(req, res) {
  const notes = await prisma.notes.findMany()
  res.status(200).json({
    data:  {
      notes
    }
  })
}

async function postNotes(req, res) {
  try {
    const { title, content, author } = req.body;

    const user = await prisma.user.findFirst({
      where: { email: `${author}@gmail.com` }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const note = await prisma.notes.create({
      data: {
        title: title,
        content: content,
        author: {
          connect: { id: user.id }
        }
      }
    });

    res.status(201).json({
      data: {
        note
      }
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the note' });
  }
}

async function getNoteById(req, res) {
  const {id} = req.params

  const note = await prisma.notes.findFirst({
    where: {id: Number(id)}
  })

  res.status(200).json({
    data: {
      note
    }
  })
}

async function updateNoteById(req, res) {
  const {id} = req.params
  const {title, content, author} = req.body
  
  const user = await prisma.user.findFirst({
    where: {name: author}
  })

  if (!user) {
    res.status(404).json({
      message: 'user not found'
    })
  }

  res.json({
    data: note
  })

  const note = await prisma.notes.update({
    where: {id: Number(id)},
    data: {title: title, content: content, author: { connect: {id: user.id} }}
  })
  
}

async function deleteNoteById(req, res) {
  const {id} = req.params
  
  const note = await prisma.notes.delete({
    where: {
      id: Number(id)
    }
  })
  
  res.status(200).json({message: 'note deleted'})
}

//user handler
async function registerUser(req, res) {
    const {email, name, password} = req.body
    
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password
      }
    })

    const token = jwt.sign(user, 'secret', {expiresIn: '1h'})

    res.status(201).json({
      data: {
        name: user.name,
        email: user.email,
        token: token
      }
    })
}

async function loginUser(req, res){
  const {email, password} = req.body

  const user = await prisma.user.findUnique({
    where: {email: email}
  })

  if(!user) {
    return res.status(404).json({
      message: 'user not found'
    })
  }

  if(password != user.password) {
    return res.status(404).json({
      message: 'authentication failed'
    })
  }

  const token = jwt.sign(user, 'secret', {expiresIn: '1h'})

  res.status(200).json({
    data: user, 
    token: token
  })
}


module.exports = {getNotes, getNoteById, postNotes, updateNoteById, deleteNoteById, authorizeUser, registerUser, loginUser}