

export type User = {
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
  list: IinitialStateList[];
  loading: string;
};


