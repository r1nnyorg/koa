https://cnodejs.org/topic/56e3be21f5d830306e2f0fd3

https://cnodejs.org/topic/5716137fe84805cd5410ea21

通过2.2节我们可以知道，执行js代码只有两个时机：

刚启动的时候执行app.js文件

异步回调函数被触发（注意回调函数有可能是被同步回调的）

docker network create backend<br>
docker run -d --name postgres --network backend chaowenguo/postgres<br>
docker run -d --name redis --network backend redis<br>
docker run -d --name web --network backend chaowenguo/koa<br>
docker run -d --name chat --network backend chaowenguo/chat:koa<br>
docker run -d --name nginx --network backend -p 443:443 -v /etc/letsencrypt/live/chaowenguo.eu.org:/encrypt:ro chaowenguo/nginx

docker network create --ipv6 --subnet fd10::/64 koa<br>
docker run -d --name postgres --network koa chaowenguo/postgres<br>
docker run -d --name redis --network koa redis<br>
docker run -d --name web --network koa chaowenguo/koa<br>
docker run -d --name chat --network koa chaowenguo/chat:koa<br>
docker run -d --name ingress --network koa -p 443:443 -v /etc/letsencrypt/live/chaowenguo.eu.org:/encrypt:ro chaowenguo/ingress<br>
docker system prune -a

curl -d '{"":"productItem","limit":5,"offset":5}' -H 'Content-Type: text/plain' https://backend.chaowenguo.eu.org/web/ajax
