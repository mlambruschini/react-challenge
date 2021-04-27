import axios from "axios";

const baseUrl = "https://superheroapi.com/api/10223280028282646";

class Superheroes {
  getById(id: number) {
    return axios.get(baseUrl + "/" + id);
  }

  getArrayByName(name: string) {
    return axios.get(baseUrl + "/search/" + name);
  }
}
export default new Superheroes();
