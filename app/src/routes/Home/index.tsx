import React, { useEffect, useContext } from 'react'
import api from '../../lib/api'
import { IStoreContext, StoreContext } from '../../lib/context';
import { Actions } from '../../lib/actions';

const Home = () => {
  const { dispatch, state } = useContext<IStoreContext>(StoreContext);
  useEffect(() => {
    api.allRestaurants()
      .then(res => {
        dispatch(Actions.saveRestaurants(res));
      })
  }, [dispatch])

  return (
    <div>
      Restaurants:
      {state.restaurants.map(restaurant => (
        <div>{restaurant.name}</div>
      ))}
    </div>
  )
}

export default Home
