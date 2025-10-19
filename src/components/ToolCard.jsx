import React from 'react'

const ToolCard = ({ tool, onLaunch }) => {
  const Icon = tool.icon

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col h-full">
        {/* Icon and Title */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`p-2.5 rounded-lg ${tool.iconBgColor || 'bg-primary/10'}`}>
            <Icon className={`w-6 h-6 ${tool.iconColor || 'text-primary'}`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 flex-1">
            {tool.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 flex-1">
          {tool.description}
        </p>

        {/* Launch Button */}
        <button
          onClick={() => onLaunch(tool)}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Launch Tool
        </button>
      </div>
    </div>
  )
}

export default ToolCard
