import {Joke, Login, Register} from "@/molecules/types";
import axios from "axios";

export const API_URL: string = "http://193.40.156.35:8080/api";
export const API_HEADERS: {} = {'content-type': 'application/json'};
export async function fetchSetups() {
  try {
    const response = await axios.get(API_URL + "/jokes/setups");
    return response.data;

  } catch (error) {
    console.error("Error fetching setups", error);
  }
}

export async function fetchTop3Setups() {
  try {
    const response = await axios.get(API_URL + "/jokes/top3");
    return response.data;

  } catch (error) {
    console.error("Error fetching top 3 setups", error);
  }
}

export async function buyJokeWithId(id: number) {
  try {
    const response = await axios.get(API_URL + "/jokes/buy/" + id);
    return response.data;

  } catch (error) {
    console.error("Error buying joke", error);
  }
}

export async function fetchUsers() {
  try {
    const response = await axios.get(API_URL + "/users/all");
    return response.data;

  } catch (error) {
    console.error("Error fetching users", error);
  }
}

export async function registerUser(register: Register) {
  try {
    const response = await axios.post(
      API_URL + "/auth/register",
      JSON.stringify(register)
    );

  } catch (error) {
    console.error("Error registering user", error);
  }
}

export async function login(login: Login) {
  try {
    const response = await axios.post(
      API_URL + "/auth/login",
      JSON.stringify(login)
    );

  } catch (error) {
    console.error("Error logging in", error);
  }
}
