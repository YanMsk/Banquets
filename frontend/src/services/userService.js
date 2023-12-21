import { sample_users } from "../data";

export const getUser = () => {
  return localStorage.getItem("user") &&
    localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};

export const login = async (email, password) => {
  localStorage.setItem("user", JSON.stringify({ email, password }));
  return { email, password };
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = async (registerData) => {
  localStorage.setItem("user", JSON.stringify(registerData));
  return registerData;
};
