import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'
import { auth } from "hono/utils/basic-auth";


export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables: {
        userId: any;
    }
  }>();

blogRouter.use('/*',async (c,next) => {
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader,c.env.JWT_SECRET);

    if(user){
        c.set("userId", user.id);
        await next()
    }
    else{
        c.status(403)
        return c.json({
            message: "You are not logged in"
        })
    }
})
  

blogRouter.post('/', async(c) => {

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const userId = await c.get("userId")

   const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: Number(userId)
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


   //Todo: add pagination
blogRouter.get("/bulk", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
       }).$extends(withAccelerate())

       const blogs = await prisma.blog.findMany({
        select:{
            title: true,
            content: true,
            id: true,
            author: {
                select:{
                    name: true
                }
            }
        }
       });
    
       return c.json({
        blogs
       })
})
  

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = await c.req.param("id");

try{
    const blog = await prisma.blog.findFirst({
        where:{
            id: Number(id)
        },
        select:{
            id: true,
            title: true,
            content: true,
            author:{
                select:{
                    name:true
                }
            }
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