import { useEffect, useState } from 'react'

function FetchApi() {
 const [notes, setNotes] = useState([])

  useEffect(() => {
  	fetch('http://localhost:3000/notes')
  .then(response =>  {return response.json()})
  .then(data => {const datas = data.data.notes; setNotes(datas)})
  .catch(err => console.log(err))
  }, []);
  

  return (
    <div>
        {notes.map((note) => (
            <div key={note.id}>
                <h3>{note.title}</h3>
            </div>
        ))}
    </div>
  )
}

export default FetchApi
