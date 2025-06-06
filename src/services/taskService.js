import api from "./api"

export const taskService = {
  async createTask(taskData) {
    const response = await api.post("/tasks", taskData)
    return response.data
  },

  async getTasks(filters = {}) {
    const params = new URLSearchParams()

    if (filters.teamId) params.append("teamId", filters.teamId)
    if (filters.status) params.append("status", filters.status)
    if (filters.assignedToMe) params.append("assignedToMe", "true")

    const response = await api.get(`/tasks?${params.toString()}`)
    return response.data
  },

  async getTaskById(id) {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  async updateTask(id, taskData) {
    const response = await api.put(`/tasks/${id}`, taskData)
    return response.data
  },

  async deleteTask(id) {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  },
}
