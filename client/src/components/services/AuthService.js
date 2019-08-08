import axios from "axios";
import { jsxClosingFragment } from "@babel/types";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_AUTHSERVICE_BASE_URL,
      withCredentials: true
    });

    this.service = service;
  }

  signup = (username, password, firstName, lastName, email) => {
    return this.service
      .post("/signup", {
        username: username,
        password: password,
        firstName: firstName,
        email: email,
        lastName: lastName
      })
      .then(response => {
        return response.data;
      });
  };

  login = (username, password) => {
    return this.service
      .post("/login", { username, password })
      .then(response => response.data);
  };

  logout = () => {
    console.log("logout from auth");
    return this.service.post("/logout", {}).then(response => response.data);
  };
  currentUser = () => {
    return this.service.get("/getcurrentuser").then(response => response.data);
  };

  updateUser = (id, data) => {
    return this.service
      .post("/update/" + id, data)
      .then(() => {})
      .catch(() => {});
  };
}

export default AuthService;
