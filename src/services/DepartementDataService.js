/* eslint-disable */
import axios from "axios";

class BaseDataService {
  // INSTRUCTOR = "departement";
  API_URL = "http://localhost:8080";
  // INSTRUCTOR_API_URL = `${this.API_URL}/${this.INSTRUCTOR}`;

  retrieveAllData(INSTRUCTOR) {
    return axios.get(`${this.API_URL}/${INSTRUCTOR}`);
  }

  deleteData(INSTRUCTOR, id) {
    return axios.delete(`${this.API_URL}/${INSTRUCTOR}/${id}`);
  }

  retrieveData(INSTRUCTOR, id) {
    return axios.get(`${this.API_URL}/${INSTRUCTOR}/${id}`);
  }
  updateData(INSTRUCTOR, id, course) {
    return axios.patch(`${this.API_URL}/${INSTRUCTOR}/${id}`, course);
  }

  createData(INSTRUCTOR, course) {
    return axios.post(`${this.API_URL}/${INSTRUCTOR}/`, course);
  }

  createPv(INSTRUCTOR, filiere, semester, modul, time) {
    return axios.get(`${this.API_URL}/${INSTRUCTOR}/${filiere}/${semester}/${modul}/${time}`);
  }

  uploadFile(INSTRUCTOR, file) {
    return axios.post(`${this.API_URL}/${INSTRUCTOR}/uploadFile`, file);
  }
  // saveData(model) {
  //   return axios.get(`${this.INSTRUCTOR_API_URL}/saveData`, model);
  // }
}

export default new BaseDataService();
