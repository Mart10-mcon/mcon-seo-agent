import React from 'react'
import {
  Search,
  Lightbulb,
  Target,
  BarChart3,
  Eye,
  TrendingUp,
  Globe,
  ArrowDown,
  Zap,
  Users,
  LogOut,
  Menu
} from 'lucide-react'

const Sidebar = ({ selectedTool, setSelectedTool }) => {
  const keywordResearchTools = [
    { id: 'related-keywords', name: 'Related Keywords', description: 'Find related keywords', icon: Search },
    { id: 'keyword-suggestions', name: 'Keyword Suggestions', description: 'Get keyword suggestions', icon: Lightbulb },
    { id: 'keyword-ideas', name: 'Keyword Ideas', description: 'Discover keyword ideas', icon: Target },
    { id: 'keyword-difficulty', name: 'Keyword Difficulty', description: 'Analyze keyword difficulty', icon: BarChart3 },
    { id: 'keyword-overview', name: 'Keyword Overview', description: 'Complete keyword overview', icon: Eye },
  ]

  const competitorResearchTools = [
    { id: 'ranked-keywords', name: 'Ranked Keywords', description: 'Ranking keywords', icon: TrendingUp },
    { id: 'domain-rank-overview', name: 'Domain Rank Overview', description: 'Domain ranking analysis', icon: Globe },
    { id: 'keyword-gap-analysis', name: 'Keyword Gap Analysis', description: 'Keyword Opportunities', icon: ArrowDown },
    { id: 'bulk-traffic-estimation', name: 'Bulk Traffic Estimation', description: 'Estimate domain traffic', icon: Zap },
    { id: 'competitors-domain', name: 'Competitors Domain', description: 'Find competitor domains', icon: Users },
  ]

  const NavItem = ({ tool }) => {
    const Icon = tool.icon
    const isActive = selectedTool === tool.id

    return (
      <button
        onClick={() => setSelectedTool(tool.id)}
        className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
          isActive
            ? 'bg-blue-50 text-primary border-l-3 border-primary'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{tool.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{tool.description}</div>
        </div>
      </button>
    )
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo/Brand Area */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <Menu className="w-6 h-6 text-gray-600" />
        <span className="font-semibold text-gray-800">SEO Tools</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Keyword Research Section */}
        <div className="py-4">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Keyword Research
          </h3>
          <div className="space-y-1">
            {keywordResearchTools.map((tool) => (
              <NavItem key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Competitor Research Section */}
        <div className="py-4 border-t border-gray-100">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Competitor Research
          </h3>
          <div className="space-y-1">
            {competitorResearchTools.map((tool) => (
              <NavItem key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="text-sm text-gray-600 mb-3">martien@mconbv.nl</div>
        <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
