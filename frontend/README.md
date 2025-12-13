EventFlow - Smart Event Aggregator 🚀
MERN Stack Event Dashboard - Fetches tech events from Ticketmaster + Eventbrite, with fuzzy search, category filters, and responsive UI.

[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7Chttps://github.com/perplexity-ai/eventflowhttps://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailhttps://github.com/perplexity-ai/eventflowhttps://img.shields.io/badge/Database-Mongohttps://github.com/perplexity-ai/eventflow

📡 Dual API Integration: Ticketmaster (public) + Eventbrite (private org events)

🔍 Fuzzy Multi-field Search: Title, description, location, category

🏷️ Smart Category Detection: Auto-classifies seminars, hackathons, workshops

📊 Real-time Stats: Total events, source breakdown

🎨 Fully Responsive UI: Mobile → Desktop perfect

⚡ GraphQL + REST APIs: Both endpoints available

⏰ Auto-refresh: Hourly cron jobs + daily cleanup

🖼️ Rich Events: Images, venues, ticket info, classifications

🏗️ Architecture
text
Ticketmaster API → eventFetcher.js → MongoDB → GraphQL/REST → React Dashboard
       ↓                    ↓                ↓           ↓
  10 keywords         Normalizes         Full-text   Responsive UI
 hourly cron          category/tags      search      w/ filters
🚀 Quick Start
Prerequisites
bash
Node.js 18+
MongoDB (local or Atlas)
Ticketmaster API Key (free)
Eventbrite Token (optional)
1. Clone & Install Backend
bash
cd backend
cp .env.example .env
# Add your keys to .env
npm install
npm start
# → http://localhost:5000/graphql
2. Clone & Install Frontend
bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
3. .env Configuration
text
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/events
TICKETMASTER_KEY=your_ticketmaster_key_here
EVENTBRITE_TOKEN=your_eventbrite_token (optional)
EVENTBRITE_ORG_ID=your_org_id (optional)
PORT=5000

# Frontend (vite.config.js proxy handles this automatically)
📋 API Endpoints
GraphQL
text
http://localhost:5000/graphql
graphql
query {
  events(category: "seminar", limit: 10) {
    title
    date
    category
    imageUrl
  }
  stats {
    total
    bySource {
      _id
      count
    }
  }
}
REST
text
GET  /api/events?search=react&category=hackathon
GET  /api/stats
🛠️ Folder Structure
text
backend/
├── config/          # DB connection
├── models/          # Event schema
├── services/        # API fetchers + cron
├── graphql/         # Schema + resolvers
├── controllers/     # REST controllers
└── routes/          # REST routes

frontend/
├── src/
│   ├── components/  # UI components
│   ├── hooks/       # useEvents custom hook
│   ├── graphql/     # Apollo queries
│   ├── apollo/      # Apollo client
│   └── pages/       # HomePage
🔑 API Keys Setup
Ticketmaster (Required)
developer.ticketmaster.com

Create free account → Get API Key

Add to .env: TICKETMASTER_KEY=your_key

Eventbrite (Optional)
eventbrite.com/platform/api

Account Settings → Developer → API Keys

Get EVENTBRITE_TOKEN + EVENTBRITE_ORG_ID

Only fetches YOUR organization events

📱 Responsive Features
Device	Events Grid	Filters	Search
Mobile	1 column	Stacked	Full width
Tablet	2 columns	2-col	Centered
Laptop	3 columns	4-col	Large
Desktop	4 columns	Full	Max width
🧪 Testing
bash
# Backend health
curl http://localhost:5000/api/events?limit=5

# Frontend (auto-proxied)
curl http://localhost:5173/graphql

# Refresh events
GraphQL mutation { refreshEvents }
🐛 Troubleshooting
Issue	Solution
eventsQuery.data undefined	Update queries.js + no-cache policy
No events	Run refreshEvents mutation + check API keys
"All Categories" empty	Backend resolver fixed (empty string handling)
CORS errors	Vite proxy handles automatically
Invalid dates	Date normalization in formatDate.js
📈 Performance
text
Fetch: 10 keywords × 20 events = 200 events/hour
Search: Fuzzy multi-field regex (<50ms)
Grid: Virtualized + lazy images
Cron: Hourly updates + 90-day cleanup
🔮 Future Enhancements
 Pagination (Load More)

 Map view (Google Maps)

 Eventbrite public search workaround

 User favorites

 Push notifications

 PWA support

🤝 Contributing
Fork repository

Create feature branch

Update code + tests

Submit PR with description

📄 License
MIT License - Free for commercial use.

👨‍💻 Author
Built with ❤️ by Perplexity AI
Deployed Demo | API Docs

EventFlow: Your personal tech event radar 🎯

text
graph TD
    A[Ticketmaster API] --> B[eventFetcher.js]
    C[Eventbrite API] --> B
    B --> D[MongoDB]
    D --> E[GraphQL Resolver]
    D --> F[REST Controller]
    E --> G[React Apollo Client]
    F --> G
    G --> H[Responsive Dashboard]