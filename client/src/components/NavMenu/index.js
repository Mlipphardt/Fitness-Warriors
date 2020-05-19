import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Row } from '../../components/Grid';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import './style.css';

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
    };
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log('logging out');
    API.logout()
      .then(response => {
        if (response.status === 200) {
          this.setState({
            redirectTo: '/',
          });
          this.props.updateUser({
            loggedIn: false,
            username: null,
          });
        }
      })
      .catch(error => {
        console.log('Logout error');
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="topleft">
                Spartan<span class="text-info">Fit</span>
              </h1>
              <div className="links">
                <Row>
                  <Link
                    to="/"
                    className={
                      window.location.pathname === '/' ||
                      window.location.pathname === '/home'
                        ? 'home-link active'
                        : 'home-link'
                    }
                  >
                    home
                  </Link>
                  <Link
                    to="/profile"
                    className={
                      window.location.pathname === '/profile'
                        ? 'profile-link active'
                        : 'profile-link'
                    }
                  >
                    profile
                  </Link>
                  <Link
                    to="/workouts"
                    className={
                      window.location.pathname === '/workouts'
                        ? 'workouts-link active'
                        : 'workouts-link'
                    }
                  >
                    workouts
                  </Link>
                  <div
                    className={
                      window.location.pathname === '/recipes' ||
                      window.location.pathname === '/savedrecipes'
                        ? 'dropdown active'
                        : 'dropdown recipes-link'
                    }
                  >
                    <div
                      className="dropdown"
                      //this adds an arrowm not sure which one looks better
                      //className="dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ cursor: 'pointer' }}
                    >
                      recipes
                    </div>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link className="dropdown-item" to="/savedrecipes">
                        My Recipes
                      </Link>
                      <Link to="/recipes" className="dropdown-item">
                        <span className="text-secondary">Search Recipes</span>
                      </Link>
                    </div>
                  </div>
                  <Link
                    to="/social"
                    className={
                      window.location.pathname === '/social'
                        ? 'workouts-link active'
                        : 'workouts-link'
                    }
                  >
                    social
                  </Link>
                  <Link className="logout-link" to="/" onClick={this.logout}>
                    logout
                  </Link>
                </Row>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default NavMenu;