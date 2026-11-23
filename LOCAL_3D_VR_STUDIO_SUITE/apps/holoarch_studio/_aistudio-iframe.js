// Sentinel Offline AI Studio Shim
(() => {
  window.API_KEY = window.API_KEY || 'LOCAL_OFFLINE_KEY';
  window.GEMINI_API_KEY = window.GEMINI_API_KEY || 'LOCAL_OFFLINE_KEY';
  window.process = window.process || {};
  window.process.env = window.process.env || {};
  window.process.env.API_KEY = window.API_KEY;
  window.process.env.GEMINI_API_KEY = window.GEMINI_API_KEY;
})();
