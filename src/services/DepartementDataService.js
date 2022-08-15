/* eslint-disable */
import axios from "axios";

const INSTRUCTOR = "departement";
const API_URL = "http://localhost:8080";
const INSTRUCTOR_API_URL = `${API_URL}/${INSTRUCTOR}`;

class BaseDataService {
  retrieveAllData() {
    return axios.get(`${INSTRUCTOR_API_URL}`);
  }

  deleteData(id) {
    return axios.delete(`${INSTRUCTOR_API_URL}/${id}`);
  }

  retrieveData(id) {
    return axios.get(`${INSTRUCTOR_API_URL}/${id}`);
  }
  updateData(id, course) {
    return axios.patch(`${INSTRUCTOR_API_URL}/${id}`, course);
  }

  createData(course) {
    return axios.post(`${INSTRUCTOR_API_URL}/`, course);
  }

  uploadFile(file) {
    return axios.post(`${INSTRUCTOR_API_URL}/uploadFile`, file);
  }
  // saveData(model) {
  //   return axios.get(`${INSTRUCTOR_API_URL}/saveData`, model);
  // }
}

export default new BaseDataService();
