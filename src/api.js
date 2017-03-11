var api = {
   getMovies() {
  var url = 'https://api.themoviedb.org/3/movie/popular?api_key=e2b8ca62f36db5bfc22421fb077cfff9&language=en-US&page=1';
return fetch(url).then((res)=>res.json());
  },
  getNextMovies(counter){
 var url = 'https://api.themoviedb.org/3/movie/popular?api_key=e2b8ca62f36db5bfc22421fb077cfff9&language=en-US&page='+counter;
return fetch(url).then((res)=>res.json());
 },
 getFilm(filmId) {
var url = "https://api.themoviedb.org/3/movie/"+filmId+"?api_key=e2b8ca62f36db5bfc22421fb077cfff9&language=en-US";
return fetch(url).then((res)=>res.json());
},
 getSimilar(filmId){
   var url = "https://api.themoviedb.org/3/movie/"+filmId+"/similar?api_key=e2b8ca62f36db5bfc22421fb077cfff9&language=en-US&page=1";
   return fetch(url).then((res)=>res.json());
 }
}

module.exports = api;
