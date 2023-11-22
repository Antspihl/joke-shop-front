export type User = {
  userId: number;
  username: string;
  fullName: string;
  email: string;
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

