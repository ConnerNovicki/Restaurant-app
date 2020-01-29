import React from 'react'
import { Card, Input, Button, Form, message, Rate } from 'antd';
import useUserOwnsRestaurant from '../../../lib/useUserOwnsRestaurant';
import { FormComponentProps } from 'antd/lib/form';
import WrappedFormItem from '../../../components/WrappedFormItem';
import useApiClient from '../../../lib/useApiClient';
import moment from 'moment';
import './styles.scss'

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
      <h3>User: {review.author.username}</h3>
      <Rate value={review.rating} disabled />
      <h2>Comments:</h2>
      {review.comments.map(comment => (
        <Card>
          <div>
            <h4>{comment.author.username} ({moment(comment.updatedAt).format('MM/DD/YYYY')})</h4>
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
        </Card>
      ))}
    </Card>
  )
}

export default Form.create<Props>()(ReviewDisplay);
