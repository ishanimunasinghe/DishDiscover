import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from "react";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({}); // object
  const [activeTab, setActiveTab] = useState("instructions"); // instructions is active by default

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const detailData = await data.json();
      setDetails(detailData);
    };

    fetchDetails();
  }, [params.name]);

  return (
    <DetailWraper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" style={{ width: "25rem" }}></img>
        <hr></hr>
        <h4 dangerouslySetInnerHTML={{ __html: details.summary }}></h4>
      </div>

      <Info>
        <ButtonContainer>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </ButtonContainer>
        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWraper>
  );
}

const DetailWraper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;

  h2 {
    margin-bottom: 2rem;
  }

  h4 {
    margin-top: 2rem;
    font-size: 0.8rem;
    line-height: 1.5rem;
  }

  p {
    margin-top: 2rem;
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  hr {
    margin-top: 2rem;
  }

  li {
    font-size: 1.1rem;
    line-height: 2rem;
  }

  ul {
    margin-top: 2rem;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem; /* Adjust the spacing between buttons as needed */
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
`;

export default Recipe;
