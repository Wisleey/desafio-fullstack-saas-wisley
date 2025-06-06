import api from "./api"

export const userService = {
  async getUsers() {
    const response = await api.get("/users")
    return response.data
  },
}
