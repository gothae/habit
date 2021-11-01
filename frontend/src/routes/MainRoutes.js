import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const DietWeek = Loadable(lazy(() => import('views/diet/DietWeek')));
const UtilsColor = Loadable(lazy(() => import('views/diet/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/diet/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/diet/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/diet/TablerIcons')));

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
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/diet/week',
            element: <DietWeek />
        },
        {
            path: '/diet/month',
            element: <UtilsColor />
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
        }
    ]
};

export default MainRoutes;
