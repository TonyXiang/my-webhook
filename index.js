var http = require('http')
var createHandler = require('github-webhook-handler')
var fs = require('fs')
var mySecret = require('./secret')
var handler = createHandler({ path: '/webhook', secret: mySecret })

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn
  var child = spawn(cmd, args)
  var resp = ''

  child.stdout.on('data', function(buffer) { resp += buffer.toString()})
  child.stdout.on('end', function() { callback (resp) })
}

function main () {
  http.createServer(function (req, res) {
    handler(req, res, function (err) {
      res.statusCode = 404
      res.end('no such location')
    })
  }).listen(7777)

  handler.on('error', function (err) {
    console.error('Error:', err.message)
  })

  handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
      event.payload.repository.name,
      event.payload.ref)
    const filePath = '../' + event.payload.repository.name + '/deploy.sh'

    fs.existsSync('../' + event.payload.repository.name, function (exists) {
      if (exists) {
        run_cmd('sh', ['./update.sh', event.payload.repository.name], function(text){ console.log(text) })
      } else {
        run_cmd('sh', ['./clone.sh', event.payload.repository.git_url], function(text){ console.log(text) })
      }
    })

    fs.existsSync(filePath,function(exists){
      if(exists){
        fs.chmodSync(filePath, 7)
        run_cmd('sh', ['../' + event.payload.repository.name + '/deploy.sh'], function(text){ console.log(text) })
      }
    })
  })

  // handler.on('issues', function (event) {
  //   console.log('Received an issue event for %s action=%s: #%d %s',
  //     event.payload.repository.name,
  //     event.payload.action,
  //     event.payload.issue.number,
  //     event.payload.issue.title)
  // })
}

main()


