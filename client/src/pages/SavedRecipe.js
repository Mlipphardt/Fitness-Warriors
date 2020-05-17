import React, { Component } from "react";
import RecipeCard from "../components/RecipeCard";
import API from "../utils/API";
import Wrapper from "../components/Wrapper";
import GridContainer from "../components/GridContainer";

class Recipes extends Component {
  state = {
    id: null,
    results: [],
  };

  // Upon initial render, populate recipe cards from user's favorites
  componentDidMount = () => {
    this.loadUserRecipes();
  };

  //Grab user recipes
  loadUserRecipes = () => {
    API.getMealsByUser(this.props.id).then((res, err) => {
      if (err) {
        console.log(err);
      }
      res.data.meal.map((recipe) => console.log(recipe.image));
      this.setState({ results: res.data.meal });
    });
  };

  render() {
    return (
      <div>
        <div className="recipes">
          <div className="text-center mb-5 pt-5">
            <h1>
              <strong>Your Favorites</strong>
            </h1>
          </div>
          <Wrapper>
            <div className="main-container mb-5">
              <GridContainer style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                {/* Generate recipe cards for each result */}
                {this.state.results.map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    id={index}
                    image={recipe.image}
                    name={recipe.title}
                    link={recipe.link}
                  />
                ))}
              </GridContainer>
            </div>
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default Recipes;
