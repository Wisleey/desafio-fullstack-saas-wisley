"use client"
import { Calendar, User, MoreVertical } from "lucide-react"
import { taskService } from "../services/taskService"
import toast from "react-hot-toast"

const TaskCard = ({ task, onUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "andamento":
        return "bg-blue-100 text-blue-800"
      case "concluída":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusChange = async (newStatus) => {
    try {
      await taskService.updateTask(task.id, { status: newStatus })
      toast.success("Status da tarefa atualizado!")
      onUpdate?.()
    } catch (error) {
      toast.error("Erro ao atualizar status da tarefa")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="card-content">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{task.title}</h3>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{task.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className={`badge ${getStatusColor(task.status)}`}>{task.status}</span>

          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(task.createdAt)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-1" />
            {task.assignedTo ? task.assignedTo.name : "Não atribuída"}
          </div>

          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="pendente">Pendente</option>
            <option value="andamento">Em Andamento</option>
            <option value="concluída">Concluída</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
