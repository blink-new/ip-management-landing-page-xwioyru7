import { useState, useEffect, useCallback } from 'react'
import { blink } from '../blink/client'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Shield, 
  FileText, 
  Copyright, 
  Key, 
  Calendar, 
  Users, 
  BarChart3, 
  Database, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Target,
  Layers
} from 'lucide-react'

interface IPAsset {
  id: string
  assetType: string
  title: string
  applicationNumber?: string
  registrationNumber?: string
  filingDate?: string
  expiryDate?: string
  status: string
  jurisdiction?: string
  estimatedValue?: number
  commercialStatus?: string
  createdAt: string
}

interface Project {
  id: string
  name: string
  description?: string
  status: string
  priority: string
  startDate?: string
  targetCompletion?: string
  budgetAllocated?: number
  budgetSpent?: number
  createdAt: string
}

interface Task {
  id: string
  title: string
  taskType?: string
  priority: string
  status: string
  assignedTo?: string
  dueDate?: string
  estimatedHours?: number
  createdAt: string
}

interface Deadline {
  id: string
  title: string
  deadlineType: string
  dueDate: string
  status: string
  jurisdiction?: string
  reminderDaysBefore?: number
}

interface Client {
  id: string
  name: string
  contactEmail?: string
  company?: string
  industry?: string
  createdAt: string
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Data states
  const [ipAssets, setIpAssets] = useState<IPAsset[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [deadlines, setDeadlines] = useState<Deadline[]>([])
  const [clients, setClients] = useState<Client[]>([])
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user, loadDashboardData])

  const loadDashboardData = useCallback(async () => {
    if (!user?.id) return
    
    try {
      // Load IP Assets
      const assetsData = await blink.db.ipAssets.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      setIpAssets(assetsData)

      // Load Projects
      const projectsData = await blink.db.projects.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      setProjects(projectsData)

      // Load Tasks
      const tasksData = await blink.db.tasks.list({
        where: { userId: user.id },
        orderBy: { dueDate: 'asc' }
      })
      setTasks(tasksData)

      // Load Deadlines
      const deadlinesData = await blink.db.deadlines.list({
        where: { userId: user.id },
        orderBy: { dueDate: 'asc' }
      })
      setDeadlines(deadlinesData)

      // Load Clients
      const clientsData = await blink.db.clients.list({
        where: { userId: user.id },
        orderBy: { name: 'asc' }
      })
      setClients(clientsData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }, [user?.id])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'granted':
      case 'registered':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'in_progress':
      case 'filed':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
      case 'abandoned':
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'on_hold':
      case 'suspended':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getAssetTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'patent':
        return <FileText className="h-4 w-4" />
      case 'trademark':
        return <Shield className="h-4 w-4" />
      case 'copyright':
        return <Copyright className="h-4 w-4" />
      case 'trade_secret':
        return <Key className="h-4 w-4" />
      default:
        return <Database className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredIpAssets = ipAssets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.applicationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter
    const matchesType = typeFilter === 'all' || asset.assetType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const upcomingDeadlines = deadlines.filter(deadline => {
    const dueDate = new Date(deadline.dueDate)
    const today = new Date()
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000))
    return dueDate >= today && dueDate <= thirtyDaysFromNow && deadline.status !== 'completed'
  })

  const activeTasks = tasks.filter(task => task.status !== 'completed')

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 text-center">
          <CardContent className="p-0">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to IPFlow</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your IP management dashboard.</p>
            <Button onClick={() => blink.auth.login()} className="w-full">
              Sign In to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">IPFlow Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => blink.auth.logout()}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">IP Assets</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total IP Assets</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ipAssets.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {ipAssets.filter(a => a.status === 'active').length} active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projects.filter(p => p.status === 'active').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {projects.length} total projects
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeTasks.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length} high priority
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Next 30 days
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Upcoming Deadlines */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingDeadlines.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
                  ) : (
                    <div className="space-y-3">
                      {upcomingDeadlines.slice(0, 5).map((deadline) => (
                        <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{deadline.title}</p>
                            <p className="text-xs text-gray-500">{deadline.deadlineType}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{new Date(deadline.dueDate).toLocaleDateString()}</p>
                            <Badge className={getStatusColor(deadline.status)} variant="secondary">
                              {deadline.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    IP Portfolio Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['patent', 'trademark', 'copyright', 'trade_secret'].map((type) => {
                      const count = ipAssets.filter(asset => asset.assetType === type).length
                      const percentage = ipAssets.length > 0 ? (count / ipAssets.length) * 100 : 0
                      return (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getAssetTypeIcon(type)}
                            <span className="text-sm font-medium capitalize">{type.replace('_', ' ')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* IP Assets Tab */}
          <TabsContent value="assets" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>IP Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search assets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="granted">Granted</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="patent">Patents</SelectItem>
                      <SelectItem value="trademark">Trademarks</SelectItem>
                      <SelectItem value="copyright">Copyrights</SelectItem>
                      <SelectItem value="trade_secret">Trade Secrets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Assets List */}
                {filteredIpAssets.length === 0 ? (
                  <div className="text-center py-12">
                    <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No IP assets found</h3>
                    <p className="text-gray-500 mb-4">
                      {ipAssets.length === 0 
                        ? "Get started by adding your first IP asset." 
                        : "Try adjusting your search or filter criteria."
                      }
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add IP Asset
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredIpAssets.map((asset) => (
                      <div key={asset.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              {getAssetTypeIcon(asset.assetType)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{asset.title}</h3>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                                <span className="capitalize">{asset.assetType.replace('_', ' ')}</span>
                                {asset.applicationNumber && (
                                  <span>App: {asset.applicationNumber}</span>
                                )}
                                {asset.registrationNumber && (
                                  <span>Reg: {asset.registrationNumber}</span>
                                )}
                                {asset.jurisdiction && (
                                  <span>{asset.jurisdiction}</span>
                                )}
                              </div>
                              {asset.filingDate && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Filed: {new Date(asset.filingDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(asset.status)} variant="secondary">
                              {asset.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <div className="text-center py-12">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                    <p className="text-gray-500 mb-4">Create your first project to organize your IP assets.</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Project
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                            <Badge className={getStatusColor(project.status)} variant="secondary">
                              {project.status}
                            </Badge>
                          </div>
                          {project.description && (
                            <p className="text-sm text-gray-600">{project.description}</p>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Priority:</span>
                              <Badge className={getPriorityColor(project.priority)} variant="secondary">
                                {project.priority}
                              </Badge>
                            </div>
                            {project.targetCompletion && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500">Target:</span>
                                <span>{new Date(project.targetCompletion).toLocaleDateString()}</span>
                              </div>
                            )}
                            {project.budgetAllocated && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500">Budget:</span>
                                <span>${project.budgetAllocated.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                    <p className="text-gray-500 mb-4">Create tasks to track your IP management activities.</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Task
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{task.title}</h3>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                              {task.taskType && <span className="capitalize">{task.taskType}</span>}
                              {task.assignedTo && <span>Assigned to: {task.assignedTo}</span>}
                              {task.dueDate && (
                                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(task.priority)} variant="secondary">
                              {task.priority}
                            </Badge>
                            <Badge className={getStatusColor(task.status)} variant="secondary">
                              {task.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deadlines Tab */}
          <TabsContent value="deadlines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                {deadlines.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No deadlines found</h3>
                    <p className="text-gray-500 mb-4">Add deadlines to track important IP dates.</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Deadline
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {deadlines.map((deadline) => (
                      <div key={deadline.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{deadline.title}</h3>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                              <span className="capitalize">{deadline.deadlineType.replace('_', ' ')}</span>
                              {deadline.jurisdiction && <span>{deadline.jurisdiction}</span>}
                              <span>Due: {new Date(deadline.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(deadline.status)} variant="secondary">
                              {deadline.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Clients</CardTitle>
              </CardHeader>
              <CardContent>
                {clients.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
                    <p className="text-gray-500 mb-4">Add clients to manage their IP portfolios.</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Client
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map((client) => (
                      <Card key={client.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">{client.name}</CardTitle>
                          {client.company && (
                            <p className="text-sm text-gray-600">{client.company}</p>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            {client.contactEmail && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500">Email:</span>
                                <span>{client.contactEmail}</span>
                              </div>
                            )}
                            {client.industry && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500">Industry:</span>
                                <span>{client.industry}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Portfolio
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}