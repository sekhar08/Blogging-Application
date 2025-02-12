import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()


app.post('/api/v1/user/signup', async(c) => {
  
  const body = await c.req.json()
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try{

  const payload = await prisma.user.create({
    data:{
      username: body.username,
      password: body.password,
      name: body.name
    }
  })
  
  const jwt = await sign({
    id:payload.id
  },c.env.JWT_SECRET)
    return c.text(jwt)
}

catch(e){
    c.status(411)
    return c.text("Invalid req / something went wrong!!")
}
})


app.post('/api/v1/user/signin', async (c) => {
  
  const body = await c.req.json()
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try{

  const payload = await prisma.user.findUnique({
    where:{
      username: body.username,
      password: body.password,
    }
  })

  if(!payload){
    c.status(403);
    return c.json({
      "error": "Invalid credentials"
    })
  }
  
  const jwt = await sign({
    id:payload.id
  },c.env.JWT_SECRET)
    return c.text(jwt)
}

catch(e){
    c.status(411)
    return c.text("Invalid req / something went wrong!!")
}
})


app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})


app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})


app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})


app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})






export default app
