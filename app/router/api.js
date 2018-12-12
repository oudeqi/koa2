// router.js
import Router from 'koa-router'
import goods from '../controllers/goods.ctr'
import user from '../controllers/user.ctr'

const router = new Router
router.prefix('/api/v1')

/** user **/
const USER_BASE_URL = '/user'
router.get(USER_BASE_URL + '/info', user.info)
router.get(USER_BASE_URL + '/list', user.list)
router.post(USER_BASE_URL + '/register', user.register)
router.post(USER_BASE_URL + '/login', user.login)
router.post(USER_BASE_URL + '/update', user.update)
router.post(USER_BASE_URL + '/avatar', user.avatar)

router.get(USER_BASE_URL + '/msg/list', user.msgList)

/** goods **/
const GOODS_BASE_URL = '/goods'
router.get(GOODS_BASE_URL, user.validator, goods.find)
router.post(GOODS_BASE_URL, user.validator, goods.add)
router.put(GOODS_BASE_URL, user.validator, goods.update)
router.delete(GOODS_BASE_URL, user.validator, goods.remove)

export default router