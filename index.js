import "./styles/chat.scss";
// import "./styles/demo.scss";
import GramChatTemplate from "./components/gram.html";
import { getUserID, objectFallback } from "./js/utils.js";
import defaultSettings from "./js/defaultSettings.js";

// Provide endpoint for initializing Gram
window.Gram = {
  initialize: function(settings) {
    settings = objectFallback(settings, defaultSettings);
    const instance = new GramChatTemplate({
      target: settings.target,
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
    return instance;
  }
};
