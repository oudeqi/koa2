// router.js
import Router from 'koa-router'
const router = new Router

// index
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

export default router