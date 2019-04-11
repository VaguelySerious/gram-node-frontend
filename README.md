# Gram

![](https://i.imgur.com/WdeYiFx.png)

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
  chat.open();
  // See below for other commands
}
</script>
```

## Available Options

These are the options available to you when initializing the chat.

|Name|Type|Default Value|Description|
|-|-|-|:--|
|apiKey|string|`undefined`|If you use a hosted backend solution you will have received this code on signup. If you are writing your own backend, you can configure this freely.|
|target|string|`"body"`|What the chat should be attached to. Can be used with ids like `"#some-id"` or classes like `".some-class"`.|
|options|object|See below|All configuration options that affect the behavior of the app. This includes enabling/disabling certain features like attachment sending or time based activation of the chat window.|
|locales|object| See below     |All strings used in the chat are localized. Options not provided fall back to English.|
|styles|object|See below|Custom colors and other values for styling the chat window according to your websites theme or personal preference.|



## API

These are the options available to you for interacting the the initialized chat. If you used the example code above, the instance name will be `chat`. All of the following functions are called as instance methods on the created chat object. For example, `chat.open()` can be found in this list as `open`.

|Method|Arguments|Description|
|-|-|-|
|open/close/toggle|none|Controls the visibility state of the chat.|
|push|message: string|Transforms a string into a message and inserts it into the first position of the chat window. Automatically sets unread message count.|
|pull|none|Retrieves new messages from the server.|
| poll              |milliseconds: Number|Set the interval in milliseconds how often the window should check for new messages. Passing `0` will stop polling altogether, until the function is invoked again.|
|callback|callback: Function|Add a function to the callback stack. Each time a message is sent by the user, it will pass through all added callbacks. Callbacks receive a message object that they can directly modify.|
|clearCallbacks|none|Removes all functions from the callback stack.|



## Objects

### Message object
All the messages are stored internally as an object like follows:

```js
{
  id: 1,
  message: "Message text",
  from_client: false,
  timestamp: 1552657082278718700,
  hidden: false
}
```



### Configuration objects

#### Locales

```js
{
    title: "Example Support Chat",
    name: "Hans",
    errors: {
        couldNotSend: "Could not send message!",
        couldNotPull: "No connection to server!"
    }
}
```

#### Options

```js
{
  activeHours: ['00:00', '23:59'], // can be also be "false" to always show the chat
  activeHours: () => {console.log('Inactive')}, // callback called when time outside active hours
  enableAttachment: false // Currently this only enables the button, as the feature is not yet finished
}
```

#### Styles

```js
{
    // Coming in the next version
}
```

