# Gram

A chat window for your website that allows you to write and receive messages from Telegram. You can use this for implementing customer support chats or various other things.

## How to build

Use Yarn or NPM:

+ `yarn install` or `npm install` for setup
+ `yarn prod` or `npm run prod` for building
+ `yarn serve` or `npm run serve` for developing

To use it on your site, you can load the result of the production build like this:

```html
<script defer src="path/to/output/main.js"></script>
<script>
window.onload = function () {
  window.chat = Gram.initialize({
    apiKey: "your-api-key",
    // See below for other available options
  });
}

chat.open();
// See below for other commands
</script>
```

## Available Options

These are the options available to you when initializing the chat.

|Name|Type|Default Value|Description|
|-|-|-|-|
|apiKey|string|undefined|Your API key|
|title|string|"Support Chat"|Title of the chat window|
|name|string|"Support"|Will be shown as `<name> is online` under the title|


## API

These are the options available to you for interacting the the initialized chat.
All of the following are called as instance methods of the chat object. For example, `chat.open()` can be found in this list as `open()`.

|Method|Description|
|-|-|
|open()/close()/toggle()|Controls the visibility state of the chat.|
|push(message: Message)|Puts a message into the chat window.|
|pull()|Retrieves new messages from the server.|
|poll(ms: number)|Set the interval in milliseconds how often the window should check for new messages. Passing `0` will stop polling altogether, until the function is invoked again.|
|callback(cb: Function)|TODO|
|clearCallbacks()|TODO|

## Objects

### Message object
All the messages are stored internally as an object like follows:

```js
{
  id: 1, //The unique ID of your message
  message: "Your message text"
}
```
