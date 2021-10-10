import Koa from 'koa'
import {WebSocketServer} from 'ws'

const app = new Koa
const server = app.listen(80)
app.context.wss = new WebSocketServer({server, path:'/ws'})
app.context.wss.on('connection', ws =>
{
    ws.onmessage = message => 
    {
        message = message.data
        if (globalThis.Object.is(ws.name, undefined))
        {
            ws.name = message
            for (const _ of app.context.wss.clients)
                if (!globalThis.Object.is(_, ws)) _.send(globalThis.JSON.stringify({join:'', name:ws.name}))
        }
        else
        {
            message = globalThis.JSON.parse(message)
            if ('' in message)
            {
                for (const _ of app.context.wss.clients)
                    if (!globalThis.Object.is(_, ws)) _.send(globalThis.JSON.stringify({'':message[''], name:ws.name}))
            }
            else if ('offer' in message)
            {
                for (const _ of app.context.wss.clients)
                    if (globalThis.Object.is(_.name, message.name)) _.send(globalThis.JSON.stringify({offer:message.offer, name:ws.name}))
            }
            else if ('answer' in message)
            {
                for (const _ of app.context.wss.clients)
                    if (globalThis.Object.is(_.name, message.name)) _.send(globalThis.JSON.stringify({answer:message.answer}))
            }
            else if ('candidate' in message)
            {
                for (const _ of app.context.wss.clients)
                    if (globalThis.Object.is(_.name, message.name)) _.send(globalThis.JSON.stringify({candidate:message.candidate}))
            }
        }
    }
    ws.onclose = () =>
    {
        for (const _ of app.context.wss.clients) _.send(globalThis.JSON.stringify({disconnect:'', name:ws.name}))
    }
})
