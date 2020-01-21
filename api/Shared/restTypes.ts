import { User, Role, Restaurant, Review, Comment } from "@prisma/photon";

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
}

export type PostUserResult = {
  user: Pick<User, 'id' | 'role' | 'username'>;
  token: string;
};

export type GetUserRestaurantsResult = {
  id: Restaurant['id'];
  name: Restaurant['name'];
  description: Restaurant['description'];
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
  numReviews: number;
  numComments: number;
}[];

export interface PostUserRestaurantArgs {
  name: string;
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
  numComments: number;
  reviews: {
    id: Review['id']
    dateOfVisit: Review['dateOfVisit']
    rating: Review['rating'];
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
