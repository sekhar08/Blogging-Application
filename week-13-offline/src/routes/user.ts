import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>()


userRouter.post('/signup', async(c) => {
  
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
  
  
  userRouter.post('/signin', async (c) => {
    
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