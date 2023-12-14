import {defineStore} from "pinia";
import axios from "axios";
import {Joke, Login, Register, User} from "@/molecules/types";


export const API_URL: string = "http://193.40.156.35:8080/api";
//export const API_URL: string = "http://localhost:8080/api";

export const API_HEADERS: {} = {'content-type': 'application/json'};
export const useMainStore = defineStore('main', {
  state: () => ({
    users: [] as User[],
    setups: [] as Joke[],
    top3: [] as Joke[],
    userJokes: [] as Joke[]
  }),
  getters: {
    getUsers(state): User[] { return state.users },
    getJokes(state): Joke[] { return state.setups },
    getTop3(state): Joke[] { return state.top3 }
  },
  actions: {
    async fetchSetups() {
      const jwt = localStorage.getItem('user')!
      try {
        const response = await axios.get(API_URL + "/jokes/setups", {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        response.data.forEach((joke: Joke) => {
          joke.showDialog = false;
          joke.showPunchline = false;
        });
        this.setups = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
    async fetchUserJokes() {
      const jwt = localStorage.getItem('user')!
      try {
        const response = await axios.get(API_URL + "/jokes/bought", {
            headers: {
              'Authorization': `Bearer ${jwt}`
            },
          });
        response.data.forEach((joke: Joke) => {
          joke.showDialog = false;
          joke.showPunchline = true;
        });
        this.userJokes = response.data
      } catch (error) {
        console.error("Error fetching user jokes", error)
      }
    },
    async fetchTop3Setups() {
      const jwt = localStorage.getItem('user')!
      try {
        const response = await axios.get(API_URL + "/jokes/top3", {
            headers: {
              'Authorization': `Bearer ${jwt}`
            },
          });
        response.data.forEach((joke: Joke) => {
          joke.showDialog = false;
          joke.showPunchline = false;
        });
        this.top3 = response.data
      } catch (error) {
        console.error("Error fetching top 3 setups", error);
      }
    },
    async buyJokeWithId(id: number) {
      const jwt = localStorage.getItem('user')!
      try {
        const response = await axios.get(API_URL + "/jokes/buy/" + id,
        {
          headers: {
            'Authorization': `Bearer ${jwt}`
          },
        });
        return response.data;

      } catch (error) {
        console.error("Error buying joke", error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get(API_URL + "/users/all");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users", error);
      }
    },
    async registerUser(register: Register) {
      console.log(register)
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            API_URL + "/auth/register", register, { headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          resolve(response)

        } catch (error) {
          console.error("Error registering user", error);
          reject(error)
        }
      })
    },
    async login(login: Login) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            API_URL + "/auth/login",
            login, {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          resolve(response)

          localStorage.setItem('user', response.data)

        } catch (error) {
          console.error("Error logging in", error);
          reject(error)
        }
      })
    }

  }
})
