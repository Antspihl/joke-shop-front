import {defineStore} from "pinia";
import axios from "axios";
import {Joke, Login, Register, User} from "@/molecules/types";

export const API_URL: string = "http://193.40.156.35:8080/api";
export const API_HEADERS: {} = {'content-type': 'application/json'};
export const useMainStore = defineStore('main', {
  state: () => ({
    users: [] as User[],
    setups: [] as string[],
    top3: [] as Joke[]
  }),
  getters: {
    getUsers(state): User[] { return state.users },
  },
  actions: {
    async fetchSetups() {
      try {
        const response = await axios.get(API_URL + "/jokes/setups");
        this.setups = response.data

      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
    async fetchTop3Setups() {
      try {
        const response = await axios.get(API_URL + "/jokes/top3");
        this.top3 = response.data

      } catch (error) {
        console.error("Error fetching top 3 setups", error);
      }
    },
    async buyJokeWithId(id: number) {
      try {
        const response = await axios.get(API_URL + "/jokes/buy/" + id);
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
      try {
        const response = await axios.post(
          API_URL + "/auth/register",
          JSON.stringify(register)
        );

      } catch (error) {
        console.error("Error registering user", error);
      }
    },
    async login(login: Login) {
      try {
        const response = await axios.post(
          API_URL + "/auth/login",
          JSON.stringify(login)
        );

      } catch (error) {
        console.error("Error logging in", error);
      }
    }

  }
})
