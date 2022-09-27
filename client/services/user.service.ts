import axios from "axios";

export const UserLogin = async (email: string, password: string) => {
  const { data } = await axios.post("/api/users/login", { email, password });
  return data;
};

export const UserInfoByToken = async (refreshToken: string) => {
  const { data } = await axios.get("/api/users/infor", {
    headers: { Authorization: refreshToken },
  });
  return data;
};

export const Logout = async (refreshToken: string) => {
  const { data } = await axios.get("/api/users/logout", {
    headers: { Authorization: refreshToken },
  });
  return data;
};
export const UserRegister = async (
  name: string,
  email: string,
  password: string
) => {
  const { data } = await axios.post("/api/users/register", {
    name,
    email,
    password,
  });
  return data;
};
export const ActivationEmail = async (activation_token: string) => {
  const { data } = await axios.post("/api/users/activation", {
    activation_token,
  });
  return data;
};
export const ForgotPassword = async (email: string) => {
  const { data } = await axios.post("/api/users/forgot", { email });
  return data;
};
export const ResetPass = async (token: string, password: string) => {
  const { data } = await axios.post(
    "/api/users/reset",
    { password },
    {
      headers: { Authorization: token },
    }
  );
  return data;
};
