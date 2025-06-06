import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserPlus, X } from "lucide-react";
import api from "../services/api";

const AddTeamMember = () => {
  const [email, setEmail] = useState("");
  const [addingMember, setAddingMember] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!email) return;

    setAddingMember(true);
    try {
      await api.post(`/teams/${id}/members`, { email: email });
      navigate(`/teams/${id}`);
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
    } finally {
      setAddingMember(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Adicionar Membro ao Time
          </h1>
          <button
            onClick={() => navigate(`/teams/${id}`)}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <X className="mr-2" />
            Cancelar
          </button>
        </div>

        <form
          onSubmit={handleAddMember}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email do Usuário
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nome@exemplo.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={!email || addingMember}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <UserPlus className="mr-2" />
              {addingMember ? "Adicionando..." : "Adicionar Membro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMember;
