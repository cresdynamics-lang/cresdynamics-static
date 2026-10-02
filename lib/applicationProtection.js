const protections = {
  dailyUploads: new Map(),
  recentApps: new Map(),
  
  cleanup() {
    setInterval(() => {
      const now = Date.now();
      for (const [key, timestamps] of protections.recentApps) {
        protections.recentApps.set(key, timestamps.filter(t => now - t < 60000));
        if (protections.recentApps.get(key).length === 0) {
          protections.recentApps.delete(key);
        }
      }
      for (const key of protections.dailyUploads.keys()) {
        if (key.includes('|')) {
          const datePart = key.split('|')[1];
          const date = new Date(datePart);
          if (now - date.getTime() > 86400000) {
            protections.dailyUploads.delete(key);
          }
        }
      }
    }, 3600000);
  },

  checkDailyFileLimit(email, uploadedFileCount = 1) {
    const today = new Date().toISOString().split('T')[0];
    const key = email.toLowerCase() + '|' + today;
    const currentCount = protections.dailyUploads.get(key) || 0;
    if (currentCount + uploadedFileCount > 5) {
      return {
        allowed: false,
        reason: 'File upload limit exceeded. Maximum 5 files per day.',
        current: currentCount,
        limit: 5
      };
    }
    protections.dailyUploads.set(key, currentCount + uploadedFileCount);
    return { allowed: true, current: currentCount + uploadedFileCount };
  },

  checkDuplicateSubmission(email, endpoint) {
    const key = email.toLowerCase() + '|' + endpoint;
    const now = Date.now();
    const timestamps = protections.recentApps.get(key) || [];
    const recentSubmission = timestamps.find(t => now - t < 60000);
    if (recentSubmission) {
      return {
        isDuplicate: true,
        reason: 'Duplicate submission detected. Please wait before resubmitting.',
        lastSubmission: new Date(recentSubmission)
      };
    }
    return { isDuplicate: false };
  },

  recordSubmission(email, endpoint) {
    const key = email.toLowerCase() + '|' + endpoint;
    const now = Date.now();
    const timestamps = protections.recentApps.get(key) || [];
    timestamps.push(now);
    protections.recentApps.set(key, timestamps);
  },

  checkRateLimit(email, endpoint) {
    const key = email.toLowerCase() + '|' + endpoint;
    const now = Date.now();
    const recentTimestamps = (protections.recentApps.get(key) || []).filter(t => now - t < 60000);
    if (recentTimestamps.length >= 3) {
      return {
        allowed: false,
        reason: 'Too many submissions. Maximum 3 per minute.',
        count: recentTimestamps.length,
        limit: 3
      };
    }
    return { allowed: true, count: recentTimestamps.length };
  },

  protectFileUpload() {
    return async (req, res, next) => {
      const email = (req.body.email || '').trim().toLowerCase();
      if (!email) {
        return res.status(400).json({ error: 'Email required' });
      }
      
      const uploadedCount = req.files 
        ? Object.values(req.files).reduce((sum, files) => sum + (Array.isArray(files) ? files.length : 1), 0)
        : (req.file ? 1 : 0);
      
      if (uploadedCount > 0) {
        const dailyCheck = protections.checkDailyFileLimit(email, uploadedCount);
        if (!dailyCheck.allowed) {
          return res.status(429).json({ error: dailyCheck.reason });
        }
      }
      
      const dupCheck = protections.checkDuplicateSubmission(email, req.path);
      if (dupCheck.isDuplicate) {
        return res.status(429).json({ error: dupCheck.reason });
      }
      
      const rateCheck = protections.checkRateLimit(email, req.path);
      if (!rateCheck.allowed) {
        return res.status(429).json({ error: rateCheck.reason });
      }
      
      protections.recordSubmission(email, req.path);
      next();
    };
  },

  protectApplication() {
    return async (req, res, next) => {
      const email = (req.body.email || '').trim().toLowerCase();
      if (!email) {
        return res.status(400).json({ error: 'Email required' });
      }
      
      const dupCheck = protections.checkDuplicateSubmission(email, req.path);
      if (dupCheck.isDuplicate) {
        return res.status(429).json({ error: dupCheck.reason });
      }
      
      const rateCheck = protections.checkRateLimit(email, req.path);
      if (!rateCheck.allowed) {
        return res.status(429).json({ error: rateCheck.reason });
      }
      
      protections.recordSubmission(email, req.path);
      next();
    };
  }
};

protections.cleanup();
module.exports = protections;
