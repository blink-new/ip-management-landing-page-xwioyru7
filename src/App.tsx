import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import Dashboard from "./components/Dashboard"
import { blink } from "./blink/client"
import { 
  Shield, 
  FileText, 
  Copyright, 
  Key, 
  Calendar, 
  Users, 
  BarChart3, 
  Database, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Globe,
  Lock,
  Target,
  Layers,
  Settings,
  Eye
} from "lucide-react"

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
      
      // If user is authenticated and we're on landing, show dashboard
      if (state.user && currentView === 'landing') {
        setCurrentView('dashboard')
      }
      // If user logs out and we're on dashboard, show landing
      if (!state.user && currentView === 'dashboard') {
        setCurrentView('landing')
      }
    })
    return unsubscribe
  }, [currentView])

  // Show dashboard if user is authenticated
  if (currentView === 'dashboard') {
    return <Dashboard />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-gray-900">IPFlow</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#framework" className="text-gray-600 hover:text-primary transition-colors">Framework</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
              {user ? (
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => setCurrentView('dashboard')}
                >
                  Dashboard
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => blink.auth.login()}
                >
                  Sign In
                </Button>
              )}
              <Button>Get Demo</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Manage What Matters.{" "}
              <span className="text-primary">Stay Ready</span>{" "}
              for What's Next.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We help you manage the things you'll still be doing in 10 years — 
              so you can focus on the new things you'll be doing in 10 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => user ? setCurrentView('dashboard') : blink.auth.login()}
              >
                {user ? 'Go to Dashboard' : 'Get Started'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Watch Overview
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* IP Types Visual */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900">Patents</h3>
              <p className="text-sm text-gray-600 mt-1">Inventions & Innovations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-gray-900">Trademarks</h3>
              <p className="text-sm text-gray-600 mt-1">Brands & Identities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Copyright className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900">Copyrights</h3>
              <p className="text-sm text-gray-600 mt-1">Creative Works</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-gray-900">Trade Secrets</h3>
              <p className="text-sm text-gray-600 mt-1">Confidential Information</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why This Matters</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              IP is one of the most valuable business assets. But managing it today is messy, manual, and disconnected.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-red-200 bg-red-50/50">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Spreadsheets & Emails</h3>
                <p className="text-gray-600">
                  Critical IP data scattered across multiple tools, increasing risk and reducing visibility.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 border-orange-200 bg-orange-50/50">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Siloed Tools</h3>
                <p className="text-gray-600">
                  Disconnected systems that don't talk to each other, creating gaps in protection.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 border-yellow-200 bg-yellow-50/50">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Wasted Time</h3>
                <p className="text-gray-600">
                  Teams spend time fixing the past instead of planning the future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Built for the Next Decade</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A unified platform that grows with your business and adapts to tomorrow's challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Unified Platform</h3>
                  <p className="text-gray-600">
                    Patents, trade secrets, trademarks, and copyright in one integrated system.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Automated Tracking</h3>
                  <p className="text-gray-600">
                    Never miss deadlines, renewals, budgets, or ownership changes again.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategic Views</h3>
                  <p className="text-gray-600">
                    Organize by project, bundle, or commercialization goal for better decisions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Collaboration</h3>
                  <p className="text-gray-600">
                    Auditable teamwork across legal, technical, and commercial teams.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Patent Applications</span>
                  <Badge variant="secondary">24 Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Trademark Renewals</span>
                  <Badge className="bg-accent text-white">3 Due Soon</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Trade Secrets</span>
                  <Badge variant="outline">12 Protected</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Copyright Portfolio</span>
                  <Badge variant="secondary">156 Works</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-20 bg-primary text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-medium leading-relaxed">
            "We're not just helping teams manage their IP. We're helping them build the systems that protect what matters — so they're free to explore what's next."
          </blockquote>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">IP Complexity is Rising</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The time to get organized is now. What's not changing? The need for clarity, control, and collaboration.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Filing Volumes Rising</h3>
                <p className="text-gray-600">
                  Global patent and trademark applications continue to grow year over year.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Higher Expectations</h3>
                <p className="text-gray-600">
                  Commercial teams expect better visibility and faster decision-making.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Growing Risk</h3>
                <p className="text-gray-600">
                  The cost of inaction increases as IP portfolios become more valuable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete IP Management</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your intellectual property portfolio effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <Calendar className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deadline Docketing</h3>
                <p className="text-gray-600">
                  Automated tracking of all critical dates with smart notifications.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <Database className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Storage</h3>
                <p className="text-gray-600">
                  Secure, searchable repository for all IP-related documents.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Client Dashboards</h3>
                <p className="text-gray-600">
                  Real-time portfolio views for stakeholders and decision makers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <BarChart3 className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics & Reporting</h3>
                <p className="text-gray-600">
                  Insights into portfolio performance and strategic opportunities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <Zap className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automation</h3>
                <p className="text-gray-600">
                  Workflow automation for routine tasks and notifications.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <Settings className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customization</h3>
                <p className="text-gray-600">
                  Tailored workflows for your firm size and IP focus areas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PARA/CODE Framework */}
      <section id="framework" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Built on Proven Frameworks</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PARA and CODE methodologies ensure your IP management is both systematic and actionable.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">PARA Framework</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold text-primary">P</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Projects</h4>
                      <p className="text-gray-600 text-sm">Active IP initiatives with specific outcomes and deadlines</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold text-accent">A</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Areas</h4>
                      <p className="text-gray-600 text-sm">Ongoing responsibilities like trademark maintenance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold text-primary">R</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Resources</h4>
                      <p className="text-gray-600 text-sm">Reference materials and templates for future use</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold text-accent">A</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Archive</h4>
                      <p className="text-gray-600 text-sm">Completed projects and inactive IP assets</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">CODE Method</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold text-blue-600">C</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Capture</h4>
                      <p className="text-gray-600 text-sm">Collect all IP-related information in one place</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold text-green-600">O</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Organize</h4>
                      <p className="text-gray-600 text-sm">Structure information for easy retrieval and action</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold text-purple-600">D</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Distill</h4>
                      <p className="text-gray-600 text-sm">Extract key insights and actionable intelligence</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold text-orange-600">E</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Express</h4>
                      <p className="text-gray-600 text-sm">Share knowledge and drive strategic decisions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Database Tables & Data Fields */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Data Architecture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Airtable-powered backend captures every detail of your IP portfolio with structured, searchable data.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900">Core IP Assets</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Asset type & status tracking</li>
                  <li>• Filing & expiry dates</li>
                  <li>• Jurisdiction & registration numbers</li>
                  <li>• Commercial value assessment</li>
                  <li>• PARA categorization</li>
                  <li>• Priority levels & ownership</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-6 w-6 text-accent" />
                  <h3 className="text-lg font-semibold text-gray-900">Deadlines & Docketing</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Critical date tracking</li>
                  <li>• Automated reminders</li>
                  <li>• Response deadlines</li>
                  <li>• Renewal schedules</li>
                  <li>• Task assignments</li>
                  <li>• Completion status</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900">Document Management</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Secure file storage</li>
                  <li>• Version control</li>
                  <li>• Confidentiality levels</li>
                  <li>• Document categorization</li>
                  <li>• Search & tagging</li>
                  <li>• Access permissions</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-6 w-6 text-accent" />
                  <h3 className="text-lg font-semibold text-gray-900">Client Portfolio</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Client relationship mapping</li>
                  <li>• Ownership percentages</li>
                  <li>• Contact management</li>
                  <li>• Industry categorization</li>
                  <li>• Portfolio dashboards</li>
                  <li>• Communication history</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900">Budget & Analytics</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Cost tracking by category</li>
                  <li>• Budget vs. actual reporting</li>
                  <li>• ROI analysis</li>
                  <li>• Performance metrics</li>
                  <li>• Trend analysis</li>
                  <li>• Custom dashboards</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="h-6 w-6 text-accent" />
                  <h3 className="text-lg font-semibold text-gray-900">Automation Rules</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Trigger-based actions</li>
                  <li>• Email notifications</li>
                  <li>• Task creation</li>
                  <li>• Status updates</li>
                  <li>• Slack integrations</li>
                  <li>• Custom workflows</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Database Schema */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Complete Database Schema</h3>
              <p className="text-lg text-gray-600">
                Built on PARA/CODE frameworks with comprehensive relational structure
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* PARA Framework Tables */}
              <div>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">PARA</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Framework Tables</h4>
                </div>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-4 h-4 bg-primary rounded mr-2"></div>
                      Projects Table
                    </h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <span>• id (Primary Key)</span>
                        <span>• user_id</span>
                        <span>• name</span>
                        <span>• description</span>
                        <span>• status</span>
                        <span>• priority</span>
                        <span>• start_date</span>
                        <span>• target_completion</span>
                        <span>• budget_allocated</span>
                        <span>• budget_spent</span>
                        <span>• project_manager</span>
                        <span>• client_id (FK)</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-4 h-4 bg-accent rounded mr-2"></div>
                      Areas Table
                    </h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <span>• id (Primary Key)</span>
                        <span>• user_id</span>
                        <span>• name</span>
                        <span>• description</span>
                        <span>• area_type</span>
                        <span>• responsible_person</span>
                        <span>• review_frequency</span>
                        <span>• last_review_date</span>
                        <span>• next_review_date</span>
                        <span>• created_at</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-4 h-4 bg-primary rounded mr-2"></div>
                      Resources Table
                    </h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <span>• id (Primary Key)</span>
                        <span>• user_id</span>
                        <span>• title</span>
                        <span>• description</span>
                        <span>• resource_type</span>
                        <span>• category</span>
                        <span>• tags (JSON)</span>
                        <span>• file_url</span>
                        <span>• external_url</span>
                        <span>• access_level</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-4 h-4 bg-accent rounded mr-2"></div>
                      Archive Table
                    </h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <span>• id (Primary Key)</span>
                        <span>• user_id</span>
                        <span>• original_table</span>
                        <span>• original_id</span>
                        <span>• archived_data (JSON)</span>
                        <span>• archive_reason</span>
                        <span>• archived_by</span>
                        <span>• archived_at</span>
                        <span>• restore_before_date</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core IP & CODE Framework Tables */}
              <div>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">CODE</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Core IP & Operations</h4>
                </div>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                      IP Assets Table
                    </h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <span>• id (Primary Key)</span>
                        <span>• user_id</span>
                        <span>• project_id (FK)</span>
                        <span>• area_id (FK)</span>
                        <span>• asset_type</span>
                        <span>• title</span>
                        <span>• application_number</span>
                        <span>• registration_number</span>
                        <span>• filing_date</span>
                        <span>• expiry_date</span>
                        <span>• status</span>
                        <span>• jurisdiction</span>
                        <span>• inventor_names (JSON)</span>
                        <span>• assignee</span>
                        <span>• estimated_value</span>
                        <span>• commercial_status</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                      Tasks Table (CODE)
                    </h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <span>• id (Primary Key)</span>
                        <span>• user_id</span>
                        <span>• project_id (FK)</span>
                        <span>• ip_asset_id (FK)</span>
                        <span>• title</span>
                        <span>• task_type</span>
                        <span>• priority</span>
                        <span>• status</span>
                        <span>• assigned_to</span>
                        <span>• due_date</span>
                        <span>• estimated_hours</span>
                        <span>• billable_hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                      Documents Table
                    </h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <span>• id (Primary Key)</span>
                        <span>• user_id</span>
                        <span>• project_id (FK)</span>
                        <span>• ip_asset_id (FK)</span>
                        <span>• task_id (FK)</span>
                        <span>• title</span>
                        <span>• document_type</span>
                        <span>• file_url</span>
                        <span>• version_number</span>
                        <span>• confidentiality_level</span>
                        <span>• access_permissions</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                      Deadlines Table
                    </h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <span>• id (Primary Key)</span>
                        <span>• user_id</span>
                        <span>• ip_asset_id (FK)</span>
                        <span>• task_id (FK)</span>
                        <span>• deadline_type</span>
                        <span>• title</span>
                        <span>• due_date</span>
                        <span>• jurisdiction</span>
                        <span>• grace_period_days</span>
                        <span>• reminder_days_before</span>
                        <span>• status</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                      Budget Entries Table
                    </h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <span>• id (Primary Key)</span>
                        <span>• user_id</span>
                        <span>• project_id (FK)</span>
                        <span>• ip_asset_id (FK)</span>
                        <span>• client_id (FK)</span>
                        <span>• entry_type</span>
                        <span>• category</span>
                        <span>• amount</span>
                        <span>• currency</span>
                        <span>• transaction_date</span>
                        <span>• billable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Relationships Diagram */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Database Relationships</h4>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center text-sm text-gray-600 space-y-2">
                  <p><strong>Projects</strong> → Contains multiple <strong>IP Assets</strong> and <strong>Tasks</strong></p>
                  <p><strong>IP Assets</strong> → Linked to <strong>Documents</strong>, <strong>Deadlines</strong>, and <strong>Budget Entries</strong></p>
                  <p><strong>Tasks</strong> → Can have associated <strong>Documents</strong> and <strong>Deadlines</strong></p>
                  <p><strong>Clients</strong> → Own multiple <strong>Projects</strong> and <strong>Budget Entries</strong></p>
                  <p><strong>Areas</strong> → Organize <strong>IP Assets</strong> by responsibility domains</p>
                  <p><strong>Archive</strong> → Stores historical data from all tables</p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Data Security</h5>
                <p className="text-sm text-gray-600">Role-based access control and confidentiality levels</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Automation Ready</h5>
                <p className="text-sm text-gray-600">Trigger-based workflows and smart notifications</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Analytics Ready</h5>
                <p className="text-sm text-gray-600">Structured data for reporting and insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Portal Functionality */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Secure Client Portal</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Give your clients real-time access to their IP portfolios with role-based permissions and branded dashboards.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Access Control</h3>
                  <p className="text-gray-600">
                    Role-based permissions ensure clients see only their relevant IP assets and documents.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Portfolio Views</h3>
                  <p className="text-gray-600">
                    Live dashboards showing portfolio status, upcoming deadlines, and recent activity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Document Access</h3>
                  <p className="text-gray-600">
                    Secure document sharing with version control and download tracking.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Branding</h3>
                  <p className="text-gray-600">
                    White-label portal with your firm's branding and custom domain options.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Client Dashboard Preview</h4>
                <p className="text-sm text-gray-600">TechCorp Portfolio Overview</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">AI Algorithm Patent</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">Brand Trademark</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Renewal Due</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Software Copyright</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Protected</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium">Trade Secrets (3)</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Confidential</Badge>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Next Deadline:</span>
                  <span className="font-medium text-gray-900">March 15, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard & Automation */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Smart Dashboards & Automation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple view options, intelligent automation, and seamless integrations keep your team productive.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Views</h3>
              <div className="space-y-6">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-gray-900">Calendar View</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Timeline view of all deadlines, renewals, and milestones with drag-and-drop scheduling.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <Layers className="h-5 w-5 text-accent" />
                      <h4 className="font-semibold text-gray-900">Kanban Boards</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Visual workflow management for applications, prosecutions, and project stages.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-gray-900">Analytics Dashboard</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Portfolio performance metrics, cost analysis, and strategic insights.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Automation & Integrations</h3>
              <div className="space-y-6">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <Zap className="h-5 w-5 text-accent" />
                      <h4 className="font-semibold text-gray-900">Smart Reminders</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Automated email and Slack notifications based on deadlines, status changes, and custom triggers.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-gray-900">Workflow Automation</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Automatic task creation, status updates, and document routing based on predefined rules.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <Globe className="h-5 w-5 text-accent" />
                      <h4 className="font-semibold text-gray-900">Third-party Integrations</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Connect with Slack, Microsoft Teams, Google Workspace, and patent office databases.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Tailored for Your Practice</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible configuration options that adapt to your firm size, IP focus areas, and unique workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Firm Size Scaling</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>Solo practitioners</li>
                  <li>Small IP boutiques</li>
                  <li>Mid-size law firms</li>
                  <li>Large corporate legal</li>
                  <li>Enterprise IP departments</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">IP Focus Areas</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>Patent prosecution</li>
                  <li>Trademark portfolio</li>
                  <li>Copyright management</li>
                  <li>Trade secret protection</li>
                  <li>Licensing & transactions</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Workflows</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>Approval processes</li>
                  <li>Review cycles</li>
                  <li>Client communication</li>
                  <li>Document templates</li>
                  <li>Reporting formats</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Implementation & Training</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our team works with you to configure your Airtable base, migrate existing data, and train your team on best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Schedule Setup Call
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  View Implementation Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your IP Management?</h2>
          <p className="text-xl mb-8 opacity-90">
            See how your IP portfolio looks when it's under control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Get a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              Get a walkthrough of your tailored Airtable IP base
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Custom Airtable configuration • Data migration included • Team training provided
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-lg font-semibold">IPFlow</span>
              </div>
              <p className="text-gray-400 text-sm">
                The future of intellectual property management, built for teams that think long-term.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 IPFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App