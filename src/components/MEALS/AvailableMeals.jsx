import React,{useEffect, useState} from "react"
import Card from "../UI/Card"
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem"


const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://foodmeal-app-default-rtdb.firebaseio.com/meals.json"
      )
      if (!response.ok) {
        throw new Error('Something went Wrong please check network')
      }
      const data = await response.json()
console.log(data)
      const loadedMeals = []
      for ( const  keys in data) {
        loadedMeals.push({
          id: keys,
          name: data[keys].name,
          price: data[keys].price,
          description : data[keys].description
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }

   fetchMeals().catch (error=> {
      setIsLoading(false)
      setHttpError(error.message)

})

  }, [])

  if (isLoading) {
    return <section   className={classes.mealsLoading}>
      <p>data loading ...</p>
    </section>
  }

  if (httpError) {
     return (
       <section className={classes.mealsError}>
         <p>{httpError}</p>
       </section>
     )
  }
  const mealList = meals.map((meal) => {
    return <MealItem key={meal.id}
      name={meal.name}
      id = {meal.id}
      price={meal.price}
    description = {meal.description}/>
  })
  return (
    <section className={classes.meals}>
      <Card>
        {" "}
        <ul>{mealList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
