import Koa from 'koa'
import body from 'koa-body'
import cors from '@koa/cors'
import process from 'process'
import pg from 'pg'
import redis from 'ioredis'
import {promises as fs} from 'fs'
import path from 'path'

const app = new Koa
//app.context.database = new pg.Pool({user:'postgres', database:'default', password:'pos1gres+', host:'postgrespostgres.postgres.database.azure.com', ssl:true})
app.context.database = new pg.Pool({user:'root', database:'defaultdb', host:'cockroach', port:26257, ssl:{rejectUnauthorized:false, ca:await fs.readFile(path.join(path.dirname(new globalThis.URL(import.meta.url).pathname), 'ca.crt'), 'utf8'), key:await fs.readFile(path.join(path.dirname(new globalThis.URL(import.meta.url).pathname), 'client.root.key'), 'utf8'), cert:await fs.readFile(path.join(path.dirname(new globalThis.URL(import.meta.url).pathname), 'client.root.crt'), 'utf8')}}) 
app.context.cache = new redis.Cluster([{host:'redis'}], {redisOptions:{password:process.env.password}}) //new redis({host:'redis'})  //new redis({host:'redis', family:6})
app.use(body()).use(cors()).use(async ctx =>
{
    if (globalThis.Object.is(ctx.request.path, '/ajax'))
    {
        const body = globalThis.Object.entries(globalThis.JSON.parse(ctx.request.body)).map(_ => _.join(' ')).join(' ')
        let records = await ctx.cache.get(body)
        if (!records)
        {
            records = globalThis.JSON.stringify((await ctx.database.query(`select * from${body}`)).rows)
            ctx.cache.set(body, records)
        }
        ctx.response.body = records
    }
}).listen(80)
/*process.on('SIGTERM', async () =>
{
    app.context.wss.close()
    await app.context.database.end()
    server.close()
})*/
