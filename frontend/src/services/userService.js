import { sample_users } from "../data";

export const getUser = () => {
  return localStorage.getItem("user") &&
    localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};

export const login = async (email, password) => {
  let user = {};
  console.log(email, password);
  if (
    (user = sample_users.find(
      (item) => item.email === email && item.password === password
    ))
  ) {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  return;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = async (registerData) => {
  localStorage.setItem("user", JSON.stringify(registerData));
  return registerData;
};

export const updateProfile = async (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const changePassword = async (passwords) => {
  localStorage.setItem(
    "user",
    JSON.stringify(...localStorage.getItem("user"), passwords?.newPassword)
  );
};
