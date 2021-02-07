 const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=6";
 /*const APIURL = "https://api.themoviedb.org/3/discover/tv?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=fals";*/

 const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHURL="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

 const main = document.getElementById('main');
 const form = document.getElementById('form');
 const search = document.getElementById('search');

 getMovies(APIURL);

 async function getMovies(APIURL){
     const response = await fetch(APIURL);
     const respData = await response.json();
     console.log(respData);

     showMovies(respData.results);
 }

 function showMovies(movies){
    main.innerHTML='';
    movies.forEach((movie) => {

        const {poster_path, title, vote_average, overview, backdrop_path }=movie;
         const movies = document.createElement('div');
         movies.classList.add('movies');

         movies.innerHTML=`
         <img 
         src="${IMGPATH+backdrop_path}" 
         alt="${title}"
         />
        <div class="movie-info">
            ${title}
            <span class=${getColor(vote_average)}>${vote_average}</span>
        </div>
        <div class="overview">
            <h4>Overview;</h4>
            <p>${overview}</p>
            
        </div>`;
         main.appendChild(movies);    
     });

 }

 function getColor(vote){
     if (vote>=8){
         return "green";
         
     }else if(vote>=6){
         return "orange";
     }else{
         return "red";
     };

 }

 

 form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(search.value);

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHURL+searchTerm);
    }
    search.value='';
    

 });
       

 