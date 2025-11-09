import { CitiesResponse } from "@app/models/cities.model";
import axios from "axios";
import { API_CONFIG } from "@app/config/api";

export default class CitiesService {

  getAll() {
    return axios.get(`${API_CONFIG.QUERIDO_DIARIO_API}/cities?levels=3`)
      .then((response) => response as CitiesResponse);
  }
}