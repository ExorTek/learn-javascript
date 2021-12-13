import Home from '../pages/Home';
import Abouts from '../pages/Abouts';
import Profile from '../pages/Profile';
import Login from '../pages/Login';

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        auth: false
    },
    {
        path: '/about',
        exact: true,
        component: Abouts,
        auth: false
    },
    {
        path: '/profile',
        exact: true,
        component: Profile,
        auth: true
    },
    {
        path: '/login',
        exact: true,
        component: Login,
        auth: false
    }
]