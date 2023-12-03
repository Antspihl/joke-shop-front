export type User = {
  userId: number;
  username: string;
  fullName: string;
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
