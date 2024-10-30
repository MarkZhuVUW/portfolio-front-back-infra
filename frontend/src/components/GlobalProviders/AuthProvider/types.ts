import { BaseGetRequest, BaseGetResponse, BasePostRequest, BasePostResponse } from "../ErrorProvider";


// user
export interface User {
  email: string;
  name: string;
  imageUrl: string;
  userId: string;
  userName: string;
}

export interface UserGetRequest extends BaseGetRequest {}

export interface UserGetResponse extends BaseGetResponse {
  data: User;
}

export interface UserPostRequest extends BasePostRequest {
  data: User;
}

export interface UserPostResponse extends BasePostResponse {
  data: {
    userId: string;
  };
}

// google user
export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  id: string;
}

export interface GoogleUserGetRequest extends BaseGetRequest {}

export interface GoogleUserGetResponse extends BaseGetResponse {
  data: GoogleUser;
}
