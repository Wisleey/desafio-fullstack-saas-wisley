import api from "./api"

export const authService = {
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  },

  async register(name, email, password) {
    const response = await api.post("/auth/register", { name, email, password })
    return response.data
  },

  async getProfile() {
    const response = await api.get("/auth/profile")
    return response.data
  },
}
