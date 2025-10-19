import React from 'react'
import ToolCard from './ToolCard'
import {
  Search,
  Lightbulb,
  Target,
  BarChart3,
  Eye,
  TrendingUp,
  TrendingUpIcon,
} from 'lucide-react'

const Layout = ({ onToolSelect }) => {
  const tools = [
    {
      id: 'related-keywords',
      name: 'Related Keywords',
      description: 'Discover keywords related to your main terms',
      icon: Search,
      iconBgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      id: 'keyword-suggestions',
      name: 'Keyword Suggestions',
      description: 'Get intelligent keyword suggestions',
      icon: Lightbulb,
      iconBgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      id: 'keyword-ideas',
      name: 'Keyword Ideas',
      description: 'Generate fresh keyword ideas for your content',
      icon: Target,
      iconBgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      id: 'keyword-difficulty',
      name: 'Keyword Difficulty',
      description: 'Analyze the competition for your target keywords',
      icon: BarChart3,
      iconBgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      id: 'keyword-overview',
      name: 'Keyword Overview',
      description: 'Complete analysis of keyword metrics and trends',
      icon: Eye,
      iconBgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
  ]

  const handleLaunchTool = (tool) => {
    onToolSelect(tool.id)
    console.log('Launching tool:', tool.name)
  }

  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Professional SEO Research Tool
        </h1>
        <p className="text-lg text-gray-600">
          Built For the AI Ranking Community | Powered by DataForSEO
        </p>
      </div>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} onLaunch={handleLaunchTool} />
        ))}
      </div>

      {/* Getting Started Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-start gap-3 mb-3">
          <TrendingUpIcon className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">Getting Started</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Start with any tool above to begin your keyword research. Each tool provides unique insights
          powered by DataForSEO's comprehensive database. Use the chat window on the right to trigger
          n8n workflows and automate your SEO tasks.
        </p>
      </div>
    </div>
  )
}

export default Layout
