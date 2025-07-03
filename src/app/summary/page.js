'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatDate';
import { Loader2, Target, BarChart3, FileText, DollarSign, Zap, Flame, Sprout } from 'lucide-react';

export default function Summary() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await import('../../data/analytics.json');
        setAnalytics(response.default);
        setLoading(false);
      } catch (error) {
        console.error('Error loading analytics:', error);
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            CRM Data Champion
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-6">
            Strategic Summary & Implementation Overview
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">18</div>
              <div className="text-blue-100">Sample Leads</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">10</div>
              <div className="text-blue-100">Marketing Channels</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">5</div>
              <div className="text-blue-100">Funnel Stages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Funnel Design Philosophy */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          <Target className="mr-2 h-6 w-6 text-blue-600" />
          Funnel Design Philosophy
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="prose prose-lg text-gray-700">
              <p className="text-xl leading-relaxed">
                Our funnel architecture prioritizes <strong>intent-driven segmentation</strong> over traditional linear progression.
              </p>
              <p>
                Rather than forcing leads through rigid stages, we've built adaptive pathways that respond to behavioral signals.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <span className="text-2xl mr-4">🔥</span>
                <div>
                  <div className="font-semibold text-red-900">High-Intent Leads</div>
                  <div className="text-red-700">Founder-level attention within 24 hours</div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <Zap className="text-yellow-500 h-8 w-8 mr-4" />
                <div>
                  <div className="font-semibold text-yellow-900">Mid-Intent Leads</div>
                  <div className="text-yellow-700">Educational nurturing and community building</div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <span className="text-2xl mr-4">🌱</span>
                <div>
                  <div className="font-semibold text-green-900">Low-Intent Leads</div>
                  <div className="text-green-700">Long-term value nurturing and relationship building</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Funnel Flow Diagram</h3>
            <div className="space-y-4">
              {/* Funnel Visualization */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <div className="bg-blue-500 text-white text-center py-3 rounded-t-lg">
                    <div className="font-semibold">Lead (4)</div>
                    <div className="text-sm">Initial Interest</div>
                  </div>
                  <div className="bg-purple-500 text-white text-center py-3 mx-4">
                    <div className="font-semibold">MQL (5)</div>
                    <div className="text-sm">Marketing Qualified</div>
                  </div>
                  <div className="bg-orange-500 text-white text-center py-3 mx-8">
                    <div className="font-semibold">SQL (4)</div>
                    <div className="text-sm">Sales Qualified</div>
                  </div>
                  <div className="bg-green-500 text-white text-center py-3 mx-12 rounded-b-lg">
                    <div className="font-semibold">Customer (3)</div>
                    <div className="text-sm">Converted</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-600 mt-4">
                <p>Adaptive pathways based on behavioral signals</p>
                <p className="font-semibold text-blue-600">16.7% Overall Conversion Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CRM Structure Summary */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          <BarChart3 className="mr-2 h-6 w-6 text-blue-600" />
          CRM Structure & Data Tracking
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Lead Information</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Personal & Company Data</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Industry Classification</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Lead Source Attribution</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Contact Information</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">Behavioral Tracking</h3>
            <ul className="space-y-2 text-purple-800">
              <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Intent Level Scoring</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Engagement Frequency</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Last Activity Timestamp</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Stage Progression</li>
            </ul>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Marketing Intelligence</h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Channel Performance</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Conversion Metrics</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Cost Attribution</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>ROI Calculations</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Why This Data Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Systems Intelligence</h4>
              <p className="text-gray-600 text-sm">
                Granular behavioral data enables automated segmentation and personalized nurturing sequences.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Human Context</h4>
              <p className="text-gray-600 text-sm">
                Sales teams use data insights to make contextual decisions that algorithms cannot capture.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nurturing Strategy Recap */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          <Target className="mr-2 h-6 w-6 text-blue-600" />
          Nurturing Strategy Framework
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* High Intent */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
            <div className="text-center mb-4">
              <Flame className="text-red-500 h-10 w-10 mx-auto" />
              <h3 className="text-xl font-bold text-red-900 mt-2">High-Intent</h3>
              <p className="text-red-700 text-sm">Urgency-Driven Approach</p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/70 rounded p-3">
                <div className="font-medium text-red-900 text-sm">Strategy</div>
                <div className="text-red-800 text-xs">Founder-level attention, limited-time offers</div>
              </div>
              
              <div className="bg-white/70 rounded p-3">
                <div className="font-medium text-red-900 text-sm">Timeline</div>
                <div className="text-red-800 text-xs">24-hour response, 72-hour follow-up</div>
              </div>
              
              <div className="bg-white/70 rounded p-3">
                <div className="font-medium text-red-900 text-sm">Content</div>
                <div className="text-red-800 text-xs">Case studies, custom demos, ROI calculations</div>
              </div>
            </div>
          </div>
          
          {/* Mid Intent */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
            <div className="text-center mb-4">
              <Zap className="text-yellow-500 h-10 w-10" />
              <h3 className="text-xl font-bold text-yellow-900 mt-2">Mid-Intent</h3>
              <p className="text-yellow-700 text-sm">Educational Nurturing</p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/70 rounded p-3">
                <div className="font-medium text-yellow-900 text-sm">Strategy</div>
                <div className="text-yellow-800 text-xs">Value-first education, community building</div>
              </div>
              
              <div className="bg-white/70 rounded p-3">
                <div className="font-medium text-yellow-900 text-sm">Timeline</div>
                <div className="text-yellow-800 text-xs">3-7-14 day sequence with workshops</div>
              </div>
              
              <div className="bg-white/70 rounded p-3">
                <div className="font-medium text-yellow-900 text-sm">Content</div>
                <div className="text-yellow-800 text-xs">Whitepapers, webinars, industry insights</div>
              </div>
            </div>
          </div>
          
          {/* Low Intent */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="text-center mb-4">
              <Sprout className="text-green-500 h-10 w-10 mx-auto" />
              <h3 className="text-xl font-bold text-green-900 mt-2">Low-Intent</h3>
              <p className="text-green-700 text-sm">Relationship Building</p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/70 rounded p-3">
                <div className="font-medium text-green-900 text-sm">Strategy</div>
                <div className="text-green-800 text-xs">Long-term value, industry thought leadership</div>
              </div>
              
              <div className="bg-white/70 rounded p-3">
                <div className="font-medium text-green-900 text-sm">Timeline</div>
                <div className="text-green-800 text-xs">Monthly check-ins, quarterly insights</div>
              </div>
              
              <div className="bg-white/70 rounded p-3">
                <div className="font-medium text-green-900 text-sm">Content</div>
                <div className="text-green-800 text-xs">Newsletters, trend reports, networking events</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAC vs LTV Dashboard */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          <DollarSign className="mr-2 h-6 w-6 text-blue-600" />
          CAC vs LTV Analytics Dashboard
        </h2>
        
        {analytics && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 sm:gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-200">
                <div className="text-3xl font-bold text-blue-600">{formatCurrency(analytics.metrics.cac)}</div>
                <div className="text-blue-800 font-medium">Customer Acquisition Cost</div>
                <div className="text-blue-600 text-sm mt-1">Average across all channels</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6 text-center border border-green-200">
                <div className="text-3xl font-bold text-green-600">{formatCurrency(analytics.metrics.ltv)}</div>
                <div className="text-green-800 font-medium">Lifetime Value</div>
                <div className="text-green-600 text-sm mt-1">Average customer value</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6 text-center border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{analytics.metrics.ltvCacRatio}:1</div>
                <div className="text-purple-800 font-medium">LTV:CAC Ratio</div>
                <div className="text-purple-600 text-sm mt-1">Healthy = 3:1 or higher</div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-6 text-center border border-orange-200">
                <div className="text-3xl font-bold text-orange-600">{analytics.metrics.avgSalesCycle}</div>
                <div className="text-orange-800 font-medium">Avg Sales Cycle</div>
                <div className="text-orange-600 text-sm mt-1">Days to conversion</div>
              </div>
            </div>
            
            {/* Top Performing Channels by ROI */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance Insights</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Best ROI Channels</h4>
                  <div className="space-y-2">
                    {[...analytics.marketingChannels]
                      .map(channel => ({
                        ...channel,
                        roi: ((channel.avgLTV * channel.conversions - channel.costIncurred) / channel.costIncurred * 100)
                      }))
                      .sort((a, b) => b.roi - a.roi)
                      .slice(0, 3)
                      .map((channel, index) => (
                        <div key={channel.channel} className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="text-sm font-medium">{channel.channel}</span>
                          <span className="text-sm text-green-600 font-bold">{channel.roi.toFixed(1)}% ROI</span>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Volume Leaders</h4>
                  <div className="space-y-2">
                    {[...analytics.marketingChannels]
                      .sort((a, b) => b.leads - a.leads)
                      .slice(0, 3)
                      .map((channel, index) => (
                        <div key={channel.channel} className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="text-sm font-medium">{channel.channel}</span>
                          <span className="text-sm text-blue-600 font-bold">{channel.leads.toLocaleString()} leads</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Strategic Summary */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-4 sm:p-6 md:p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <FileText className="mr-2 h-6 w-6 text-blue-600" />
          Strategic Summary
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Systems vs Human Behavior Balance</h3>
            <p className="text-gray-200 leading-relaxed">
              Data systems provide the intelligence; human judgment executes the strategy. Our platform captures granular behavioral data 
              (pricing page visits, demo requests, email engagement) but preserves human discretion in nurture timing and message personalization. 
              The CRM suggests actions; sales teams decide execution based on context that algorithms can&apos;t capture.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-300 mb-3">Data Storytelling in Decision Making</h3>
            <p className="text-gray-200 leading-relaxed">
              Numbers without narrative are noise. Our analytics translate raw metrics into actionable insights—conversion rates become 
              channel optimization opportunities, intent scoring becomes resource allocation strategy, and funnel drop-offs become product 
              positioning adjustments. Every dashboard tells a story that drives specific business decisions.
            </p>
          </div>
          
          <div className="text-center mt-8 p-6 bg-white/5 rounded-lg">
            <p className="text-xl text-blue-200 font-medium">
              The result: a CRM that scales human intuition rather than replacing it, turning data into competitive advantage 
              through strategic storytelling and behavioral intelligence.
            </p>
            <div className="mt-4 text-sm text-gray-400">
              Built for DT Fellowship - CRM Data Champion Assignment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
