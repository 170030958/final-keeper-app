import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    body: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      body: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="body"
          onChange={handleChange}
          value={note.body}
          placeholder="Take a note..."
          rows="3"
        />
        <button disabled={note.title === "" || note.body === ""} onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
