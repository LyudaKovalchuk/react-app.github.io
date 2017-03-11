var api2 = {

  getImg(){
   var url = 'https://api.themoviedb.org/3/movie/313369/images?api_key=e2b8ca62f36db5bfc22421fb077cfff9&language=en-US';
 return fetch(url).then((res)=>res.json());

  }
}
module.exports = api2;
