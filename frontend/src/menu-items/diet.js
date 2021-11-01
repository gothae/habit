// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| diet MENU ITEMS ||============================== //

const diet = {
    id: 'diet',
    title: '식단 관리',
    type: 'group',
    children: [
        {
            id: 'diet-weekly',
            title: '주간 식단 관리',
            type: 'item',
            url: '/diet/week',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'diet-solution',
            title: '솔루션 모아보기 ',
            type: 'item',
            url: '/diet/solution',
            icon: icons.IconShadow,
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Icons',
            type: 'collapse',
            icon: icons.IconWindmill,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default diet;
