import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const Diet = Loadable(lazy(() => import('views/diet-control/diet/index')));
const UtilsShadow = Loadable(lazy(() => import('views/diet-control/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/diet-control/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/diet-control/TablerIcons')));
const Day = Loadable(lazy(() => import('views/diet-control/diet/Day')));
// sample page routing
const Mypage = Loadable(lazy(() => import('views/my-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/diet',
            element: <Diet />
        },
        {
            path: '/diet/solution',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/edit/user',
            element: <Mypage />
        },
        {
            path: '/diet',
            element: <Day />
        }
    ]
};

export default MainRoutes;
