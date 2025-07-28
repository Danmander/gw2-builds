import HomePage from './pages/HomePage.vue';
import HealAlacrityTempestPage from './pages/builds/HealAlacrityTempestPage.vue';
import TestPage from './pages/TestPage.vue';

const routes = [
    {
        path: '/builds',
        children: [
            {
                path: 'heal-alacrity-tempest',
                component: HealAlacrityTempestPage
            },
        ]
    },
    {
        path: '/test',
        component: TestPage
    },
    {
        path: '/:pathMatch(.*)*',
        component: HomePage
    },
];
export default routes;