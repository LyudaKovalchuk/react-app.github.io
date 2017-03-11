import React from 'react';
import './App.css';
import api from './api.js';
import api2 from './api2.js';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import {  Link } from 'react-router';
import StackGrid from "react-stack-grid";


class Favorite extends React.Component {
  constructor(props) {
    super(props);
    localdata : Object.keys(localStorage);

    this.deleteFromFavorite = this.deleteFromFavorite.bind(this);
  }
  deleteFromFavorite(e){
  e.stopPropagation();
  e.preventDefault();
  localStorage.removeItem(this.props.value);
  this._reactInternalInstance._currentElement._owner._instance.forceUpdate();
}
  shouldComponemtUpdate(nextProps, nextState){
    if (this.state.localdata != nextState.localdata){
      this.forceUpdate();
    }

  }
  render(){
    var to  = this.props.qkey;
    var keyId = this.props.value;
    return (
      <div>
        <Link to={{ pathname: to , query : {key : keyId }}}><li><a>{this.props.qkey} </a></li>
        <span className="glyphicon glyphicon-trash" onClick = {this.deleteFromFavorite} ></span></Link>
      </div>
    )
  }

}

class Navigationbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bookmarks : [],

    }
    this.showBookmarks = this.showBookmarks.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);

    }
  showBookmarks(){
    if ( !show ){
      document.querySelector(".listOfFavorite").style.display = "block"
      show = true;
    }

    keys = Object.keys(localStorage);
    console.log(this);
    let state = [];
    keys.forEach( (item) => state.push(item));
    this.setState({bookmarks: state});
    console.log(this.state.bookmarks);
    this.forceUpdate();
  }
  mouseLeave(){
    document.querySelector(".listOfFavorite").style.display = "none";
    show = false;
  }

  render() {
    return (
      <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
      <img src="https://www.themoviedb.org/assets/static_cache/8ce4f6ee3ea26190a7f21d1f9e7e9be2/images/v4/logos/182x162.png"/>
        <a href="#">My train React app</a>
      </Navbar.Brand>
    </Navbar.Header>
    <a href="#" className="btn" id = "showFavorite" onClick = {this.showBookmarks}  >
      <span className="glyphicon glyphicon-star"></span>
    </a>
    <ul className = "listOfFavorite" onMouseLeave = {this.mouseLeave} >
    {this.state.bookmarks.map( (item) => <Favorite qkey={localStorage.getItem(item)} value = {item} /> )}
    </ul>

  </Navbar>
    );
  }
}

var qqq, counter=1 , keys, show = false ;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      res : [],
      displayFilms : props.arrFilm
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if (this.props != nextProps){
        this.setState({displayFilms:nextProps.arrFilm});
     }
  }
 loadMore(){
   counter++;
   let moreItems = [];
   api.getNextMovies(counter).then((res)=> {
     moreItems = res.results;
     qqq = qqq.concat(moreItems);
     console.log(qqq);
     setTimeout(() => {
    this.setState({
      res: this.state.res.concat(moreItems)
    })
  }, 1000);
  });
 }
  handleSearch(e){
    console.log(this.state.res);
    var searchQuery = e.target.value.toLowerCase();
    var displayFilmsFilter =  qqq.filter(function(item){
      var val = item.title.toLowerCase();
      return val.indexOf(searchQuery) !== -1;
    });
    this.setState({res : displayFilmsFilter})
  }
  componentWillMount(){
    api.getMovies().then((res)=> {
      qqq = res.results;
      this.setState({
        res: res.results
      })
    }
  );
  }

 render() {
   const arr = this.state.res;

   return <div>
   <Navigationbar/>
   <div className = "row form-group">
    <label>Search<span className="glyphicon glyphicon-search"></span></label>
    <input type="text" className="form-control" onChange={this.handleSearch}/>
   </div>
   <InfiniteScroll
     next={this.loadMore}
     hasMore={true}
     scrollThreshold = {0.99}
     endMessage={10}>

     <ul>
       <StackGrid columnWidth= {300}>
     {this.state.res.map((item)=> <Film  to ={'/'+item.title} keyId={item.id} name={item.title} imgsource={"https://image.tmdb.org/t/p/w500"+item.poster_path} path="https://image.tmdb.org/t/p/w500" bookmarked = {false} />)}
     </StackGrid>
     </ul>


   </InfiniteScroll>
   </div>;
 }
}
class Film extends React.Component{
  constructor(props){
    super(props);
    this.addToFavorite = this.addToFavorite.bind(this);
    this.state = {
      bookmarked : false
    }
  }
  addToFavorite(e){
    e.stopPropagation();
    e.preventDefault();
     if (!this.state.bookmarked) {
       this.setState({bookmarked : true});
       e.target.style.color = "yellow";
       localStorage.setItem(this.props.keyId, this.props.name);
     }
     else {
       this.setState({bookmarked : false});
       e.target.style.color = "white";
       localStorage.removeItem(this.props.keyId);
     }

  }

  render(){
    var to = this.props.to;
    to = to.split(" ").join("");
    var keyId = this.props.keyId;

    return <li >


    <Link to={{ pathname: to , query : {key : keyId }}}>
      <div className = "item">
        <img src={this.props.imgsource}/>
        <h3>{this.props.name}</h3>
        <a href="#" className="btn btn-info btn-sm" id = "favorite" onClick = {this.addToFavorite} >
          <span className="glyphicon glyphicon-star"></span>
        </a>
      </div>
      </Link>


    </li>

  }
}

 export default App;
