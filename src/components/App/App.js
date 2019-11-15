import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';

// import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import WorkoutsPage from '../WorkoutsPage/WorkoutsPage';
import WorkoutSummary from '../WorkoutSummary/WorkoutSummary';
import WorkoutPreview from '../WorkoutPreview/WorkoutPreview';
import WeeksPage from '../WeeksPage/weeksPage';
import Test from '../testRoutesPage/testRoutesPage';
import Archived from '../Archived/Archived';
import AdminEditUser from '../AdminEditUser/AdminEditUser';
import AdminAddWorkout from '../AdminAddWorkout/AdminAddWorkout';

import UserProfile from '../UserProfile/UserProfile';
import AdminViewUser from '../AdminViewUser/AdminViewUser';

import './App.css';
import UserExercise from '../UserExercise/UserExercise';
import adminLandPage from '../AdminLandPage/adminLandPage';
import AddExercise from '../AddExercise/AddExercise';
import AdminAddUser from '../AdminAddUser/AdminAddUser';
import ExerciseDetail from '../ExerciseDetail/ExerciseDetail';
import DropDrawer from '../DropDrawer/DropDrawer';
import AdminUserProfile from '../AdminUserProfile/AdminUserProfile';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <header className="app-header">
          <DropDrawer/>
          </header>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            {(!this.props.user.admin) ? <Redirect exact from="/" to="/home" /> : <Redirect exact from="/home" to="/admin" />}
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/workouts/week/:id"
              component={WorkoutsPage}
            />
            <ProtectedRoute
              exact
              path="/exercise/:id"
              component={UserExercise}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={UserProfile}
            />
            <ProtectedRoute
              exact
              path="/preview/:id"
              component={WorkoutPreview}
            />
            <ProtectedRoute
              exact
              path="/summary/:id"
              component={WorkoutSummary}
            />
            <ProtectedRoute
              exact
              path="/admin/edituser/:id"
              component={AdminEditUser}
            />
            <ProtectedRoute
              exact
              path="/admin/addworkout"
              component={AdminAddWorkout}
            />
            {/* This route is to show all the routes to the user
            */}
            <ProtectedRoute
              exact
              path="/weeks"
              component={WeeksPage}
            />
             <ProtectedRoute
              exact
              path="/admin"
              component={adminLandPage}
              />
            <ProtectedRoute
              exact
              path="/test"
              component={Test}
            />
            <ProtectedRoute
              exact
              path="/archived"
              component={Archived}
            />
            <ProtectedRoute
              exact
              path="/adminviewuser"
              component={AdminViewUser}
            />
            <ProtectedRoute
              path="/addExercise"
              component={AddExercise}
              exact
            />
            <ProtectedRoute
              path="/adminadduser"
              component={AdminAddUser}
              exact
            />
            <ProtectedRoute
              path="/adminviewuser/:id"
              component={AdminViewUser}
              exact
            />
            <ProtectedRoute
              path="/adminuserprofile/:id"
              component={AdminUserProfile}
              exact
            />
            <ProtectedRoute
              path="/exerciseDetail/:id"
              component={ExerciseDetail}
              exact
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(App);
