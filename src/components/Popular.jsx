import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Popular() {
  // modify popular var using setPopular function, [] defines type of data present
  const [popular, setPopular] = useState([]);

  // run function immediately, [] to only run component when mounted
  useEffect(() => {
    getPopular();
  }, []);

  // async because we need to wait for data before rendering
  const getPopular = async () => {
    // store recipes in local storage to not waste api calls
    const check = localStorage.getItem("popular");

    // if there is an item in local storage, don't fetch again
    if (check) {
      setPopular(JSON.parse(check)); // parsing back from string to array when pulling from storage
    } else {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9`;
      const api = await fetch(apiUrl);
      const data = await api.json(); // get json format of fetched data

      localStorage.setItem("popular", JSON.stringify(data.recipes)); // stringify bc you can only save strings in local storage
      setPopular(data.recipes);
      console.log(data.recipe);
    }
  };

  return (
    <div>
      {/* going through each output in array (recipe) and outputting each value/recipe */}
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: true,
            pagination: false,
            drap: "free",
            gap: "8rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title}></img>
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
          ;
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 20rem;
  min-width: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 1rem;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
`;

export default Popular;
