'use client';

import { useState, useEffect } from 'react';
import LeadCard from '../../components/LeadCard';
import { 
  Users, 
  UserCheck, 
  Target, 
  CheckCircle, 
  Sprout,
  Search,
  User,
  Eye,
  HandHeart,
  Crown,
  Lightbulb,
  Loader2
} from 'lucide-react';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    stage: 'All',
    intentLevel: 'All',
    industry: 'All',
    search: ''
  });

  // Load leads data
  useEffect(() => {
    const loadLeads = async () => {
      try {
        // In a real app, this would be an API call
        const response = await import('../../data/leads.json');
        setLeads(response.default);
        setFilteredLeads(response.default);
        setLoading(false);
      } catch (error) {
        console.error('Error loading leads:', error);
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  // Filter leads based on current filters
  useEffect(() => {
    let filtered = leads;

    if (filters.stage !== 'All') {
      filtered = filtered.filter(lead => lead.stage === filters.stage);
    }

    if (filters.intentLevel !== 'All') {
      filtered = filtered.filter(lead => lead.intentLevel === filters.intentLevel);
    }

    if (filters.industry !== 'All') {
      filtered = filtered.filter(lead => lead.industry === filters.industry);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm) ||
        lead.company.toLowerCase().includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm) ||
        lead.industry.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredLeads(filtered);
  }, [leads, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Calculate summary stats
  const stageStats = {
    Lead: leads.filter(lead => lead.stage === 'Lead').length,
    MQL: leads.filter(lead => lead.stage === 'MQL').length,
    SQL: leads.filter(lead => lead.stage === 'SQL').length,
    Customer: leads.filter(lead => lead.stage === 'Customer').length,
    Nurtured: leads.filter(lead => lead.stage === 'Nurtured').length
  };

  // Get unique values for filter dropdowns
  const stages = ['All', 'Lead', 'MQL', 'SQL', 'Customer', 'Nurtured'];
  const intentLevels = ['All', 'High', 'Mid', 'Low'];
  const industries = ['All', ...new Set(leads.map(lead => lead.industry))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            CRM Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your leads and track conversion funnel - {leads.length} total leads
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-5">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-3 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Leads</dt>
                  <dd className="text-base sm:text-lg font-medium text-gray-900">{stageStats.Lead}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                  <Search className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">MQLs</dt>
                  <dd className="text-lg font-medium text-gray-900">{stageStats.MQL}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">SQLs</dt>
                  <dd className="text-lg font-medium text-gray-900">{stageStats.SQL}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Customers</dt>
                  <dd className="text-lg font-medium text-gray-900">{stageStats.Customer}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Nurtured</dt>
                  <dd className="text-lg font-medium text-gray-900">{stageStats.Nurtured}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Filter Leads</h3>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search leads..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Stage Filter */}
            <div>
              <select
                value={filters.stage}
                onChange={(e) => handleFilterChange('stage', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {stages.map(stage => (
                  <option key={stage} value={stage}>
                    {stage === 'All' ? 'All Stages' : stage}
                  </option>
                ))}
              </select>
            </div>

            {/* Intent Level Filter */}
            <div>
              <select
                value={filters.intentLevel}
                onChange={(e) => handleFilterChange('intentLevel', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {intentLevels.map(level => (
                  <option key={level} value={level}>
                    {level === 'All' ? 'All Intent Levels' : `${level} Intent`}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Filter */}
            <div>
              <select
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry === 'All' ? 'All Industries' : industry}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Active filters display */}
          {(filters.stage !== 'All' || filters.intentLevel !== 'All' || filters.industry !== 'All' || filters.search) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {filters.stage !== 'All' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Stage: {filters.stage}
                </span>
              )}
              {filters.intentLevel !== 'All' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Intent: {filters.intentLevel}
                </span>
              )}
              {filters.industry !== 'All' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Industry: {filters.industry}
                </span>
              )}
              {filters.search && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Search: &quot;{filters.search}&quot;
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Eye className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Showing {filteredLeads.length} of {leads.length} leads
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Conversion Rate: {leads.length > 0 ? ((stageStats.Customer / leads.length) * 100).toFixed(1) : 0}% 
                • Active Pipeline: {stageStats.Lead + stageStats.MQL + stageStats.SQL} leads
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Grid */}
      {filteredLeads.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
}
