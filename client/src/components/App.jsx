import React, { useEffect, useState } from 'react'
import Note from './Note';
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    fetch('/todo/fetch_todo')
      .then(res => res.json())
      .then(notes => setNotes(notes))
  }

  async function addNote(newNote) {
    fetch(`/todo/save_todo`,{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
    })
      .then(res => res.json())
      .then((data) => {
        fetchNotes()
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });

  }

  async function deleteNote(id) {
    fetch(`/todo/delete_todo/${id}`,{
      method: 'DELETE',
    })
      .then(res => res.json())
      .then((data) => {
        fetchNotes()
        alert(data.success)
        console.log('Deletion response:', data);
      })
      .catch((error) => {
        if (error.code === 404) {
          alert("Todo item not found")
        }
        console.error('Error deleting todo:', error);
      });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.body}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App