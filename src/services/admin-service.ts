import apiClient from "./api-client";

const getAllUsers = () => {
  return apiClient.get("/admin/users");
};

export default { getAllUsers };
