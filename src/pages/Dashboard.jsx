"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Users, CheckSquare, Clock, TrendingUp } from "lucide-react"
import { teamService } from "../services/teamService"
import { taskService } from "../services/taskService"
import { useAuth } from "../contexts/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner"
import TaskCard from "../components/TaskCard"

const Dashboard = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTeams: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  })
  const [recentTasks, setRecentTasks] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      const [teamsResponse, tasksResponse] = await Promise.all([
        teamService.getTeams(),
        taskService.getTasks({ assignedToMe: true }),
      ])

      const teams = teamsResponse.teams
      const tasks = tasksResponse.tasks

      setStats({
        totalTeams: teams.length,
        totalTasks: tasks.length,
        pendingTasks: tasks.filter((task) => task.status === "pendente").length,
        completedTasks: tasks.filter((task) => task.status === "concluída").length,
      })

      setRecentTasks(tasks.slice(0, 6))
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Olá, {user?.name}! 👋</h1>
          <p className="text-gray-600">Aqui está um resumo das suas atividades</p>
        </div>

        <div className="flex space-x-3">
          <Link to="/teams" className="btn btn-outline btn-md">
            <Users className="h-4 w-4 mr-2" />
            Ver Times
          </Link>
          <Link to="/tasks/create" className="btn btn-primary btn-md">
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Times</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTeams}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Tarefas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 className="card-title">Suas Tarefas Recentes</h2>
            <Link to="/tasks" className="text-sm text-primary-600 hover:text-primary-700">
              Ver todas
            </Link>
          </div>
        </div>
        <div className="card-content">
          {recentTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdate={loadDashboardData} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma tarefa atribuída a você ainda</p>
              <Link to="/tasks/create" className="btn btn-primary btn-md mt-4">
                Criar primeira tarefa
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
