import api from "./api";

export const userService = {
  async getUsers() {
    const response = await api.get("/users");
    return response.data;
  },

  async updateProfile(updateData) {
    const response = await api.patch("/users/me", updateData);
    return response.data;
  },
};
