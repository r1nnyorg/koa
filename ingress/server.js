import Koa from 'koa'
import proxy from 'koa-http2-proxy'
import https from 'https'
import {promises as fs} from 'fs'

const app = new Koa
app.use(proxy('/web', {target:'http://web', pathRewrite:(path, req) => path.replace('/web', '')}))
app.use(proxy('/chat', {target:'http://chat', pathRewrite:(path, req) => path.replace('/chat', ''), ws:true}))
https.createServer({key:await fs.readFile('/encrypt/privkey.pem', 'utf8'), cert:await fs.readFile('/encrypt/fullchain.pem', 'utf8')}, app.callback()).listen(443)
