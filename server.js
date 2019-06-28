const http = require('http')
const fs = require('fs')

function doOnRequest(request, response) {
  // Send back a message saying "Welcome to Twitter"
  // code here...
  // response.end("yo")
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...
    // fs.createReadStream()
    const index = fs.readFileSync('./index.html', 'utf8')
    response.end(index)
  } else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    fs.appendFileSync('hi_log.txt', `Somebody said hi.\n`)

    response.end('Hi back to you')
  } else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    let res = ''
    request.on('data', chunk => {
      res += chunk
    })

    request.on('end', () => {
      fs.appendFileSync('hi_log.txt', res)

      if (res === 'hello') {
        response.end('hello there!')
      } else if (res === "what's up") {
        response.end('the sky')
      } else {
        response.end('good morning!')
      }
    })
  } else if (request.method === 'GET' && request.url === '/style.css') {
    const styles = fs.readFileSync('./style.css')
    response.end(styles)
  } else {
    // Handle 404 error: page not found
    // code here...
    response.writeHead('404')
    response.end('Error: Not Found')
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000)
