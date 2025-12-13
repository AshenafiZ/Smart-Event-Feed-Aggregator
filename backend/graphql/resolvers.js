const Event = require('../models/Event');
const { fetchAndSaveEvents } = require('../services/eventFetcher');

const resolvers = {
  Query: {
    events: async (_, { search, category, source, limit = 50 }) => {
      console.log('🔍 RESOLVER INPUT:', { search, category, source, limit }); // DEBUG
      
      let match = {};

      // ✅ FUZZY SEARCH (multi-field)
      if (search && search.trim() !== '') {
        match.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { pleaseNote: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }

      // ✅ PERFECT CATEGORY HANDLING (empty = ALL events)
      if (category && category.trim() !== '') {
        match.category = { $regex: category, $options: 'i' };
      }

      // ✅ SOURCE HANDLING (empty = ALL sources)
      if (source && source.trim() !== '') {
        match.source = source;
      }

      console.log('🔍 FINAL MATCH:', match); // DEBUG
      
      const result = await Event.find(match)
        .sort({ date: 1 })
        .limit(Number(limit));
      
      console.log('📊 EVENTS RETURNED:', result.length); // DEBUG
      return result;
    },

    event: async (_, { eventId }) => {
      return await Event.findOne({ eventId });
    },

    stats: async () => {
      const total = await Event.countDocuments();
      const bySource = await Event.aggregate([
        { $group: { _id: '$source', count: { $sum: 1 } } }
      ]);
      return { total, bySource };
    }
  },

  Mutation: {
    refreshEvents: async () => {
      await fetchAndSaveEvents();
      return true;
    }
  }
};

module.exports = resolvers;
