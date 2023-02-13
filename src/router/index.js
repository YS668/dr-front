import VueRouter from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'login',
        meta:{
            title:'易复天天-登录页面'
        },
        component: () => import('../components/Login')
    },
    {
        path:'/Index',
        name:'index',
        component:()=>import('../components/index'),
        redirect:'/Home',
        children:[
            {
                path:'/Home',
                name:'home',
                meta:{
                    title:'易复天天-首页'
                },
                component:()=>import('../components/Home')
            },
            {
                path:'/Data',
                name:'data',
                meta:{
                    title:'易复天天-复盘数据'
                },
                component:()=>import('../components/review/data')
            },
            {
                path:'/North',
                name:'north',
                meta:{
                    title:'易复天天-北向资金'
                },
                component:()=>import('../components/review/north')
            },
            {
                path:'/Up',
                name:'up',
                meta:{
                    title:'易复天天-上涨家数'
                },
                component:()=>import('../components/review/up')
            },
            {
                path:'/UpLimit',
                name:'upLimit',
                meta:{
                    title:'易复天天-涨停股'
                },
                component:()=>import('../components/review/upLimit')
            },
            {
                path:'/Hot',
                name:'hot',
                meta:{
                    title:'易复天天-平台热股'
                },
                component:()=>import('../components/review/hot')
            },
            {
                path:'/Crawing',
                name:'crawing',
                meta:{
                    title:'易复天天-拥挤度'
                },
                component:()=>import('../components/review/crawing')
            },
            {
                path:'/ReviewPlan',
                name:'reviewPlan',
                meta:{
                    title:'易复天天-我的复盘'
                },
                component:()=>import('../components/plan/plan')
            },
            {
                path:'/Write',
                name:'write',
                meta:{
                    title:'易复天天-写复盘'
                },
                component:()=>import('../components/plan/write')
            },
            {
                path:'/MyChoose',
                name:'MyChoose',
                meta:{
                    title:'易复天天-我的自选'
                },
                component:()=>import('../components/plan/myChoose')
            },
            {
                path:'/ReviewArticle',
                name:'reviewArticle',
                meta:{
                    title:'易复天天-复盘文章'
                },
                component:()=>import('../components/article/Article')
            },
            {
                path:'/Forum',
                name:'forum',
                meta:{
                    title:'易复天天-讨论区'
                },
                component:()=>import('../components/forum/forum')
            },
            {
                path:'/Notice',
                name:'notice',
                meta:{
                    title:'易复天天-公告'
                },
                component:()=>import('../components/notice/notice')
            },
            {
                path:'/Recomm',
                name:'recommice',
                meta:{
                    title:'易复天天-建议与反馈'
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

router.beforeEach((to, from, next) => {

    if (to.meta.title) {
  
      document.title = to.meta.title
  
    }
  
    next()
  
  })
  
export default router;