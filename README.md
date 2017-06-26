## Chat Exercise

#### Installing the repo

```js
git clone https://github.com/dekkofilms/Chat-Exercise.git

npm i

npm start
```

#### This is a little bit of the journey.

I really enjoyed hacking away on this mini exercise and challenge. I started by just reading over and over again the challenge itself and white boarding out the input paired with the corresponding output. It helps me to just map out the expectations, and allows me to double check that I'm not forgetting anything I'm suppose to accomplish.

I started the project with a tiny input box and a div container for presenting the outputs. After reading through the challenge, I had a pretty good idea on how I was going to create the output needed. What did take some more care and attention was retrieving the title of the HTML document of a link provided, and waiting for that fetch to happen before the output was being displayed. I had a few other approaches that didn't seem to work out as well or efficiently, before I came to the conclusion of using promises. And even then, I refactored how the promise array was stored to help with the runtime.

After I had accomplished the input/output challenge, I wanted to make the UI feel slightly more like a chat box. My two main goals in that was 1) allow the input box to expand when the text goes to another line, and 2) display the messages how they would normally be presented in a chat UI, and keep the scroll bar down when new messages are being entered.

Would love to answer anymore questions that you may have in regards to this exercise!
