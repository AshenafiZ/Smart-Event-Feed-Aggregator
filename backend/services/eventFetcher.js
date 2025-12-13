const axios = require('axios');
const Event = require('../models/Event');

const KEYWORDS = [
  'seminar', 'conference', 'workshop', 'tech', 'webinar', 
  'summit', 'meetup', 'hackathon', 'developer', 'javascript'
];

const fetchAndSaveEvents = async () => {
  console.log('🔄 Starting event fetch from Ticketmaster...');
  const allEvents = new Set();

  for (const keyword of KEYWORDS) {
    try {
      console.log(`🔍 Searching: "${keyword}"`);
      const tmUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
      const tmParams = {
        apikey: process.env.TICKETMASTER_KEY,
        keyword,
        size: 20,
        sort: 'date,asc',
        countryCode: 'US'
      };

      const response = await axios.get(tmUrl, { params: tmParams });
      
      if (response.data._embedded?.events) {
        response.data._embedded.events.forEach(event => {
          const normalized = normalizeTicketmasterEvent(event);
          allEvents.add(JSON.stringify(normalized));
        });
        console.log(`✅ ${response.data._embedded.events.length} events from "${keyword}"`);
      }
    } catch (error) {
      console.error(`❌ "${keyword}" failed:`, error.response?.data?.errors?.[0]?.message || error.message);
    }

    await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
  }

  const events = Array.from(allEvents).map(JSON.parse);
  
  if (events.length > 0) {
    let savedCount = 0;
    for (const event of events) {
      const result = await Event.findOneAndUpdate(
        { eventId: event.eventId },
        { 
          ...event,
          updatedAt: new Date()
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      savedCount++;
    }
    console.log(`💾 Saved/updated ${savedCount} events! Total in DB: ${await Event.countDocuments()}`);
    return savedCount;
  }
  
  console.log('⚠️ No new events this run');
  return 0;
};

// Add event type detection
const normalizeTicketmasterEvent = (event) => {
  const venue = event._embedded?.venues?.[0];
  const firstImage = event.images?.find(img => img.ratio === '16_9' && img.width >= 640) || event.images?.[0];
  const primaryClassification = event.classifications?.find(c => c.primary) || event.classifications?.[0];

  // ✅ SMART CATEGORY DETECTION
  const detectCategory = (eventData) => {
    const keywords = eventData.name.toLowerCase();
    const genre = primaryClassification?.genre?.name?.toLowerCase() || '';
    
    if (keywords.includes('seminar') || genre.includes('seminar')) return 'seminar';
    if (keywords.includes('hackathon') || keywords.includes('hack')) return 'hackathon';
    if (keywords.includes('workshop')) return 'workshop';
    if (keywords.includes('conference')) return 'conference';
    if (keywords.includes('webinar')) return 'webinar';
    if (keywords.includes('meetup')) return 'meetup';
    if (keywords.includes('tech') || genre.includes('tech')) return 'tech';
    
    return genre || 'general';
  };
  return {
    eventId: `tm_${event.id}`,
    title: event.name,
    description: event.pleaseNote || event.info || event.description || 'No description',
    date: new Date(event.dates.start.dateTime || event.dates.start.localDate),
    location: venue?.name || 'TBD',
    source: 'Ticketmaster',
    url: event.url,
    imageUrl: firstImage?.url || '',
    category: detectCategory(event),
    classifications: [{
      segment: primaryClassification?.segment?.name || '',
      genre: primaryClassification?.genre?.name || '',
      subGenre: primaryClassification?.subGenre?.name || ''
    }],
    venueName: venue?.name,
    city: venue?.city?.name,
    status: event.dates.status?.code || 'unknown',
    ticketLimit: event.ticketLimit?.info || '',
    pleaseNote: event.pleaseNote || ''
  };
  
};

module.exports = { fetchAndSaveEvents };
