# Next.js with Redis
       
##A sample web application which uses Redis as state store in Next.js application.

##See the [tutorial](https://docs.upstash.com/tutorials/nextjs_with_redis) for details.

First, do the usual... yada yada.. git clone... git branch....


Create an Upstash account, Create a database, and get your ioredis url from "REDIS CONNECT" button.


Then, you may seed your Upstash Redis with preexisting data by running:


`cd lib/redis`


`node seedDatabase.js`


###*IMPORTANT*: decomment the seedProduct() function at line 101 first, and comment the getProduct().


To run the code, use


`npm run dev`


in the root.

