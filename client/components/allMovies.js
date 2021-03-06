import React from 'react'
import {getAllMoviesThunk, getFeaturedMoviesThunk} from '../store/movies'
import {connect} from 'react-redux'
import SingleMovie from './singleMovie'

class DisconnectedAllMovies extends React.Component {
  componentDidMount() {
    const genre = this.props.match.params.genre
    if (!genre || genre === 'featured') {
      this.props.getFeaturedMovies()
    } else {
      this.props.getMovies(
        genre[0].toUpperCase() + genre.slice(1).toLowerCase()
      )
    }
  }

  render() {
    return (
      <div className="container is-fluid">
        <div className="columns is-multiline">
          {this.props.movies.map(movie => {
            return <SingleMovie key={movie.id} movie={movie} />
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.allMovies,
    selectedGenre: state.movies.selectedGenre
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMovies: genre => dispatch(getAllMoviesThunk(genre)),
    getFeaturedMovies: () => dispatch(getFeaturedMoviesThunk())
  }
}

const AllMovies = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAllMovies
)

export default AllMovies
