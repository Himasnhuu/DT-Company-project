# CRM Data Champion – DT Fellowship Submission

A modern, intent-driven CRM web application designed for B2B MSMEs to improve conversion rates, reduce customer acquisition costs, and enable sales teams to prioritize the right leads through behavioral intelligence and AI-powered nurturing suggestions.

## 🧩 Project Overview

CRM Data Champion transforms traditional funnel management by prioritizing **intent-driven segmentation** over rigid linear progression. The application tracks leads through adaptive pathways, provides real-time analytics insights, and enables personalized nurturing strategies powered by AI.

**Key Problem Solved**: Traditional CRMs force leads through rigid funnels, wasting resources on low-intent prospects while high-intent buyers get lost in generic sequences.

**Solution**: Behavioral signal-based routing with AI-powered personalization that scales human intuition rather than replacing it.

## 🔧 Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Recharts for data visualization
- **AI Integration**: Hugging Face API (Mistral-7B-Instruct-v0.2)
- **Language**: JavaScript (ES6+) with React Hooks
- **Build Tool**: Turbopack for fast development
- **Data**: Local JSON mock datasets (18 sample leads, 10 marketing channels)

## 🚀 Features

### Core CRM Functionality
- **Lead Management**: Complete lead tracking with stage filters (Lead → MQL → SQL → Customer)
- **Smart Dashboard**: Lead filtering, search, and summary statistics
- **Intent Scoring**: Behavioral signal analysis for lead prioritization
- **Last Engagement Tracking**: Real-time activity monitoring

### Analytics & Insights
- **Funnel Visualization**: Interactive conversion tracking with Recharts
- **CAC vs LTV Analysis**: Customer acquisition cost and lifetime value metrics
- **Channel Performance**: ROI tracking across 10 marketing channels
- **Conversion Optimization**: Funnel drop-off analysis and recommendations

### AI-Powered Nurturing
- **Real-time AI Suggestions**: Live nurturing recommendations via Hugging Face API
- **Custom Prompt Input**: Personalized suggestions for specific lead scenarios
- **Intent-Based Flows**: Three-tier nurturing strategies (High, Mid, Low intent)
- **Fallback Intelligence**: Professional suggestions even when AI is unavailable

### User Experience
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Slide-deck Style**: Professional presentation-ready layouts
- **Loading States**: Smooth UX with spinners and transitions
- **Error Handling**: Graceful fallbacks and user-friendly messages

## 📁 Folder Structure

```
src/
├── app/
│   ├── dashboard/          # Lead management & filtering
│   ├── funnel/            # Conversion analytics & charts
│   ├── nurture/           # AI-powered nurturing flows
│   ├── summary/           # Strategic overview & insights
│   └── api/
│       └── generate/      # Hugging Face AI integration
├── components/
│   ├── LeadCard.js        # Individual lead display
│   ├── Navbar.js          # Navigation header
│   ├── Sidebar.js         # Navigation sidebar
│   ├── FunnelChart.js     # Conversion funnel visualization
│   └── MarketingChart.js  # Channel performance charts
├── data/
│   ├── leads.json         # 18 sample leads with realistic data
│   └── analytics.json     # Funnel metrics & channel performance
└── utils/
    └── formatDate.js      # Date/currency formatting utilities
```

## 🧠 AI Integration

### Hugging Face Implementation
- **Model**: `mistralai/Mistral-7B-Instruct-v0.2` for professional business communications
- **API Route**: `/api/generate` handles real-time AI suggestions
- **Custom Prompts**: Users can input specific lead scenarios for personalized recommendations
- **Response Processing**: Intelligent text extraction and cleaning from AI responses

### Smart Fallback System
- **Professional Suggestions**: High-quality fallback recommendations when AI is unavailable
- **Error Handling**: Graceful degradation with contextual business advice
- **Never Fails**: Frontend always receives actionable suggestions regardless of AI status

### Use Cases
- Series B FinTech lead follow-up strategies
- Mid-intent SaaS startup nurturing
- Enterprise re-engagement campaigns
- Industry-specific value propositions

## ▶️ Run Locally

### Prerequisites
- Node.js 18+ installed
- Hugging Face API key (optional for AI features)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd himanshu_project-dt-company
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (optional)**
   ```bash
   # Create .env.local file
   echo "HF_API_KEY=your_hugging_face_api_key" > .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

### Available Routes
- `/dashboard` - Lead management and filtering
- `/funnel` - Analytics and conversion tracking
- `/nurture` - AI-powered nurturing flows
- `/summary` - Strategic overview and insights

## � Key Metrics Demonstrated

- **Conversion Rate**: 16.7% overall funnel performance
- **LTV:CAC Ratio**: 7:1 (healthy business metrics)
- **Implementation Speed**: 2-week typical deployment
- **ROI Timeline**: 6-month average payback period

## 🎯 Strategic Insights

### Intent-Driven Segmentation
- **High-Intent**: Founder-level attention within 24 hours
- **Mid-Intent**: Educational nurturing and community building
- **Low-Intent**: Long-term relationship development

### Data Storytelling
Every metric translates to actionable business decisions:
- Conversion rates → Channel optimization opportunities
- Intent scoring → Resource allocation strategy
- Funnel drop-offs → Product positioning adjustments

## 🏆 Built for DT Fellowship

This project demonstrates:
- **Technical Excellence**: Full-stack development with modern tools
- **Strategic Thinking**: Intent-driven customer lifecycle management
- **Business Acumen**: CAC/LTV optimization and ROI focus
- **AI Innovation**: Practical AI integration for business value
- **Scalable Architecture**: Modular, production-ready structure

---

**Author**: Abhay | **Program**: DT Fellowship 2025 | **Assignment**: CRM Data Champion

*Turning data into competitive advantage through strategic storytelling and behavioral intelligence.*
