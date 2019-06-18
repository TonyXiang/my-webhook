# my-webhook

## 1. Add Webhook in Github settings of the repository
- set *Payload URL* : `https://example.com/webhook`
- choose *Content type* : `application/json`
- set Secret: `123456`

## 2. Clone the repository in your server
```
git clone https://github.com/TonyXiang/my-webhook.git

cd my-webhook

npm install
```

## 3. Add secret file
add `secret.js` in path `my-webhook/` just like this:
```
module.exports = '123456' // The secret you've defined in Github Webhook
```

## 4. Start service
```
node index.js
```

