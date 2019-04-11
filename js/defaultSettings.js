export default {
  apiKey: "",
  target: "body", // can be '.some-class' or '#some-id'
  locales: {
    title: "Example Support Chat",
    name: "Hans",
    errors: {
      couldNotSend: "Could not send message!",
      couldNotPull: "No connection to server!"
    }
  },
  options: {
    enableAttachment: false,
    activeHours: false, // same as ['00:00', '23:59']
    onInactive: null
  },
  styles: {
    // Available options coming soon
  }
};
