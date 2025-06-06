import { Link } from "react-router-dom"
import { Users, CheckSquare, Calendar } from "lucide-react"

const TeamCard = ({ team }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <Link to={`/teams/${team.id}`} className="block">
      <div className="card hover:shadow-md transition-shadow cursor-pointer">
        <div className="card-content">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-gray-900">{team.name}</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              {team.members?.length || 0} membros
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <CheckSquare className="h-4 w-4 mr-2" />
              {team._count?.tasks || 0} tarefas
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              Criado em {formatDate(team.createdAt)}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex -space-x-2">
              {team.members?.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="h-6 w-6 bg-primary-600 rounded-full flex items-center justify-center border-2 border-white"
                  title={member.user.name}
                >
                  <span className="text-xs font-medium text-white">{member.user.name.charAt(0).toUpperCase()}</span>
                </div>
              ))}
              {team.members?.length > 3 && (
                <div className="h-6 w-6 bg-gray-400 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-medium text-white">+{team.members.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TeamCard
