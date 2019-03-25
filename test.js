// This file contains code that would be inserted by the user.
window.onload = function() {
  const chat = window.Gram.initialize({
    apiKey: TEST_API_KEY
  });
  window.chat = chat;

  setTimeout(() => {
    chat.push("Hey how can I help?");
  }, 1000);
  setTimeout(() => {
    // chat.open();
  }, 3000);
};
