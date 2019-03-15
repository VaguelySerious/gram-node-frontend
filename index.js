import "./styles/chat.scss";
import "./styles/demo.scss";
import GramChatTemplate from "./components/gram.html";
import { getUserID } from "./js/utils.js";

// Provide endpoint for initializing Gram
window.Gram = {
  initialize: function(options) {
    // Create chat with user options
    const instance = new GramChatTemplate({
      target: options.target || document.querySelector("body"),
      data: {
        options,
        user: getUserID(),
        apiKey: options.apiKey,
        open: false,
        messages: {},
        callbacks: [],
        sending: false,
        lastID: 1,
        unreadMessages: 0,
        baseURL: BASE_URL
      }
    });
    instance.pull();
    return instance;
  }
};
