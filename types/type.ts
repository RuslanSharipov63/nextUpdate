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
  tags: Array<string>;
  user: User;
  size: number;
  createdAt: string;
}

export type initialStateType = {
  [x: string]: any;
  list: IinitialStateList[];
  loading: string;
};

export type userDataType = {
  _id: string;
  fullName:  string;
  email: string;
  createdAt: string;
  updatedAt: string
  avatarUrl: string;
  token?: string 
}

export type InitialStateAuthType = {
  userData: userDataType;
  loading: boolean | string
};


