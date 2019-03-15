// This file contains code that would be inserted by the user.

console.log("Executing test code");
window.onload = function() {
  const chat = window.Gram.initialize({
    title: "Example Support Chat",
    apiKey: TEST_API_KEY,
    name: "Hans",
    enableAttachment: false
  });
  window.chat = chat;

  setTimeout(() => {
    chat.push("Hey how can I help?");
  }, 1000);
  setTimeout(() => {
    chat.open();
  }, 3000);
};
