import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./AddContent.scss";

function AddContent() {
  const [name, setName] = useState("");
  const [year, setYear] = useState();
  const [typeFilm, setTypeFilm] = useState("");
  const [description, setDiscription] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState([]);
  const [film, setFilm] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8000/type`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setType(data));

      fetch(`http://localhost:8000/movies`,{
        method: 'GET'
      }).then(response => response.json())
      .then(data => setFilm(data))
  }, []);

  const handleAdd = () => {
    const newId = film[film.length-1].id +1;
    const newMovie ={
        id: newId,
        name: name,
        year: year,
        type: typeFilm,
        score: 0,
        description: description,
        imageUrl: img
    }
    fetch(`http://localhost:8000/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    });
    navigate('/dashboard')
};

  return (
    <div className="addContent">
      <h1>Add New Film</h1>
      <div className="addCard">
        <div className="addDetail">
          <h5>Name: </h5>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Film Name..."
          />
        </div>
        <div className="addDetail">
          <h5>Year: </h5>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
            placeholder="Enter  Year..."
          />
        </div>
        <div className="addDetail">
          <h5>Type: </h5>
          <select name="type" onChange={(e) => setTypeFilm(e.target.value)}>
            {type.map((t, index) => {
              return (
                <option value={t} key={index}>
                  {t}
                </option>
              );
            })}
          </select>
        </div>
        <div className="addDetail">
          <h5>Description: </h5>
          <input
            value={description}
            onChange={(e) => setDiscription(e.target.value)}
            placeholder="Enter  Description..."
          />
        </div>
        <div className="addDetail">
          <h5>Image: </h5>
          <input
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="Enter  Description..."
          />
        </div>
        <div className="addBtn">
          <button onClick={handleAdd}>Add Film</button>
        </div>
      </div>
    </div>
  );
}
export default AddContent;
