import Koa from 'koa'
import proxy from 'koa-http2-proxy'
import https from 'https'
import {promises as fs} from 'fs'

const app = new Koa
app.use(proxy('/web', {target:'http://web', pathRewrite:{'/web/ajax':'/ajax'}}))
app.use(proxy('/chat', {target:'http://chat', pathRewrite:{'/chat/ws':'/ws'}}))
https.createServer({key:await fs.readFile('/encrypt/privkey.pem'), cert:await fs.readFile('/encrypt/fullchain.pem')}, app.callback()).listen(443)
