import Koa from 'koa'
import proxy from 'koa-http2-proxy'
import https from 'https'
const app = new Koa
app.use(proxy({ target: 'http://www.example.org' })).use(proxy)
https.createServer({key:fs.readFileSync('/encrypt/privkey.pem'), cert:fs.readFileSync('/encrypt/fullchain.pem')}, app.callback()).listen(443)
