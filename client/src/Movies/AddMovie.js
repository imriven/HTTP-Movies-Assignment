import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"


const AddMovie = props => {
  const history = useHistory();
  const [movie, setMovie] = useState({title:"", director:"", metascore:"", stars:[]});


  const addMovie = () => {
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then((res) => {
          props.refreshMovies()
          history.push("/")})
      .catch((err) => console.log(err.response));
  };

  
  const handleChange = (e) => {
    e.persist();
    const value= e.target.name === "stars" ? e.target.value.split(", ") : e.target.value
    setMovie((previous) => ({ ...previous, [e.target.name]: value }));
  };

  const handleAdd = e => {
    e.preventDefault()
    addMovie()
  }


  return (
    <div>
       <form onSubmit={handleAdd}>
        <label htmlFor="title">
          Title:
          <input
            id="title"
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            placeholder="Enter Title"
          />
        </label>
        <label htmlFor="director">
          Director:
          <input
            id="director"
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChange}
            placeholder="Enter Director"
          />
        </label>
        <label htmlFor="metascore">
          Metascore:
          <input
            id="metascore"
            type="text"
            name="metascore"
            value={movie.metascore}
            onChange={handleChange}
            placeholder="Enter Metascore"
          />
        </label>
        <label htmlFor="stars">
          Stars:
          <input
            id="stars"
            type="text"
            name="stars"
            value={movie.stars.join(", ")}
            onChange={handleChange}
            placeholder="Starring?"
          />
        </label>

        <button onClick={handleAdd}>Add Movie</button>
  </form> 
    </div>
  );
};

export default AddMovie;
