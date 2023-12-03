import axios from "axios";

export const API_URL: string = "http://193.40.156.35:8080/api";
export const API_HEADERS: {} = {'content-type': 'application/json'};
export async function buyJokeWithId(id: number) {
  try {
    const response = await axios.get(API_URL + "/jokes/buy/" + id);
    return response.data;

  } catch (error) {
    console.error("Error buying joke", error);
  }
}
