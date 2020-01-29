import { User, Role, Restaurant, Review, Comment } from "@prisma/client";

export interface PostLoginResult {
  user: Pick<User, 'id' | 'role' | 'username'>;
  token: string;
};

export interface PostLoginArgs {
  username: string;
  password: string;
}

export interface PostUserArgs {
  role: Role;
  username: string;
  password: string;
}

export type PostUserResult = {
  user: Pick<User, 'id' | 'role' | 'username'>;
  token: string;
};

export type GetUserRestaurantsResult = {
  id: Restaurant['id'];
  name: Restaurant['name'];
  description: Restaurant['description'];
  averageRating: number;
  numReviews: number;
  numComments: number;
  reviews: {
    id: Review['id']
    author: Pick<User, 'username'>;
    rating: Review['rating'];
    comments: {
      id: Comment['id'];
      author: Pick<User, 'username'>
    }[]
  }[]
}[]

export type GetRestaurantsResult = {
  id: string;
  name: string;
  description: string;
  averageRating: number;
  numReviews: number;
  numComments: number;
}[];

export interface PostUserRestaurantArgs {
  name: string;
  description: string;
}

export type PostUserRestaurantResult = Restaurant;

export type GetUserResult = User;

export interface GetRestaurantByIdArgs {
  id: Restaurant['id'];
}

export type GetRestaurantByIdResult = {
  id: Restaurant['id']
  name: Restaurant['name']
  description: Restaurant['description']
  numReviews: number;
  averageRating: number;
  numComments: number;
  reviews: {
    id: Review['id'];
    dateOfVisit: Review['dateOfVisit'];
    rating: Review['rating'];
    createdAt: Review['createdAt'];
    author: Pick<User, 'username' | 'id'>;
    comments: {
      id: Comment['id'];
      updatedAt: Comment['updatedAt'];
      text: Comment['text'];
      author: Pick<User, 'username' | 'id'>;
    }[]
  }[]
};

export interface PostRestaurantReviewArgs {
  comment: string;
  rating: number;
  dateOfVisit: Date;
}

export type PostRestaurantReviewResult = Pick<Review, 'id' | 'dateOfVisit' | 'rating'>;

export type GetAllUsersResult = Pick<User, 'id' | 'role' | 'username' | 'createdAt'>[];

export type DeleteUserResult = Pick<User, 'id'>;

export type DeleteCommentResult = Pick<Comment, 'id'>;

export type DeleteReviewResult = Pick<Review, 'id'>;

export type DeleteRestaurantResult = Pick<Restaurant, 'id'>;

export interface PostReviewCommentArgs {
  comment: string;
}

export type PostReviewCommentResult = Pick<Comment, 'id'>;

export type PutUserArgs = Pick<User, 'role' | 'username'>;

export type PutRestaurantArgs = Pick<Restaurant, 'description' | 'name'>;

export type PutReviewArgs = Pick<Review, 'dateOfVisit' | 'rating'>;

export type PutCommentArgs = Pick<Comment, 'text'>;

export type PutResult = { id: string; };