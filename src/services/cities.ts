import { CitiesResponse } from "@app/models/cities.model";
import axios from "axios";

export default class CitiesService {

  getAll() {
    return axios.get('https://queridodiario.ok.org.br/api/cities?levels=3')
      .then((response) => response as CitiesResponse);
  }
}