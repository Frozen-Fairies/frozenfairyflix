import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, BrowserRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, profile} from './components'
import {me} from './store'
import AllMovies from './components/allMovies'
import CartView from './components/CartView'
import OrderHistory from './components/UserOrderHistory'
import SingleMovieView from './components/singleMovieView'
import CheckoutSuccess from './components/CheckoutSuccess'
import profileUpdate from './components/profileUpdate'
import AdminFilms from './components/AdminFilms'
import AdminEditFilm from './components/AdminEditFilm'
import AdminOrders from './components/AdminOrders'
import AdminOrdersUser from './components/AdminOrdersUser'
import AdminEditUser from './components/AdminEditUser'
import AdminUsers from './components/AdminUsers'
import Tags from './components/Tags'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* <Route exact path="/" component={AllMovies} /> */}
        <Route exact path="/" component={AllMovies} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/profile" component={profile} />
        <Route exact path="/profile/update" component={profileUpdate} />

        <Route exact path="/orders/cart" component={CartView} />

        <Route exact path="/orders/history" component={OrderHistory} />

        <Route exact path="/orders/cart/success" component={CheckoutSuccess} />
        <Route path="/admin/films/:id" component={AdminEditFilm} />
        <Route exact path="/admin/films" component={AdminFilms} />
        <Route path="/admin/users/:userId" component={AdminEditUser} />
        <Route exact path="/admin/users" component={AdminUsers} />

        <Route
          path="/admin/orders/history/:userId"
          component={AdminOrdersUser}
        />
        <Route exact path="/admin/orders/history" component={AdminOrders} />

        <Route path="/movies/tags/:tagName" component={Tags} />
        <Route path="/movies/:genre/:uniqueId" component={SingleMovieView} />

        {/* {isLoggedIn && ( */}
        <Switch>
          {/* Routes placed here are only available after logging in */}

          <Route
            // path={`/movies/${this.props.selectedGenre}`}
            path="/movies/:genre"
            component={AllMovies}
          />
        </Switch>

        {/* )} */}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    selectedGenre: state.movies.selectedGenre
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
