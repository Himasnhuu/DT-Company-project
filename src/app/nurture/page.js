'use client';

import { useState, useEffect } from 'react';
import { getIntentColor } from '../../utils/formatDate';
import { Bot, Loader2, ChevronUp, ChevronRight, UserPlus, Lightbulb, CheckCircle, Zap } from 'lucide-react';

const nurtureFlows = [
  {
    id: 'high-intent',
    name: 'High Intent Flow',
    intent: 'High',
    description: 'Aggressive follow-up for hot leads',
    steps: [
      { order: 1, action: 'Send personalized demo invitation', delay: '0 days' },
      { order: 2, action: 'Follow-up call within 24h', delay: '1 day' },
      { order: 3, action: 'Send case study relevant to industry', delay: '2 days' },
      { order: 4, action: 'Executive meeting invitation', delay: '5 days' },
      { order: 5, action: 'Custom proposal preparation', delay: '7 days' }
    ],
    activeLeads: 3
  },
  {
    id: 'mid-intent',
    name: 'Mid Intent Flow',
    intent: 'Mid',
    description: 'Educational nurturing sequence',
    steps: [
      { order: 1, action: 'Send welcome email with resources', delay: '0 days' },
      { order: 2, action: 'Educational webinar invitation', delay: '3 days' },
      { order: 3, action: 'Industry report download', delay: '7 days' },
      { order: 4, action: 'Product comparison guide', delay: '14 days' },
      { order: 5, action: 'Schedule consultation call', delay: '21 days' }
    ],
    activeLeads: 4
  },
  {
    id: 'low-intent',
    name: 'Low Intent Flow',
    intent: 'Low',
    description: 'Long-term relationship building',
    steps: [
      { order: 1, action: 'Add to newsletter subscription', delay: '0 days' },
      { order: 2, action: 'Monthly industry insights', delay: '7 days' },
      { order: 3, action: 'Educational blog content', delay: '14 days' },
      { order: 4, action: 'Quarterly check-in email', delay: '30 days' },
      { order: 5, action: 'Re-engagement campaign', delay: '90 days' }
    ],
    activeLeads: 2
  }
];

export default function Nurture() {
  const [leads, setLeads] = useState([]);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const response = await import('../../data/leads.json');
        setLeads(response.default);
        setLoading(false);
      } catch (error) {
        console.error('Error loading leads:', error);
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  const generateAISuggestion = async (intentLevel = 'high') => {
    setAiLoading(true);
    setAiError('');
    
    try {
      const prompt = customPrompt || `Suggest a personalized follow-up message for a ${intentLevel}-intent FinTech lead who has shown interest in our CRM platform. Include specific value propositions and next steps.`;
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate suggestion');
      }

      setAiSuggestion(data.message);
    } catch (error) {
      console.error('AI Generation Error:', error);
      setAiError(error.message || 'Failed to generate AI suggestion. Please try again.');
      setAiSuggestion('Sample fallback suggestion: Focus on ROI benefits and schedule a personalized demo within 48 hours. Highlight specific industry case studies relevant to their business size.');
    } finally {
      setAiLoading(false);
    }
  };

  const getLeadsByIntent = (intent) => {
    return leads.filter(lead => lead.intentLevel === intent && lead.stage !== 'Customer');
  };

  const handleAssignFlow = (flowId, leadId) => {
    // In a real app, this would make an API call
    console.log(`Assigning flow ${flowId} to lead ${leadId}`);
    alert(`Flow assigned successfully! (This is a mock action)`);
  };

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
            Nurture Flows
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Automated sequences based on lead intent and behavior
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Flow
          </button>
        </div>
      </div>

      {/* Nurture Flows Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {nurtureFlows.map((flow) => (
          <div key={flow.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{flow.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getIntentColor(flow.intent)}`}>
                  {flow.intent}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{flow.description}</p>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Active Leads:</span>
                  <span className="font-medium text-gray-900">{flow.activeLeads}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-500">Available Leads:</span>
                  <span className="font-medium text-gray-900">
                    {getLeadsByIntent(flow.intent).length}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedFlow(selectedFlow === flow.id ? null : flow.id)}
                className="w-full text-left text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center"
              >
                {selectedFlow === flow.id ? (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronRight className="mr-1 h-4 w-4" />
                    View Details
                  </>
                )}
              </button>

              {selectedFlow === flow.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Flow Steps:</h4>
                  <div className="space-y-2">
                    {flow.steps.map((step) => (
                      <div key={step.order} className="flex items-start text-xs">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium mr-2">
                          {step.order}
                        </span>
                        <div className="flex-1">
                          <div className="text-gray-900">{step.action}</div>
                          <div className="text-gray-500">Delay: {step.delay}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lead Assignment Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Assign Leads to Nurture Flows
          </h3>
          
          <div className="space-y-6">
            {['High', 'Mid', 'Low'].map((intent) => {
              const intentLeads = getLeadsByIntent(intent);
              const flow = nurtureFlows.find(f => f.intent === intent);
              
              return (
                <div key={intent} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-md font-medium text-gray-900">
                      {intent} Intent Leads ({intentLeads.length})
                    </h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getIntentColor(intent)}`}>
                      {intent} Intent Flow
                    </span>
                  </div>
                  
                  {intentLeads.length === 0 ? (
                    <p className="text-sm text-gray-500">No leads available for this intent level</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {intentLeads.map((lead) => (
                        <div key={lead.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="text-sm font-medium text-gray-900">{lead.name}</h5>
                              <p className="text-xs text-gray-500">{lead.company}</p>
                              <p className="text-xs text-gray-500">Stage: {lead.stage}</p>
                            </div>
                            <button
                              onClick={() => handleAssignFlow(flow.id, lead.id)}
                              className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center"
                            >
                              <UserPlus className="mr-1 h-3 w-3" />
                              Assign
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Intent-Based Nurturing Panels */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-gray-900">Intent-Based Nurturing Examples</h2>
        
        {/* High-Intent Lead Panel */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 overflow-hidden">
          <div className="px-6 py-4 bg-red-600 text-white">
            <h3 className="text-lg font-semibold flex items-center">
              🔥 High-Intent Lead
              <span className="ml-2 px-2 py-1 bg-red-500 text-xs rounded-full">Priority</span>
            </h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sample Lead */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-gray-900 mb-2">Sample Lead Profile</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Name:</strong> Alexandra Chen</p>
                    <p><strong>Company:</strong> FinFlow Technologies (Series B FinTech)</p>
                    <p><strong>Behavior:</strong> Downloaded pricing, attended demo, asked about implementation timeline</p>
                    <p><strong>Pain Point:</strong> Current solution is too slow for real-time transactions</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-gray-900 mb-3">Personalized Nurturing Copy</h4>
                  <div className="prose prose-sm text-gray-700">
                    <p className="mb-3"><strong>Subject:</strong> Ready to 10x your transaction speed? Let&apos;s talk implementation</p>
                    
                    <div className="bg-gray-50 p-3 rounded border-l-4 border-red-500">
                      <p className="mb-2">Hi Alexandra,</p>
                      <p className="mb-2">I noticed you&apos;re evaluating solutions for FinFlow&apos;s real-time transaction challenges. Based on your demo questions about implementation timelines, I wanted to share how we helped <strong>PayStream (similar Series B FinTech)</strong> reduce their transaction processing time by 89% in just 6 weeks.</p>
                      
                      <p className="mb-2"><strong>What we achieved for PayStream:</strong></p>
                      <ul className="list-disc list-inside mb-3 text-sm">
                        <li>Transaction speed: 2.3s → 0.25s average</li>
                        <li>99.99% uptime during peak trading hours</li>
                        <li>$2.3M saved annually in infrastructure costs</li>
                      </ul>

                      <p className="mb-2">Given FinFlow&apos;s growth trajectory, I&apos;d love to show you a <strong>custom demo with your actual transaction volume</strong> to demonstrate the ROI impact.</p>
                      
                      <p className="mb-2">I have a 30-minute slot available this Thursday at 3 PM or Friday at 11 AM. Which works better for a founder-to-founder conversation?</p>
                      
                      <p>Best regards,<br/>
                      <strong>Himanshu Sharma</strong><br/>
                      Founder & CEO</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-blue-600" />
                    Live AI Suggestions
                  </h4>
                  
                  {/* Custom Prompt Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Prompt (optional)
                    </label>
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="e.g., Suggest follow-up for a FinTech lead interested in real-time payments..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      rows={2}
                    />
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={() => generateAISuggestion('high')}
                    disabled={aiLoading}
                    className="w-full mb-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                        Generating AI Suggestion...
                      </>
                    ) : (
                      <>
                        <Bot className="mr-2 h-4 w-4" />
                        Generate AI Suggestion
                      </>
                    )}
                  </button>

                  {/* AI Response */}
                  {aiSuggestion && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-900 mb-2">AI Generated Response:</h5>
                      <p className="text-blue-800 text-sm whitespace-pre-wrap">{aiSuggestion}</p>
                    </div>
                  )}

                  {/* Error Message */}
                  {aiError && (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h5 className="font-medium text-red-900 mb-2">Error:</h5>
                      <p className="text-red-800 text-sm">{aiError}</p>
                    </div>
                  )}

                  {/* Static Suggestions */}
                  <div className="space-y-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                      <p className="font-medium text-blue-900 mb-1">Urgency Trigger</p>
                      <p className="text-blue-800">Send a limited-time founder-led demo offer (72-hour window)</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                      <p className="font-medium text-green-900 mb-1">Social Proof</p>
                      <p className="text-green-800">Use testimonial from PayStream (similar company size & industry)</p>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                      <p className="font-medium text-purple-900 mb-1">Personalization</p>
                      <p className="text-purple-800">Reference their Series B funding and growth metrics from Crunchbase</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-gray-900 mb-2">Next Actions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Follow up in 24 hours if no response
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      Schedule technical deep-dive if interested
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Prepare custom ROI calculator
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mid-Intent Lead Panel */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 overflow-hidden">
          <div className="px-6 py-4 bg-yellow-500 text-white">
            <h3 className="text-lg font-semibold flex items-center">
              <Zap className="mr-2 h-4 w-4 text-yellow-500" />
              Mid-Intent Lead
              <span className="ml-2 px-2 py-1 bg-yellow-400 text-yellow-800 text-xs rounded-full">Nurture</span>
            </h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sample Lead */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-gray-900 mb-2">Sample Lead Profile</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Name:</strong> David Park</p>
                    <p><strong>Company:</strong> TechStart Innovations (Early-stage SaaS)</p>
                    <p><strong>Behavior:</strong> Downloaded whitepaper, opened 3 emails, visited pricing page</p>
                    <p><strong>Pain Point:</strong> Manual processes slowing down their growth</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-gray-900 mb-3">Educational Nurturing Copy</h4>
                  <div className="prose prose-sm text-gray-700">
                    <p className="mb-3"><strong>Subject:</strong> The automation playbook that helped 50+ SaaS startups scale</p>
                    
                    <div className="bg-gray-50 p-3 rounded border-l-4 border-yellow-500">
                      <p className="mb-2">Hi David,</p>
                      <p className="mb-2">I saw you downloaded our &quot;SaaS Scaling Playbook&quot; - great choice! Since TechStart is in the growth phase, I thought you&apos;d find value in this case study from <strong>CloudNine (similar early-stage SaaS)</strong>.</p>
                      
                      <p className="mb-2"><strong>CloudNine&apos;s Challenge:</strong> Manual onboarding was taking 2 weeks per client, limiting their growth to 10 new customers/month.</p>
                      
                      <p className="mb-2"><strong>Our Solution Impact:</strong></p>
                      <ul className="list-disc list-inside mb-3 text-sm">
                        <li>Onboarding time: 14 days → 2 days</li>
                        <li>Customer capacity: 10 → 50 per month</li>
                        <li>Team efficiency: 5x improvement</li>
                      </ul>

                      <p className="mb-2">I&apos;ve attached the detailed case study and would love to discuss how similar automation could accelerate TechStart&apos;s growth.</p>
                      
                      <p className="mb-2">Also, we&apos;re hosting a live workshop next week: <strong>&quot;From Manual to Automated: SaaS Growth Hacks&quot;</strong> - would you like me to save you a spot?</p>
                      
                      <p>Cheers,<br/>
                      <strong>Sarah Johnson</strong><br/>
                      Growth Consultant</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-blue-600" />
                    GPT AI Suggestions
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                      <p className="font-medium text-blue-900 mb-1">Educational Content</p>
                      <p className="text-blue-800">Share automation ROI calculator tailored for SaaS startups</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                      <p className="font-medium text-green-900 mb-1">Community Building</p>
                      <p className="text-green-800">Invite to exclusive &quot;SaaS Founders Circle&quot; Slack community</p>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                      <p className="font-medium text-purple-900 mb-1">Value-First Approach</p>
                      <p className="text-purple-800">Offer free 1-hour growth consultation with no sales pitch</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-gray-900 mb-2">Nurture Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      Day 3: Send case study
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      Day 7: Workshop invitation
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      Day 14: ROI calculator
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Low-Intent Lead Panel */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 overflow-hidden">
          <div className="px-6 py-4 bg-green-600 text-white">
            <h3 className="text-lg font-semibold flex items-center">
              🌱 Low-Intent Lead
              <span className="ml-2 px-2 py-1 bg-green-500 text-xs rounded-full">Long-term</span>
            </h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sample Lead */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-2">Sample Lead Profile</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Name:</strong> Maria Santos</p>
                    <p><strong>Company:</strong> TravelEase Platform (Bootstrap startup)</p>
                    <p><strong>Behavior:</strong> Subscribed to newsletter, occasional blog reads</p>
                    <p><strong>Pain Point:</strong> Limited budget, exploring options for future scaling</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-3">Relationship Building Copy</h4>
                  <div className="prose prose-sm text-gray-700">
                    <p className="mb-3"><strong>Subject:</strong> Monthly insights: Travel tech trends you should know</p>
                    
                    <div className="bg-gray-50 p-3 rounded border-l-4 border-green-500">
                      <p className="mb-2">Hi Maria,</p>
                      <p className="mb-2">Hope TravelEase is thriving! I know you&apos;re bootstrapping and focused on growth - here are 3 travel tech trends we&apos;re seeing that might spark some ideas:</p>
                      
                      <p className="mb-2"><strong>1. Micro-Personalization:</strong> Travel platforms using AI to customize experiences for groups of &lt;10 users (great for niche markets)</p>
                      
                      <p className="mb-2"><strong>2. Sustainable Travel Scoring:</strong> 73% of travelers now consider eco-impact when booking</p>
                      
                      <p className="mb-2"><strong>3. Voice-First Booking:</strong> Early-stage opportunity in voice-commerce for travel</p>

                      <p className="mb-2">I&apos;ve also attached our <strong>&quot;Bootstrap to Scale: Travel Tech Edition&quot;</strong> guide - it covers 15 growth hacks that don&apos;t require VC funding.</p>
                      
                      <p className="mb-2">No agenda here, just sharing insights that might be helpful for your journey. Feel free to reach out if you ever want to brainstorm!</p>
                      
                      <p>Safe travels,<br/>
                      <strong>Alex Chen</strong><br/>
                      Industry Relations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-blue-600" />
                    GPT AI Suggestions
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                      <p className="font-medium text-blue-900 mb-1">Value-First Content</p>
                      <p className="text-blue-800">Share industry insights and trends with no product mention</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                      <p className="font-medium text-green-900 mb-1">Relationship Building</p>
                      <p className="text-green-800">Send quarterly check-ins asking about their business progress</p>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                      <p className="font-medium text-purple-900 mb-1">Community Inclusion</p>
                      <p className="text-purple-800">Invite to founder meetups and industry networking events</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-2">Long-term Strategy</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Monthly industry newsletter
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Quarterly founder events
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Annual state of industry report
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions Section (Mock) */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            <Bot className="mr-2 h-5 w-5 text-blue-600" />
            AI Suggestions
          </h3>
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Lightbulb className="text-blue-500 h-4 w-4" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">
                    Optimize High Intent Flow
                  </h4>
                  <p className="text-sm text-blue-700">
                    Conversion Rate: {leads.length > 0 ? ((stageStats.Customer / leads.length) * 100).toFixed(1) : 0}% 
                    • Active Pipeline: {stageStats.Lead + stageStats.MQL + stageStats.SQL} leads
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-yellow-500">⚠️</span>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-yellow-900">
                    Mid Intent Engagement Drop
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Mid intent leads show 40% drop-off after step 3. Consider adding more interactive content.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="text-green-500 h-4 w-4" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-green-900">
                    Low Intent Flow Performing Well
                  </h4>
                  <p className="text-sm text-green-700">
                    Your low intent nurture sequence has 85% retention rate. Keep current strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
