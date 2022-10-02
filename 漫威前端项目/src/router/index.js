import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const view1 = () => import('views/View1/view1')
const view2 = () => import('views/View2/view2')
const view3 = () => import('views/View3/view3')
const view4 = () => import('views/View4/view4')
const first = () => import('views/first')

const chart1 = () => import('views/chartView/chart1')
const chart2 = () => import('views/chartView/chart2')
const chart3 = () => import('views/chartView/chart3')
const chart4 = () => import('views/chartView/chart4')

  const routes = [
    {
      path:'',
      redirect:'/mainPanel'
    },
    {
      path:'/mainPanel',
      component:first,
    },
    {
      path:'/view1',
      component:view1,
    },
    {
      path:'/view2',
      component:view2,
    },
    {
      path:'/view3',
      component:view3,
    },
    {
      path:'/view4',
      component:view4,
    },
    {
      path:'/chart1',
      component:chart1,
    },
    {
      path:'/chart2',
      component:chart2,
    },
    {
      path:'/chart3',
      component:chart3,
    },
    {
      path:'/chart4',
      component:chart4,
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
