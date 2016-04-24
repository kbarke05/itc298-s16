var http = require('http');

http.createServer(function(req,res){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello world!');
}).listen(process.env.PORT || 3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');