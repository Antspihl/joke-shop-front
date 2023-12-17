export type User = {
  userId: number;
  username: string;
  fullName: string;
  isAdmin: boolean;
  email: string;
}

export type Register = {
  username: string;
  fullName: string;
  password: string;
  email: string;
}

export type Login = {
  username: string;
  password: string;
}

export type Joke = {
  id: number;
  setup: string;
  punchline: string;
  price: number;
  rating: number;
  timesBought: number;
  showDialog: boolean;
  showPunchline: boolean;
}

export type Page = {
  name: string;
  path: string;
}

export type UsersPageRequest = {
  userId?: number
  username?: string
  email?: string
  fullName?: string
  limit: number
  page: number
  sort: string
  dir: string
}

export enum SORT_ORDER {
  DESC = 'DESC',
  ASC = 'ASC',
}
