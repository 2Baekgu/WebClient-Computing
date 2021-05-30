import React from "react";
import Search from "./Search"
import PropTypes, { func } from "prop-types";
import "./Button.css";
import Movie from './Movie';
import { render } from "react-dom";

function Button({idx, id, year, title, poster, rating, director, actor}){
    var btn = <button className="button" id={id} year={year} title={title} poster={poster} rating={rating} director={director} actor={actor} index={idx} onClick={()=>{document.querySelectorAll('.movie').forEach(element => element.style="display:none");document.querySelectorAll('.movie')[idx].style="display:unset;"}}>{idx+1}</button>
    return(
        btn
    )
};

export default Button;

// function Movie({id, year, title, poster, rating, director, actor}) {
//   return (
//     <div className="movie">
//     <a href={id} target="_blank">
//     <img src={poster} alt={title} titlt={title}></img>
//     <div className="movie__data">
//       <h3 className="movie__title">{
//           title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")
//         }</h3>
//       <p className="movie__rating">
//         <span>평점</span> {rating}/10
//       </p>
//       <p className="movie__year">
//         <span>개봉일</span> {year}
//       </p>
//     <p className="movie__director">
//       <span>감독</span> {director}
//     </p>
//     <p className="movie__actor">
//       <span>배우</span> {actor}
//     </p>
//     </div>
//   </a>
//   </div>
//   )
// };

