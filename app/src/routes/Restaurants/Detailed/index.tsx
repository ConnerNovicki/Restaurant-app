import React, { useContext, useEffect } from 'react'
import { IStoreContext, StoreContext } from '../../../lib/context'
import useApiClient from '../../../lib/useApiClient';
import { useParams, useHistory } from 'react-router-dom';
import RestaurantDetailedDisplay from './Display';

interface QueryParams {
  id: string;
}

const Detailed = () => {
  const history = useHistory();
  const params = useParams() as QueryParams;
  const apiClient = useApiClient();
  const { state: { restaurantsById } } = useContext<IStoreContext>(StoreContext);

  useEffect(() => {
    if (!params.id) {
      history.push('/restaurants');
      return;
    }
    apiClient.fetchRestaurantById({ id: params.id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!params.id) {
    history.push('/restaurants');
  }

  const restaurant = restaurantsById[params.id];

  if (!restaurant) {
    return <div>Loading...</div>
  }

  return (
    <RestaurantDetailedDisplay
      restaurantDetailed={restaurant}
    />
  )
}

export default Detailed
