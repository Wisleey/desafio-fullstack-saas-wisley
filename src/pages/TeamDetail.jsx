import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, UserPlus, Trash2, Edit, FolderOpen } from "lucide-react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const TeamDetail = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeamDetails();
  }, [id]);

  const fetchTeamDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/teams/${id}`);
      setTeam(response.data.team);
    } catch (error) {
      console.error("Erro ao carregar detalhes do time:", error);
      toast.error("Erro ao carregar detalhes do time.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (window.confirm("Tem certeza que deseja remover este membro?")) {
      try {
        await api.delete(`/teams/${id}/members/${memberId}`);
        toast.success("Membro removido com sucesso!");
        fetchTeamDetails();
      } catch (error) {
        console.error("Erro ao remover membro:", error);
        toast.error("Erro ao remover membro.");
      }
    }
  };

  const handleDeleteTeam = async () => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este time? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        await api.delete(`/teams/${id}`);
        toast.success("Time excluído com sucesso!");
        navigate("/teams");
      } catch (error) {
        console.error("Erro ao excluir time:", error);
        toast.error(error.response?.data?.message || "Erro ao excluir time.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center mt-8 text-gray-600">
        Não foi possível carregar os detalhes do time.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            {team.name}
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={() => navigate(`/teams/${id}/edit`)}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto"
            >
              <Edit className="mr-2 h-5 w-5" />
              Editar Time
            </button>
            <button
              onClick={() => navigate(`/teams/${id}/add-member`)}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium w-full sm:w-auto"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Adicionar Membro
            </button>
            <button
              onClick={handleDeleteTeam}
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium w-full sm:w-auto"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Excluir Time
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Descrição
          </h2>
          <p className="text-gray-700">
            {team.description || "Nenhuma descrição fornecida."}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="mr-3 h-6 w-6 text-gray-600" />
            Membros do Time ({team?.members?.length || 0})
          </h2>

          <div className="space-y-4">
            {team?.members?.length > 0 ? (
              team.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {member.user?.name
                        ? member.user.name.charAt(0).toUpperCase()
                        : "?"}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {member.user?.name || "Nome indisponível"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {member.user?.email || "Email indisponível"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.user.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    title="Remover membro"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                Nenhum membro neste time ainda.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FolderOpen className="mr-3 h-6 w-6 text-gray-600" />
            Tarefas do Time
          </h2>
          <div className="mt-4">
            {team?.tasks?.length > 0 ? (
              <ul className="space-y-3">
                {team.tasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Status: {task.status}
                    </p>
                    {task.dueDate && (
                      <p className="text-sm text-gray-600">
                        Prazo: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    {task.assignedTo && (
                      <p className="text-sm text-gray-600">
                        Atribuída a: {task.assignedTo.name}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500">
                Nenhuma tarefa associada a este time.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
