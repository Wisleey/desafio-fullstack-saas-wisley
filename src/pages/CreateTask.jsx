import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";
import api from "../services/api";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "baixa",
    teamId: "",
    assignedToId: "",
  });
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (formData.teamId) {
      fetchTeamMembers(formData.teamId);
    } else {
      setTeamMembers([]);
      setFormData((prev) => ({ ...prev, assignedToId: "" }));
    }
  }, [formData.teamId]);

  const fetchTeams = async () => {
    try {
      const response = await api.get("/teams");
      if (Array.isArray(response.data.teams)) {
        setTeams(response.data.teams);
      } else {
        console.error(
          "Resposta da API de times não é um array:",
          response.data
        );
        setTeams([]);
      }
    } catch (error) {
      console.error("Erro ao carregar times:", error);
      setTeams([]);
    } finally {
      setTeamsLoading(false);
    }
  };

  const fetchTeamMembers = async (teamId) => {
    setMembersLoading(true);
    try {
      const response = await api.get(`/teams/${teamId}/members`);
      if (Array.isArray(response.data.members)) {
        setTeamMembers(response.data.members.map((member) => member.user));
      } else {
        console.error(
          "Resposta da API de membros do time não é um array:",
          response.data
        );
        setTeamMembers([]);
      }
    } catch (error) {
      console.error(`Erro ao carregar membros do time ${teamId}:`, error);
      setTeamMembers([]);
    } finally {
      setMembersLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = { ...formData };
      if (dataToSend.assignedToId === "") {
        dataToSend.assignedToId = null;
      }

      await api.post("/tasks", dataToSend);
      navigate("/tasks");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Nova Tarefa</h1>
            <button
              onClick={() => navigate("/tasks")}
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X className="mr-2" />
              Cancelar
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Entrega
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridade
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="baixa">Baixa</option>
                  <option value="média">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <select
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={teamsLoading}
                >
                  <option value="">Selecione um time</option>
                  {teamsLoading ? (
                    <option value="" disabled>
                      Carregando times...
                    </option>
                  ) : (
                    teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {formData.teamId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Atribuir a
                  </label>
                  <select
                    name="assignedToId"
                    value={formData.assignedToId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={membersLoading}
                  >
                    <option value="">-- Não atribuído --</option>
                    {membersLoading ? (
                      <option value="" disabled>
                        Carregando membros...
                      </option>
                    ) : (
                      teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                <Save className="mr-2" />
                {loading ? "Salvando..." : "Salvar Tarefa"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatedPage>
  );
};

export default CreateTask;
