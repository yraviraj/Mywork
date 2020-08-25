import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';


const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);



  useEffect(() => {
    console.log('[ComponentDidMount] start');
    fetch('https://reacthooks-ec297.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        const loadedIngredients = [];
        for (let key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          })
        }
        setUserIngredients(loadedIngredients);
      })
      console.log('[ComponentDidMount] end');
  }, []);

  useEffect(()=>{
    console.log("[ComponentDidUpdate]")
  })

  const filteredIngredientsHandler = filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }

  const addIngredientHandler = ingredient => {
    fetch('https://reacthooks-ec297.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        {
          ...ingredient,
          id: responseData.name
        }
      ]);
    })

  }
  console.log("Rendering..")
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => { }} />
      </section>
    </div>
  );
}

export default Ingredients;
