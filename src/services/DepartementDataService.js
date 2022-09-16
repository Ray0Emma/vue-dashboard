import axios from "axios";

const  user  = JSON.parse(localStorage.getItem("user"));

class BaseDataService {
  API_URL = "http://localhost:8080";

  retrieveAllData(INSTRUCTOR) {
    return axios.get(`${this.API_URL}/${INSTRUCTOR}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
  }

  deleteData(INSTRUCTOR, id) {
    return axios.delete(`${this.API_URL}/${INSTRUCTOR}/${id}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
  }

  retrieveData(INSTRUCTOR, id) {
    return axios.get(`${this.API_URL}/${INSTRUCTOR}/${id}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
  }
  updateData(INSTRUCTOR, id, course) {
    return axios.patch(`${this.API_URL}/${INSTRUCTOR}/${id}`, course, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
  }

  createData(INSTRUCTOR, course) {
    return axios.post(`${this.API_URL}/${INSTRUCTOR}/`, course, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
  }

  createPv(INSTRUCTOR, filiere, semester, modul, time) {
    return axios.get(
      `${this.API_URL}/${INSTRUCTOR}/${filiere}/${semester}/${modul}/${time}`, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      }
    );
  }

  uploadFile(INSTRUCTOR, file) {
    return axios.post(`${this.API_URL}/${INSTRUCTOR}/uploadFile`, file, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
  }

  uploadExcel(INSTRUCTOR, file) {
    return axios.post(`${this.API_URL}/${INSTRUCTOR}/upload`, file, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
  }

  orderPv(INSTRUCTOR, etudiant, pv) {
    return axios.get(`${this.API_URL}/${INSTRUCTOR}/order/${etudiant}/${pv}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
  }
}

export default new BaseDataService();
