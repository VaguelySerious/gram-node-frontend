// This file contains code that would be inserted by the user.

console.log('Executing test code');
window.onload = function () {
  const chat = window.Gram.initialize({
    title: "Example Support Chat",
    apiKey: TEST_API_KEY
  });
  window.chat = chat;

  // Open the window after 1 second and poll
  chat.poll(3000);
  setTimeout(()=>{
    // chat.open();
    // Then push a reminder after 3 seconds
    setTimeout(()=> {
      chat.push({message: 'Hey how can I help?'});
    }, 3000);
  }, 1000); 
}
