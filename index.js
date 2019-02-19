import './styles/chat.scss';
import './styles/demo.scss';
import GramChatTemplate from './components/gram.html'
import uuidv4 from 'uuid/v4';

// Provide endpoint for initializing Gram
window.Gram = {
  initialize: function (options) {
    // Cache UUID in LocalStorage
    let user;
    try {
      user = localStorage.getItem('user');
      if (user) {

        console.log('Remembered user', user);
      } else {
        user = uuidv4();
        localStorage.setItem('user', user);
        console.log('Created new user', user);
      }
    } catch (e) {
      user = uuidv4();
      console.log('Created temporary user (check if site allows localStorage)');
    }
    // Create chat with user options
    const instance = new GramChatTemplate({
      target: document.querySelector('body'),
      data: {
        options,
        user,
        apiKey: options.apiKey,
        open: false,
        messages: [],
        callbacks: [],
        sending: false,
        lastID: 1,
        baseURL: BASE_URL
      }
    });
    instance.poll(500);
    window.gramchat = instance;
  }
};


// Hot loading quickfix
if (module.hot) {
  module.hot.accept('./index.js', function() {});
}
