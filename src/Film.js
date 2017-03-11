import React from 'react';
import api from './api.js';
import {  Link } from 'react-router';
import StackGrid from "react-stack-grid";

var res, res1;
class FilmComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      info : {},
      similarFilm : []
  }
  this.addToFavorite = this.addToFavorite.bind(this);
}
  componentWillMount(){
    var key = this.props.location.query.key;
    api.getFilm(key).then((res)=> {
    res = res;
    this.setState({info : res})
  });
    api.getSimilar(key).then((res1)=> {
    res1 = res1;
    this.setState({similarFilm : res1.results});
  });
}
addToFavorite(e){
  e.stopPropagation();
  e.preventDefault();
  console.log();
  console.log();

  localStorage.setItem(this.props.location.query.key, this.state.info.original_title);
   if (!this.state.bookmarked) {
     this.setState({bookmarked : true});
     e.target.style.color = "yellow";
     localStorage.setItem(this.props.location.query.key,this.state.info.original_title);
   }
   else {
     this.setState({bookmarked : false});
     e.target.style.color = "white";
     localStorage.removeItem(this.props.location.query.key);
   }
   this.forceUpdate();
}

 componentWillReceiveProps(nextProps){
   if (this.props.params.filmName != nextProps.params.filmName) {
     var key = nextProps.location.query.key;
     api.getFilm(key).then((res)=> {
     res = res;
     this.setState({info : res})
   });
     api.getSimilar(key).then((res1)=> {
     res1 = res1;
     this.setState({similarFilm : res1.results});
   });
   }
 }
  render(){
    console.log(location.href , this.props , this.state.info);
    var path = "https://image.tmdb.org/t/p/w500"+this.state.info.poster_path;
    var genres = (this.state.info.genres || []).map(g => g.name).join(', ');
    var prodCountry = (this.state.info.production_countries || []).map(g => g.name).join(', ');
    var filmName = this.state.info.original_title;
    var filmId = this.state.info.id;
    return (

      <div className = "filmContainer item">
      <img className = "mainImg" src={path}/>
      <h1>{filmName}</h1>
      <h3><strong>budjet</strong> : {this.state.info.budget} </h3>
      <h3><strong>overview</strong> - {this.state.info.overview}</h3>
      <h3><strong>rating</strong> - {this.state.info.vote_average}</h3>
      <h3><strong>production countries</strong> : {prodCountry}</h3>
      <h3><strong>genres</strong> - {genres}</h3>
      <a href="#" className="btn btn-info btn-sm" id = "favorite" onClick = {this.addToFavorite} >
        <span className="glyphicon glyphicon-star"></span>
      </a>
      <div className = "SimilarFilmContainer">
      <h2>Similar :</h2>
        {this.state.similarFilm.map( (item , index)=>  {if (index <4) {
          return  <SimilarFilm key= {item.id} to ={'/'+item.title} keyId={item.id} name={item.title} imgsource={"https://image.tmdb.org/t/p/w500"+item.poster_path} />}})
        }
        {
          localStorage.getItem(filmId) == filmName ? <span className="glyphicon glyphicon-star inFavorite"></span> : null
        }

          <Link to="/">
          <a href="#" className="btn btn-info btn-sm" id = "return">
            <span className="glyphicon glyphicon-arrow-left">
            </span>
          </a>
          </Link>

      </div>
    </div>


    )

  }
}

class SimilarFilm extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    var to = this.props.to;
      to = to.split(" ").join("");
      var keyId = this.props.keyId;

    return(
      <div className = "similarFilm col-lg-3">
        <Link to={{ pathname: to , query : {key : keyId }}}   >
        <div className = "item">
          <img className = "similarFilm-img" src= {this.props.imgsource} />
          <h3>{this.props.name}</h3>
        </div>
        </Link>

      </div>
    )
  }
}



export default  FilmComponent ;
