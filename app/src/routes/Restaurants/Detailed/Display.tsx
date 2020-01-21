import React, { useState } from 'react'
import { GetRestaurantByIdResult } from '../../../../../api/Shared/restTypes'
import { Card, Slider, Input, Form, Button, message, DatePicker, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import useApiClient from '../../../lib/useApiClient';
import WrappedFormItem from '../../../components/WrappedFormItem';

interface Props {
  restaurantDetailed: GetRestaurantByIdResult;
  form: FormComponentProps['form']
}

const RestaurantDetailedDisplay = ({ restaurantDetailed, form }: Props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const apiClient = useApiClient();
  const displayedReviews = restaurantDetailed.reviews.slice(0, 3);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    form.validateFields((err, values) => {
      if (err) return;

      const { dateOfVisit, comment, rating } = values;

      apiClient.addReview(
        { dateOfVisit, comment, rating },
        restaurantDetailed.id
      )
        .then(() => {
          apiClient.fetchRestaurantById({ id: restaurantDetailed.id });
          form.resetFields();
          setIsAddingComment(false);
        })
        .catch(err => message.error(`There was an error creating your review: ${err.message}`))
    })
  }

  return (
    <div>
      <h2>{restaurantDetailed.name}</h2>
      <h3>{restaurantDetailed.description}</h3>
      {displayedReviews.map(review => (
        <Card>
          <h4>Rating: {review.rating}</h4>
          <p>By: {review.author.username}</p>
          Comments:
          {review.comments.map(comment => (
            <div>
              <div>{comment.text}</div>
              <p>{comment.updatedAt}</p>
            </div>
          ))}
        </Card>
      ))}
      <Button onClick={() => setIsAddingComment(true)}>Add Review</Button>
      <Modal footer={null} visible={isAddingComment} onCancel={() => setIsAddingComment(false)}>
        <div>
          <Form onSubmit={handleSubmit}>
            <h2>Add a reivew:</h2>
            <WrappedFormItem
              form={form}
              name="Rating"
              fieldName="rating"
              required
              component={<Slider min={1} max={5} />}
            />
            <WrappedFormItem
              form={form}
              name="Comment"
              fieldName="comment"
              required
              component={<Input.TextArea />}
            />
            <WrappedFormItem
              form={form}
              name="Date of Visit"
              fieldName="dateOfVisit"
              required
              component={<DatePicker />}
            />
            <Button htmlType="submit">Add Review</Button>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default Form.create({ name: 'AddRestaurantReview' })(RestaurantDetailedDisplay);
