const cron = require('node-cron');
const { fetchAndSaveEvents } = require('../services/eventFetcher');

const startCronJobs = () => {
  // Hourly fetch
  cron.schedule('0 * * * *', async () => {
    console.log('⏰ Running scheduled event fetch...');
    await fetchAndSaveEvents();
  });

  // Daily cleanup of old events (older than 90 days)
  cron.schedule('0 2 * * *', async () => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 90);
    
    const deleted = await Event.deleteMany({ date: { $lt: cutoff } });
    console.log(`🧹 Cleaned up ${deleted.deletedCount} old events`);
  });

  console.log('✅ Cron jobs scheduled');
};

module.exports = startCronJobs;
