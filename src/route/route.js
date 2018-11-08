import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../components/Admin'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Menu from '../components/Menu'
import About from '../components/about/About'
import Contact from '../components/about/Contact'
import Delivery from '../components/about/Delivery'
import History from '../components/about/History'
import OrderingGuide from '../components/about/OrderingGuide'
import Phone from '../components/about/Phone'
import Email from '../components/about/Email'

Vue.use(VueRouter)

export const routes = [
    {path:'/home',components:{
        default:Home,
        'orderingGuide':OrderingGuide,
        'delivery':Delivery,
        'history':History
    }},
    {path:'/',redirect:'/login'},
    {path:'/admin',component:Admin},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/menu',component:Menu},
    {path:'/about',redirect:'/about/contact',component:About,children:[
        {path:'/about/contact',redirect:'/about/contact/phone',name:'contactLink',component:Contact,children:[
            {path:'/about/contact/phone',name:'phoneLink',component:Phone},
            {path:'/about/contact/email',name:'emailLink',component:Email},
        ]},
        {path:'/about/delivery',name:'deliveryLink',component:Delivery},
        {path:'/about/history',name:'historyLink',component:History},
        {path:'/about/orderingGuide',name:'orderingGuideLink',component:OrderingGuide},
    ]},
    {path:'*',redirect:'/'}
]