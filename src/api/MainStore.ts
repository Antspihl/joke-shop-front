import {defineStore} from "pinia";
import axios from "axios";
import {Joke, Login, Rating, Register, User, UsersPageRequest} from "@/molecules/types";


export const API_URL: string = "http://193.40.156.35:8080/api";
//export const API_URL: string = "http://localhost:8080/api";
export const API_HEADERS: {} = {'content-type': 'application/json'};
export const useMainStore = defineStore('main', {
  state: () => ({
    user: {} as User,
    users: [] as User[],
    totalUsersCount: 0,
    setups: [] as Joke[],
    top3: [] as Joke[],
    userJokes: [] as Joke[],
    randomJokeValue: String
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
            'Authorization': `Bearer ${jwt ?? ""}`
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
        const sortedJokes = response.data.sort((a:Joke, b:Joke) => a.id - b.id);
        sortedJokes.forEach((joke: Joke) => {
          joke.showDialog = false;
          joke.showPunchline = true;
        });
        this.userJokes = sortedJokes
      } catch (error) {
        console.error("Error fetching user jokes", error)
      }
    },
    async fetchTop3Setups() {
      const jwt = localStorage.getItem('user')!
      try {
        const response = await axios.get(API_URL + "/jokes/top3", {
            headers: {
              'Authorization': `Bearer ${jwt ?? ""}`
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
    async fetchUsersPage(request: UsersPageRequest) {
      try {
        const response = await axios.get(API_URL + "/users/usersTable", {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {...request}
        })
        this.users = response.data.pageUsers;
        this.totalUsersCount = response.data.totalUsersCount

      } catch (error) {
        console.error("Error fetching users", error);
      }
    },
    async registerUser(register: Register) {
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
    },
    async fetchUser() {
      const jwt = localStorage.getItem('user')!
      if (jwt == null) {
        return
      } else {
        const response = await axios.get(API_URL + "/users/get", {
          headers: {
            'Authorization': `Bearer ${jwt}`
          },
        })
        this.user = response.data
      }
    },
    async deleteUser(userId: number, pageRequest: UsersPageRequest) {
      try {
        await axios.delete(API_URL + "/users/" + userId).then(() => {
          this.fetchUsersPage(pageRequest)
        })
      } catch (error) {
        console.error("Error deleting user", error)
      }
    },
    async addRating(rating: Rating) {
      const jwt = localStorage.getItem('user')!
      if (jwt == null) {
        return
      } else {
      try {
        await axios.post(API_URL + "/ratings", rating, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
        }).then(() => {
          this.fetchUserJokes()
        })
      } catch(error) {
        console.error("Error adding rating", error)
      }
      }
    },
    async randomJoke() {
      try {
        const response = await axios.get(API_URL + "/jokes/random")
        console.log(response.data)
        this.randomJoke = response.data
      } catch (error) {
        console.error("Error fetching random joke", error)
      }
    }
  }
})
