export type User = {
  [x: string]: any;
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

export interface IinitialStateList {
  _id: string;
  imageURL: string;
  tags: string;
  user: User;
  size: number;
  price: number;
  createdAt: string;
}

export type initialStateType = {
  [x: string]: any;
  list: IinitialStateList[];
  loading: string;

};

export type userDataType = {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string
  avatarUrl: string;
  token?: string
}

export type InitialStateAuthType = {
  userData: userDataType;
  loading: boolean | string;
  token: string | null;
};

export type PhotoType = {
  _id?: string;
  imageURL: string;
  tags: string;
  user: string;
  price?: number;
  size: number;
  createdAt?: string;
  updatedAt?: string;
}

export type loadingType = string;

export type textForPushComponentType = {
  addPhoto: string;
  deletePhoto: string;
  editPhoto: string;
}

export type arrForEditPhotoType = {
  id: string | string[];
  tags: string;
  price: number;
}