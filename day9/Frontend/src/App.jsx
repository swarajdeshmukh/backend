import { useEffect, useState } from "react";
import axios from "axios";


const App = () => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  function fetchNotes() {
      axios.get("https://backend-t0rv.onrender.com/api/notes").then((res) => {
        setNotes(res.data.notes);
      });
  }
  

  useEffect(() => {
    fetchNotes();
  }, [])
  
  function submitHandler(e) {
    e.preventDefault();
    const { title, discription } = e.target.elements;

    axios
      .post("https://backend-t0rv.onrender.com/api/notes/create", {
        title: title.value,
        discription: discription.value,
      })
      .then((res) => {
        console.log(res.data);
        title.value = "";
        discription.value = "";
        fetchNotes();
      });

  }

  function deleteNote(id) {
    axios
      .delete(`https://backend-t0rv.onrender.com/api/note/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });

  }

  function editDescSubmitHandler(e) {
    e.preventDefault();
    const { discription } = e.target.elements;

    axios
      .patch(
        `https://backend-t0rv.onrender.com/api/note/update/${currentNoteId}`,
        {
          discription: discription.value,
        },
      )
      .then((res) => {
        discription.value = "";
        setShowForm(false);
        fetchNotes();
      });
  }
  
  return (
    <>
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <input type="text" name="title" placeholder="Enter title" />
          <input
            type="text"
            name="discription"
            placeholder="Enter description"
          />

          <button>Add Note</button>
        </form>
      </div>

      {showForm && <div className="editFormContainer" style={{display: 'flex'}}>
        <form onSubmit={editDescSubmitHandler}>
          <input
            type="text"
            name="discription"
            placeholder="Enter discription"
          />
          <button>Update Note</button>
          <button onClick={() => setShowForm(false)}>Close</button>
        </form>
      </div>}

      <div className="notes">
        {notes?.map((note, idx) => {
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.discription}</p>

              <button
                onClick={() => {
                  deleteNote(note._id);
                }}
              >
                Delete
              </button>

              <button onClick={() => {
                setShowForm(true);
                setCurrentNoteId(note._id);
              }}>Edit</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
