import Vue from 'vue'
import VueRouter from 'vue-router'
import NoTextTilt from '../views/NoTextTilt.vue'
import TextTilt from '../views/TextTilt.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'NoTextTilt',
        component: NoTextTilt
    },
    {
        path: '/text-tilt',
        name: 'TextTilt',
        component: TextTilt
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router