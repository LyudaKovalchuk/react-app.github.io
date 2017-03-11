import React from 'react';
import {  Link } from 'react-router';

class SimilarFilm extends React.Component{
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(){
    return true;
  }
  render(){
      var to = this.props.to;
      to = "/similar"+to.split(" ").join("");
      var keyId = this.props.keyId;
      console.log(to);
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

export default  SimilarFilm ;
