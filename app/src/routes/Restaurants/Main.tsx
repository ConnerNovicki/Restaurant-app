import React, { useEffect, useContext, useState } from 'react'
import { IStoreContext, StoreContext } from '../../lib/context';
import useApiClient from '../../lib/useApiClient';
import RestaurantView from '../../components/RestaurantView'
import { Select } from 'antd';
import { sortAndFilterRestaurants, SORT_BY, FILTER_BY, } from '../../lib/sortAndFilterRestaurants'
import './styles.scss';
import Block from '../../components/Block';

const Home = () => {
  const [sortBy, setSortBy] = useState<SORT_BY>('RATING_DESC')
  const [filterBy, setFilterBy] = useState<FILTER_BY>(null)
  const apiClient = useApiClient();
  const { state } = useContext<IStoreContext>(StoreContext);
  useEffect(() => {
    apiClient.fetchAllRestaurants();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { restaurants } = state;

  const handleOnFilterChange = (value: FILTER_BY) => setFilterBy(value)
  const handleOnSortChange = (value: SORT_BY) => setSortBy(value)

  const sortAndFilteredRestaurants = sortAndFilterRestaurants({
    sortBy,
    filterBy,
    restaurants
  });

  return (
    <Block classNames={['restaurants-main']}>
      <div className="header">
        <h3>All Restaurants:</h3>
        <div>
          <label>Star Rating:</label>
          <Select className="filter-box" value={filterBy} onChange={handleOnFilterChange}>
            <Select.Option value={null}>All</Select.Option>
            <Select.Option value="RATING_5">5 Star</Select.Option>
            <Select.Option value="RATING_4">4 Star</Select.Option>
            <Select.Option value="RATING_3">3 Star</Select.Option>
            <Select.Option value="RATING_2">2 Star</Select.Option>
            <Select.Option value="RATING_1">1 Star</Select.Option>
          </Select>
          <label>Sort by:</label>
          <Select className="filter-box" value={sortBy} onChange={handleOnSortChange}>
            <Select.Option value="RATING_ASC">Rating ascending</Select.Option>
            <Select.Option value="RATING_DESC">Rating descending</Select.Option>
          </Select>
        </div>
      </div>

      <div className="content">
        {sortAndFilteredRestaurants.map(restaurant => (
          <RestaurantView restaurant={restaurant} />
        ))}
      </div>
    </Block>
  )
}

export default Home
