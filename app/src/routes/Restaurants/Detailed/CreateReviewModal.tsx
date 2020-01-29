import React from 'react'
import { Modal, Form, Button, DatePicker, Input, message, Rate } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import useApiClient from '../../../lib/useApiClient';
import WrappedFormItem from '../../../components/WrappedFormItem';
import { GetRestaurantByIdResult } from '../../../../generated/restTypes';
import useUserOwnsRestaurant from '../../../lib/useUserOwnsRestaurant';

interface Props {
  restaurantDetailed: GetRestaurantByIdResult;
  setIsVisible: (isVisible: boolean) => void;
  form: FormComponentProps['form'];
}

const CreateReviewModal = ({ setIsVisible, form, restaurantDetailed }: Props) => {
  const apiClient = useApiClient();
  const userOwnsRestaurant = useUserOwnsRestaurant({ restaurantId: restaurantDetailed.id });

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
          setIsVisible(false);
        })
        .catch(err => message.error(`There was an error creating your review: ${err.message}`))
    })
  }

  return (
    <Modal footer={null} visible onCancel={() => setIsVisible(false)}>
      <Form onSubmit={handleSubmit}>
        <h2>Add a reivew:</h2>
        <WrappedFormItem
          form={form}
          name="Rating"
          fieldName="rating"
          required
          component={<Rate />}
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
    </Modal>
  )
}

export default Form.create<Props>()(CreateReviewModal);
