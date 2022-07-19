export const admin = [
    {
        _name: 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavItem',
                name: '首頁',
                to: '/main/main',
                icon: 'cil-home',
            },
            {
                _name: 'CSidebarNavItem',
                name: '會員專區',
                to: '/my-account',
                icon: 'cil-people'
            },
            {
                _name: 'CSidebarNavItem',
                name: 'book test',
                to: '/account-setting',
                icon: 'cil-people'
            },
            {
                _name: 'CSidebarNavItem',
                name: '登出',
                to: '/pages/login',
                icon: 'cil-account-logout'
                // icon: { name: 'cil-home', class: 'text-info' },
            },
        ]
    }
]

export const user = [
    {
        _name: 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavItem',
                name: '首頁',
                to: '/main',
                icon: 'cil-home',
            },
            {
                _name: 'CSidebarNavItem',
                name: '登出',
                to: '/pages/login',
                icon: 'cil-account-logout'
            },
        ]
    }
]

export const guest = [
    {
        _name: 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavItem',
                name: '首頁',
                to: '/main',
                icon: 'cil-home',
            },
            {
                _name: 'CSidebarNavItem',
                name: '登出',
                to: '/pages/login',
                icon: 'cil-account-logout'
            },
        ]
    }
]
