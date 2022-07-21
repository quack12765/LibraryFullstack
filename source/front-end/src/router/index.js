import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Main = () => import('@/views/Main')
const MainMain = () => import('@/views/MainMain')
const MainSearch = () => import('@/views/MainSearch')
const AccountManage = () => import('@/views/AccountManage')
const AccountSetting = () => import('@/views/AccountSetting')
const PasswordSetting = () => import('@/views/PasswordSetting')
const BookDetail = () => import('@/views/BookDetail')

const AdminMain = () => import('@/views/AdminMain')


// Dashboard

// Views - Pages
const Page401 = () => import('@/views/pages/Page401')
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

Vue.use(Router)

const router = new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        let account = sessionStorage.getItem('ACCOUNT')
        let role = sessionStorage.getItem('ROLE')
        //console.log(`account=${account}, role=${role}`)

        if ((to.path === '/account-manage') && role !== 'admin') {
            next({ path: '/401' })
        } else if (!account || !role) {
            next({ path: '/pages/login' })
        } else {
            next()
        }
    } else {
        next() // 確保一定要調用 next()
    }
})

function configRoutes() {
    return [
        {
            path: '/',
            redirect: '首頁',
            name: '首頁',
            component: TheContainer,
            children: [
                {
                    path: 'Main',
                    name: '#',
                    component: Main,
                    children: [
                        {
                            path: 'Main',
                            name: '首頁',
                            component: MainMain,
                        },
                        {
                            path: 'search/:name?',
                            name: '搜尋結果',
                            component: MainSearch,
                            // redirect: "main"
                        },
                        {
                            path: 'admin-main',
                            name: '管理者首頁',
                            component: AdminMain,
                        },
                    ],
                    meta: { requiresAuth: true }
                },
                {
                    path: 'my-account',
                    name: '帳號管理',
                    component: AccountManage,
                    meta: { requiresAuth: true }
                },
                {
                    path: 'book/:ISBN',
                    name: '書籍一覽',
                    component: BookDetail,
                    meta: { requiresAuth: true }
                },
                {
                    path: 'account-setting',
                    name: '帳號設定',
                    component: AccountSetting,
                },
                {
                    path: 'password-setting',
                    name: '密碼設定',
                    component: PasswordSetting,
                },
            ]
        },
        {
            path: '/pages',
            redirect: '/pages/404',
            name: 'Pages',
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: '401',
                    name: 'Page401',
                    component: Page401
                },
                {
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                }
            ]
        },
        {
            path: '/*',
            redirect: '/pages/login'
        }
    ]
}

export default router
