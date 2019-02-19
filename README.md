# Gram

## How to build

Setup:

+ `yarn install` or `npm install`

Production build:

+ `yarn prod` or `npm run prod`

Development server

+ `yarn serve` or `npm run serve`

## Init production gram on your website
```html
<script defer src="path/to/main.js"></script>
<script>window.onload = function () {window.Gram.initialize({
    title: "[Title of the chat window]",
    name: "[Support agent name]",
    apiKey: "[YOUR APIKEY]"
});}</script>
```

## API

*Open / Close*
`chat.open()`
`chat.close()`
Open and close the window via script.

*Push*
`chat.push(message)`
To put a message into the chat window directly.

*Pull*
`chat.pull()`
Manually refreshes messages.

*Poll*
`chat.poll(ms)`
Set an interval for how often messages should be retrieved from the server in milisecond. Use `0` to turn this feature off. Default is 

*Callbacks*
`chat.callback(cb)`
`chat.clearCallbacks()`

*The message object*
All the messages are stored internally as an object like follows:

```js
{
  id: 1, //The unique ID of your message
  message: "Your message text"
}
```
