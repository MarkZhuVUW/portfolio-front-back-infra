export interface APIError {
  message: string;
  code: number;
}

// base get
export interface BaseGetRequest {
  url: string;
  options?: any;
}

export interface BaseGetResponse {
  data: any;
  error?: APIError;
}

// base post
export interface BasePostRequest {
  url: string;
  options?: any;
  data: any;
}

export interface BasePostResponse {
  data: any;
  error?: APIError;
}

// base patch
export interface BasePatchRequest {
  url: string;
  options?: any;
  data: any;
}

export interface BasePatchResponse {
  data: any;
  error?: APIError;
}

// base put
export interface BasePutRequest {
  url: string;
  options?: any;
  data: any;
}

export interface BasePutResponse {
  data: any;
  error?: APIError;
}

// delete patch
export interface BaseDeleteRequest {
  url: string;
  options?: any;
  data: any;
}

export interface BaseDeleteResponse {
  data: any;
  error?: APIError;
}
