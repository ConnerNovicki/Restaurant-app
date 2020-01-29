import React from 'react'
import { Card, Input, Button, Form, message } from 'antd';
import useUserOwnsRestaurant from '../../../lib/useUserOwnsRestaurant';
import { FormComponentProps } from 'antd/lib/form';
import WrappedFormItem from '../../../components/WrappedFormItem';
import useApiClient from '../../../lib/useApiClient';
import moment from 'moment';

interface FormProps {
  reply: string;
}

interface Props {
  review: any;
  restaurantId: string;
  form: FormComponentProps<FormProps>['form']
}

const ReviewDisplay = ({ review, restaurantId, form }: Props) => {
  const userOwnsRestaurant = useUserOwnsRestaurant({ restaurantId })
  const apiClient = useApiClient();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    form.validateFields((err, values) => {
      if (err) return;

      const { reply } = values;

      apiClient.createCommentOnReview({ comment: reply }, review.id)
        .then(() => apiClient.fetchRestaurantById({ id: restaurantId }))
        .catch(err => message.error(err.message))
    })
  }

  return (
    <Card>
      <h4>Rating: {review.rating}</h4>
      <p>By: {review.author.username}</p>
      Comments:
      {review.comments.map(comment => (
        <>
          <div style={{ border: '1px solid black' }}>
            <p>By: {comment.author.username}</p>
            <p>{moment(comment.updatedAt).format('MM/DD/YYYY')}</p>
            <p>{comment.text}</p>
          </div>
          {userOwnsRestaurant && review.comments.length < 2 && (
            <Form onSubmit={handleSubmit}>
              <WrappedFormItem
                fieldName="reply"
                name="Reply"
                form={form}
                required
                component={<Input />}
              />
              <Button htmlType="submit">Reply</Button>
            </Form>
          )}
        </>
      ))}
    </Card>
  )
}

export default Form.create<Props>()(ReviewDisplay);
