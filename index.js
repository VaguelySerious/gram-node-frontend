import "./styles/chat.scss";
// import "./styles/demo.scss";
import GramChatTemplate from "./components/gram.html";
import { getUserID, objectFallback, isActiveHours } from "./js/utils.js";
import defaultSettings from "./js/defaultSettings.js";

// Provide endpoint for initializing Gram
window.Gram = {
  initialize: function(settings) {
    settings = objectFallback(settings, defaultSettings);
    console.log(settings)
    // Disable chat if not in active Hours
    if (!isActiveHours(settings.options.activeHours)) {
      if (settings.options.onInactive) {
        settings.options.onInactive();
      }
      return;
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
