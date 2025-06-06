import api from "./api"

export const teamService = {
  async createTeam(name) {
    const response = await api.post("/teams", { name })
    return response.data
  },

  async getTeams() {
    const response = await api.get("/teams")
    return response.data
  },

  async getTeamById(id) {
    const response = await api.get(`/teams/${id}`)
    return response.data
  },

  async addMember(teamId, email) {
    const response = await api.post(`/teams/${teamId}/members`, { email })
    return response.data
  },

  async removeMember(teamId, memberId) {
    const response = await api.delete(`/teams/${teamId}/members/${memberId}`)
    return response.data
  },
}
