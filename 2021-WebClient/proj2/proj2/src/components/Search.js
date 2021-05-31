import React from 'react';
import Movie from './Movie';
import Button from './Button';
import "./Search.css";
import {naverMoviesApi} from '../api';

class Search extends React.Component {
  state = {
    isLoading: false,
    movies: [],
    value: "",
    name: "영화 검색",
  };

  getSearchMovie = async () => {
    console.log('search Movie');
    const search = this.state.value;

    try {
      if (search === "") {
        this.setState({movies: [], isLoading: false})
      } else {
        this.setState({movies: [], isLoading: true})
        const {data: {
            items
          }} = await naverMoviesApi.search(search);
        alert("(Loading 메시지 확인중...)");
        this.setState({movies: items, isLoading: false});
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getSearchMovie();
  };

  handleChange = (e : any) => {
    this.setState({value: e.target.value});
  };

  handleSubmit = (e : any) => {
    e.preventDefault();
    this.getSearchMovie();
  };

  clickIndex(index){
    this.setState ( {index : index});
  };

  render() {
    const {movies, isLoading, name} = this.state;
    
    return (<section className="container">
      {
        isLoading
          ? (<div className="loader">
            <span className="loader__text">({this.state.name}) Loading... {this.state.value}</span>
          </div>)
          : (<div>
            <form onSubmit={this.handleSubmit}>
            <div>
              <div className="input_div">
                <h1 className="search_h">영화 검색 서비스</h1>
                <div className="input_h">
                <input className="input_search" type="text" value={this.state.value} onChange={this.handleChange} placeholder="영화 이름을 입력하세요"/>
                <button className="plus_div" onClick={this.getSearchMovie}>+</button>
                </div>
              </div>


            </div>
          </form>
            <div className="buttons">
            {movies.map((movie, index) => (<Button key={index} idx={index} id={movie.link} year={movie.pubDate} title={movie.title} poster={movie.image} rating={movie.userRating} director={movie.director} actor={movie.actor} onlclick=""/> ))}
            </div>
            
            <div className="movies">
              {movies.map((movie, index)=>{
                  if( movie.id == this.state.index){
                    return(
                      <Movie key={movie.link} id={movie.link} year={movie.pubDate} title={movie.title} poster={movie.image} rating={movie.userRating} director={movie.director} actor={movie.actor}/>
                    )}
                })
              }
            </div>
            </div>)
      }
    </section>);
  }
}



export default Search;
