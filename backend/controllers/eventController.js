const Event = require('../models/Event');

const getEvents = async (req, res) => {
    
  try {
    const { search, source, city, startDate, endDate, limit = 50 } = req.query;
    
    let query = {};
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (source) {
      query.source = source;
    }
    if (city) {
      query.$or = [
        { location: { $regex: city, $options: 'i' } },
        { 'city': { $regex: city, $options: 'i' } }
      ];
    }
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    console.log('Query:', query);

    const events = await Event.find(query)
      .sort({ date: 1 })
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const total = await Event.countDocuments();
    const bySource = await Event.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      total,
      bySource
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getEvents, getStats };
