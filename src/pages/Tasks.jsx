"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Filter, Search } from "lucide-react";
import { taskService } from "../services/taskService";
import { teamService } from "../services/teamService";
import LoadingSpinner from "../components/LoadingSpinner";
import TaskCard from "../components/TaskCard";
import toast from "react-hot-toast";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    teamId: "",
    assignedToMe: false,
    search: "",
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [tasksResponse, teamsResponse] = await Promise.all([
        taskService.getTasks(),
        teamService.getTeams(),
      ]);

      setTasks(tasksResponse.tasks);
      setTeams(teamsResponse.teams);
    } catch (error) {
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      const queryFilters = {};

      if (filters.status) queryFilters.status = filters.status;
      if (filters.teamId) queryFilters.teamId = filters.teamId;
      if (filters.assignedToMe) queryFilters.assignedToMe = true;

      const response = await taskService.getTasks(queryFilters);
      let filteredTasks = response.tasks;

      // Filtro de busca do lado do cliente (Client-side search filter)
      if (filters.search) {
        filteredTasks = filteredTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            task.description
              .toLowerCase()
              .includes(filters.search.toLowerCase())
        );
      }

      setTasks(filteredTasks);
    } catch (error) {
      toast.error("Erro ao filtrar tarefas");
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      teamId: "",
      assignedToMe: false,
      search: "",
    });
  };

  const getStatusCount = (status) => {
    return tasks.filter((task) => task.status === status).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <AnimatedPage>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Cabeçalho (Header) */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tarefas</h1>
            <p className="text-gray-600">
              Gerencie todas as suas tarefas em um só lugar
            </p>
          </div>

          <Link to="/tasks/create" className="btn btn-primary btn-md">
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Link>
        </div>

        {/* Estatísticas (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <div className="card-content">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.length}
                </p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {getStatusCount("pendente")}
                </p>
                <p className="text-sm text-gray-600">Pendentes</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {getStatusCount("andamento")}
                </p>
                <p className="text-sm text-gray-600">Em Andamento</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {getStatusCount("concluída")}
                </p>
                <p className="text-sm text-gray-600">Concluídas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros (Filters) */}
        <div className="card">
          <div className="card-content">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Filtros:
                </span>
              </div>

              {/* Busca (Search) */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar tarefas..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Filtro de Status (Status Filter) */}
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="select text-sm"
              >
                <option value="">Todos os status</option>
                <option value="pendente">Pendente</option>
                <option value="andamento">Em Andamento</option>
                <option value="concluída">Concluída</option>
              </select>

              {/* Filtro de Time (Team Filter) */}
              <select
                value={filters.teamId}
                onChange={(e) => handleFilterChange("teamId", e.target.value)}
                className="select text-sm"
              >
                <option value="">Todos os times</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>

              {/* Atribuído a Mim (Assigned to Me) */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.assignedToMe}
                  onChange={(e) =>
                    handleFilterChange("assignedToMe", e.target.checked)
                  }
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Minhas tarefas</span>
              </label>

              {/* Limpar Filtros (Clear Filters) */}
              <button onClick={clearFilters} className="btn btn-outline btn-sm">
                Limpar filtros
              </button>
            </div>
          </div>
        </div>

        {/* Grade de Tarefas (Tasks Grid) */}
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onUpdate={loadTasks} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Plus className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhuma tarefa encontrada
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {Object.values(filters).some(Boolean)
                ? "Tente ajustar os filtros ou criar uma nova tarefa."
                : "Crie sua primeira tarefa para começar a organizar."}
            </p>
            {!Object.values(filters).some(Boolean) && (
              <div className="mt-6">
                <Link to="/tasks/create" className="btn btn-primary btn-md">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar primeira tarefa
                </Link>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatedPage>
  );
};

export default Tasks;
