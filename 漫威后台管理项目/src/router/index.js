import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const incident = () => import('views/incident')
const incidentY = () => import('views/incidentY')
const incidentN = () => import('views/incidentN')
const tracePoint = () => import('views/tracePoint')
const tracePointY = () => import('views/tracePointY')
const tracePointN = () => import('views/tracePointN')
const shootingLocation = () => import('views/shootingLocation')
const shootingLocationY = () => import('views/shootingLocationY')
const shootingLocationN = () => import('views/shootingLocationN')

  const routes = [
    {
      path:'',
      redirect:'/incident'
    },
    {
      path:'/incident',
      component:incident,
    },
    {
      path:'/incidentY',
      component:incidentY,
    },
    {
      path:'/incidentN',
      component:incidentN,
    },
    {
      path:'/tracePoint',
      component:tracePoint,
    },
    {
      path:'/tracePointY',
      component:tracePointY,
    },
    {
      path:'/tracePointN',
      component:tracePointN,
    },
    {
      path:'/shootingLocation',
      component:shootingLocation,
    },
    {
      path:'/shootingLocationY',
      component:shootingLocationY,
    },
    {
      path:'/shootingLocationN',
      component:shootingLocationN,
    },
]

const router = new VueRouter({
  routes
})

export default router
