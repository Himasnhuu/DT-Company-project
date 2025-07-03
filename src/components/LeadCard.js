import { formatDate, getIntentColor, getStageColor, getIndustryColor } from '../utils/formatDate';
import { ArrowRight } from 'lucide-react';

export default function LeadCard({ lead }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{lead.name}</h3>
            <p className="text-sm text-gray-500">{lead.company}</p>
            <p className="text-sm text-gray-500">{lead.email}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(lead.stage)}`}>
              {lead.stage}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getIntentColor(lead.intentLevel)}`}>
              {lead.intentLevel} Intent
            </span>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Industry:</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getIndustryColor(lead.industry)}`}>
              {lead.industry}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Lead Source:</span>
            <span className="text-gray-700">{lead.leadSource}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Last Engaged:</span>
            <span className="text-gray-700">{formatDate(lead.lastEngaged, 'relative')}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-400">
            ID: {lead.id.substring(0, 8)}...
          </span>
          <button className="inline-flex items-center text-blue-600 hover:text-blue-900 text-sm font-medium transition-colors">
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
