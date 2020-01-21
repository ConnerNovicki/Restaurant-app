import { useContext, useEffect } from "react"
import { IStoreContext, StoreContext } from "./context"
import useApiClient from "./useApiClient";

export default ({ restaurantId }): boolean => {
  const { state: { user, userRestaurants } } = useContext<IStoreContext>(StoreContext);

  const apiClient = useApiClient();

  useEffect(() => {
    apiClient.fetchUserRestaurants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !!user && userRestaurants.some(restaurant => restaurant.id === restaurantId);
}