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

  createPv(INSTRUCTOR, filiere, semester, modul, time, date) {
    return axios.get(
      `${this.API_URL}/${INSTRUCTOR}/${filiere}/${semester}/${modul}/${time}/${date}`
    );
  }

  uploadFile(INSTRUCTOR, file) {
    return axios.post(`${this.API_URL}/${INSTRUCTOR}/uploadFile`, file);
  }

  uploadExcel(INSTRUCTOR, file) {
    return axios.post(`${this.API_URL}/${INSTRUCTOR}/upload/new`, file);
  }

  orderPv(INSTRUCTOR, etudiant, pv) {
    return axios.get(`${this.API_URL}/${INSTRUCTOR}/order/${etudiant}/${pv}`);
  }
}


  // axios.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error.response.data?.error_message?.startsWith("The Token has expired")) {
  //       setTimeout(() => {useAuthStore().logout()}, 4000);
  //       console.log("token expired", error.response);
  
        /* THIS WORKS BUT BREAKS THE LOGIN ERROR HANDLING */
      // }
      // return Promise.reject(error);
    // }
  // );

export default new BaseDataService();
