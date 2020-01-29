import React from 'react'
import { Card } from 'antd';
import { useHistory } from 'react-router-dom';
import logoImage from '../../assets/food1.png';
import './styles.scss';

interface Props {
  restaurant: {
    id: string;
    name: string;
    averageRating: number;
    description: string;
    numReviews: number;
    numComments: number;
  }
}

const Restaurant = ({ restaurant }: Props) => {
  const history = useHistory();
  return (
    <Card
      onClick={() => history.push(`/restaurants/${restaurant.id}`)}
      className="restaurant-card"
      style={{ margin: '1rem 0'}}
    >
      <div className="card">
        <div className="restaurant-img" style={{ backgroundImage: `url(${logoImage})` }} />
        <div className="card-content">
          <h2>{restaurant.name}</h2>
          {restaurant.averageRating ? <h4>Average Rating: {restaurant.averageRating}</h4> : <h4>No ratings</h4>}
          <p>{restaurant.description}</p>
          <p>Total Reviews: {restaurant.numReviews}</p>
          <p>Total Comments: {restaurant.numComments}</p>
        </div>
      </div>
    </Card>
  )
}

export default Restaurant
