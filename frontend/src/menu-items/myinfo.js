// assets
import { IconUser, IconLogout } from '@tabler/icons';

// constant
const icons = { IconUser, IconLogout };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const myinfo = {
    // id: 'sample-docs-roadmap',
    id: 'myinfo',
    title: '내정보',
    type: 'group',
    children: [
        {
            id: 'edit-myinfo',
            title: '개인 정보 수정',
            type: 'item',
            url: '/edit/user',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'logout',
            title: '로그아웃',
            type: 'item',
            url: '/pages/login',
            icon: icons.IconLogout,
            // external: true
            // external => 새창 여는 거
            target: false
        }
    ]
};

export default myinfo;
