import { useState } from "react";
import axios from "axios";


const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "Test note",
      discription: "This is a test discription",
    },
    {
      title: "Test note",
      discription: "This is a test discription",
    },
    {
      title: "Test note",
      discription: "This is a test discription",
    },
    {
      title: "Test note",
      discription: "This is a test discription",
    },
  ]);

  axios.get("http://localhost:3000/api/notes")
    .then((res) => {
      setNotes(res.data.notes);
      
    })
  
  return (
    <>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.discription}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
