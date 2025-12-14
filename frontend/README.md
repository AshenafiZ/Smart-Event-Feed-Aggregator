Smart Event Feed Aggregator 🚀
MERN Stack Event Dashboard - Fetches tech events from Ticketmaster + Eventbrite, with fuzzy search, category filters, and responsive UI.

📡 Dual API Integration: Ticketmaster (public) + Eventbrite (private org events)

🔍 Fuzzy Multi-field Search: Title, description, location, category

🏷️ Smart Category Detection: Auto-classifies seminars, hackathons, workshops

📊 Real-time Stats: Total events, source breakdown

🎨 Fully Responsive UI: Mobile → Desktop perfect

⚡ GraphQL + REST APIs: Both endpoints available

⏰ Auto-refresh: Hourly cron jobs + daily cleanup

🖼️ Rich Events: Images, venues, ticket info, classifications

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
EVENTBRITE_TOKEN=your_eventbrite_token 
EVENTBRITE_ORG_ID=your_org_id 
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

eventbrite.com/platform/api

Account Settings → Developer → API Keys

Get EVENTBRITE_TOKEN + EVENTBRITE_ORG_ID

Only fetches YOUR organization events

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
Search: Fuzzy multi-field regex (<50ms)
Grid: Virtualized + lazy images
Cron: Hourly updates + 90-day cleanup

Create feature branch

Update code + tests

Submit PR with description

📄 License
Free for commercial use.

👨‍💻 Author
Built with ❤️ Ashenafi Zewdie

EventFlow 🎯

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
