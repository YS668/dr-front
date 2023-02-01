import VueRouter from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/Login')
    },
    {
        path:'/Index',
        name:'index',
        component:()=>import('../components/index'),
        redirect:'/Data',
        children:[
            {
                path:'/Home',
                name:'home',
                meta:{
                    title:'首页'
                },
                component:()=>import('../components/Home')
            },
            {
                path:'/Data',
                name:'data',
                meta:{
                    title:'复盘数据'
                },
                component:()=>import('../components/review/data')
            },
            {
                path:'/North',
                name:'north',
                meta:{
                    title:'北向资金'
                },
                component:()=>import('../components/review/north')
            },
            {
                path:'/Up',
                name:'up',
                meta:{
                    title:'上涨家数'
                },
                component:()=>import('../components/review/up')
            },
            {
                path:'/UpLimit',
                name:'upLimit',
                meta:{
                    title:'涨停股'
                },
                component:()=>import('../components/review/upLimit')
            },
            {
                path:'/ReviewPlan',
                name:'reviewPlan',
                meta:{
                    title:'复盘计划'
                },
                component:()=>import('../components/plan/plan')
            },
            {
                path:'/ReviewArticle',
                name:'reviewArticle',
                meta:{
                    title:'复盘文章'
                },
                component:()=>import('../components/')
            },
            {
                path:'/Forum',
                name:'forum',
                meta:{
                    title:'讨论区'
                },
                component:()=>import('../components/forum/forum')
            },
            {
                path:'/Notice',
                name:'notice',
                meta:{
                    title:'建议与反馈'
                },
                component:()=>import('../components/notice/notice')
            },
            {
                path:'/Recomm',
                name:'recommice',
                meta:{
                    title:'建议与反馈'
                },
                component:()=>import('../components/recomm/recomm')
            },
            
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;