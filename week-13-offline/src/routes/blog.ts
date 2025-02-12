import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>()

blogRouter.use('/*',(c) => {
    next()
})
  

blogRouter.post('/', async(c) => {

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

   const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: 1
        }
    })

    return c.json({
        id:blog.id
    })
  })
  
  

blogRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const blog = await prisma.blog.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content
        }
    })

    return c.json({
       id: blog.id
    })
  })
  

blogRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

try{
    const blog = await prisma.blog.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        blog
    })
}

catch(e){
    c.status(411)
    return c.text("Invalid operation")
}

  })
  

 //Todo: add pagination
blogRouter.get("/bulk", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
       }).$extends(withAccelerate())

       const blogs = prisma.blog.findMany()
       return c.json({
        blogs
       })
})