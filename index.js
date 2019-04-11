import "./styles/chat.scss";
// import "./styles/demo.scss";
import GramChatTemplate from "./components/gram.html";
import { getUserID, objectFallback, getTimeFromHours, timeWithin } from "./js/utils.js";
import defaultSettings from "./js/defaultSettings.js";

// Provide endpoint for initializing Gram
window.Gram = {
  initialize: function(settings) {
    settings = objectFallback(settings, defaultSettings);
    const activeHours = settings.options.activeHours;
    if (Array.isArray(activeHours) && activeHours.length === 2 && activeHours.reduce((a, acc) => a && acc, true)) {
      const hoursFromTo = activeHours.map(getTimeFromHours);
      if (!timeWithin(hoursFromTo[0], hoursFromTo[1])) {
        const callbackOnInactive = settings.options.onInactive;
        if (callbackOnInactive) callbackOnInactive();
        return;
      }
    }
    const instance = new GramChatTemplate({
      target: document.querySelector(settings.target),
      data: {
        apiKey: settings.apiKey,
        options: settings.options,
        locales: settings.locales,
        styles: settings.styles,
        user: getUserID(),
        open: false,
        sending: false,
        messages: {},
        callbacks: [],
        lastID: 1,
        unreadMessages: 0,
        baseURL: BASE_URL
      }
    });
    instance.pull();
    // instance.signal({message: 'load'});
    window.addEventListener('beforeunload', () => {
      if (instance.get().inv) {
        instance.signal({message: 'unload', hidden: true}, false);
      }
    });
    return instance;
  }
};
