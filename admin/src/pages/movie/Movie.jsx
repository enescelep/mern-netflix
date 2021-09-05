import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../movie/movie.css";
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function User() {
  const location = useLocation();
  let movie = location.movie;
  const [uploaded, setUploaded] = useState(0);
  const [updatedMovie, setUpdatedMovie] = useState(null);
  const { dispatch } = useContext(MovieContext);
  const handleChange = (e) => {
    const value = e.target.value;
     setUpdatedMovie({ ...movie, [e.target.name]: value });
     movie = updatedMovie;
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUpdatedMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            movie = setUpdatedMovie;
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: movie.img, label: "img" },
      { file: movie.imgTitle, label: "imgTitle" },
      { file: movie.imgSm, label: "imgSm" },
      { file: movie.trailer, label: "trailer" },
      { file: movie.video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newmovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Description:</span>
              <span className="productInfoValue">{movie.desc}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              onChange={handleChange}
            />
            <label>Trailer</label>
            <input
              type="file"
              placeholder={movie.trailer}
              onChange={(e) => (movie.trailer = e.target.files[0])}
            />
            <label>Video</label>
            <input
              type="file"
              placeholder={movie.video}
              onChange={(e) => (movie.video = e.target.files[0])}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            {uploaded === 5 ? (
              <button className="productButton" onClick={handleSubmit}>
                Create
              </button>
            ) : (
              <button className="productButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
