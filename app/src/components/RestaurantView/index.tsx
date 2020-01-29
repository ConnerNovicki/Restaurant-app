import React from 'react'
import { Card, Rate } from 'antd';
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
      style={{ margin: '1rem 0' }}
    >
      <div className="card">
        <div className="restaurant-img" style={{ backgroundImage: `url(${logoImage})` }} />
        <div className="card-content">
          <h2>{restaurant.name}</h2>
          {restaurant.averageRating
            ? (
              <span style={{ display: 'flex', alignItems: 'center', padding: '0 0 1rem 0' }}>
                <h4 style={{margin: '0 1rem 0 0'}}>Average Rating: </h4>
                <Rate value={restaurant.averageRating} disabled />
              </span>
            )
            : <h4>No ratings</h4>
          }
          <p>{restaurant.description}</p>
          <h5>Total Reviews: {restaurant.numReviews}</h5>
          <h5>Total Comments: {restaurant.numComments}</h5>
        </div>
      </div>
    </Card>
  )
}

export default Restaurant
