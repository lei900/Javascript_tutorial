// Call the main functions the page is loaded
window.onload = () => {
  getOriginals()
  getTrendingNow()
  getTopRated()
}

// ** Helper function that makes dynamic API calls **
function fetchMovies(url, dom_element, path_type, movie_type) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('something went wrong')
      }
    })
    .then(data => {
      showMovies(data.results, dom_element, path_type, movie_type)
    })
    .catch(error_data => {
      console.log(error_data)
    })
}

//  ** Display the movies to the DOM **
function showMovies(movies, dom_element, path_type, media_type) {
  let moviesEl = document.querySelector(dom_element)

  movies.forEach(movie => {
    let imageElement = document.createElement('img')  //create an img element
    imageElement.setAttribute('data-id', movie.id)  // Set attribute
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`  // Set source
    // Add event listener to handleMovieSelection() onClick
    imageElement.addEventListener('click', e => {
      handleMovieSelection(e, media_type)
    })
    moviesEl.appendChild(imageElement)  // Append the imageElement
  });
  }

// ** Fetch Netflix Originals **
function getOriginals() {
  let url = 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_original_language=ko&with_networks=213'
  fetchMovies(url,  '.original__movies', 'poster_path', 'tv')
}
// ** Fetch Trending Movies **
function getTrendingNow() {
  let url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
  fetchMovies(url, '#trending', 'backdrop_path', 'movie')
}
// ** Fetch Top Rated Movies **
function getTopRated() {
  let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&page=1'
  fetchMovies(url, '#top_rated', 'poster_path', 'movie')
}


// ** Fetches URL provided and returns response.json()
async function getMovieTrailer(media_type, id) {
  var url = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
  return await fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('something went wrong')
    }
  })
}

// ** Function that adds movie data to the DOM
const setTrailer = (trailers) => {
  // Set up iframe variable to hold id of the movieTrailer Element
  const iframe = document.getElementById('movieTrailer')
  // Set up variable to select .movieNotFound element
  const movieNotFound = document.querySelector('.movieNotFound')

  // If there is a trailer add the src for it
  if (trailers.length > 0) {
    // add d-none class to movieNotFound and remove it from iframe
    movieNotFound.classList.add('d-none')
    iframe.classList.remove('d-none')
    // add youtube link with trailers key to iframe.src
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
  } else {
    // Else remove d-none class to movieNotfound and ADD it to iframe
    iframe.classList.add('d-none')
    movieNotFound.classList.remove('d-none')
  }
}

const handleMovieSelection = (e, media_type) => {
  const id = e.target.getAttribute('data-id')

  getMovieTrailer(media_type, id).then(data => {
    const results = data.results
    const youtubeTrailers = results.filter(result => {
      if (result.site == 'YouTube' && result.type == 'Trailer') {
        return true
      } else {
        return false
      }
    })
    setTrailer(youtubeTrailers)
  })

  // open modal
  $('#trailerModal').modal('show')
}
