/* eslint-disable */
import axios from "axios";

class BaseDataService {

  API_URL = "http://localhost:8080";

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

  uploadExcel(INSTRUCTOR, file) {
    return axios.post(`${this.API_URL}/${INSTRUCTOR}/upload`, file);
  }

  orderPv(INSTRUCTOR, etudiant,pv) {
    return axios.get(`${this.API_URL}/${INSTRUCTOR}/order/${etudiant}/${pv}`);
  }
}

export default new BaseDataService();
