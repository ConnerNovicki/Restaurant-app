import React, { useEffect, useContext } from 'react'
import { IStoreContext, StoreContext } from '../../lib/context';
import useApiClient from '../../lib/useApiClient';
import RestaurantView from '../../components/RestaurantView'

const Home = () => {
  const apiClient = useApiClient();
  const { state } = useContext<IStoreContext>(StoreContext);
  useEffect(() => {
    apiClient.fetchAllRestaurants();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      Restaurants:
      {state.restaurants.map(restaurant => (
        <div>
          <RestaurantView user={state.user} restaurant={restaurant} />
        </div>
      ))}
    </div>
  )
}

export default Home
