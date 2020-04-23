import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios"


const UpdateMovie = props => {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const editMovie = () => {
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
          props.refreshMovies()
          history.push("/")})
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const handleChange = (e) => {
    e.persist();
    const value= e.target.name === "stars" ? e.target.value.split(", ") : e.target.value
    setMovie((previous) => ({ ...previous, [e.target.name]: value }));
  };

  const handleEdit = e => {
    e.preventDefault()
    editMovie()
  }


  return (
    <div>
      {movie && <form onSubmit={handleEdit}>
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

        <button onClick={handleEdit}>Edit Movie</button>
  </form> }
    </div>
  );
};

export default UpdateMovie;
