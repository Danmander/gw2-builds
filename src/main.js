// Actual app creation
import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
const vueApp = createApp(App);

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
const customTheme = {
    dark: true,
    colors: {
        'background-darken-1': '#1a1a1a',
        'background': '#1c1c1c',
        'background-lighten-1': '#9a9a9a',
        'background-lighten-2': '#ebebeb',

        'surface': '#242424',
        'loading': '#282828',

        'primary': '#efaac4',
        'primary-lighten-1': '#f4c4d6',

        'error': '#D7263D',
        'info': '#00A7E1',
        'success': '#4CB944',
        'warning': '#E59500',

        'tooltip-inactive-border': '#465560',
        
        // Direct GW2 colors
        'attribute': '#02F002',
        'bonus': '#5599FF',
        'faded': '#A5A9AB',
    },
};
const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        defaultTheme: 'customTheme',
        themes: {
            customTheme,
        },
    }
});
vueApp.use(vuetify);

// Router
import { createWebHistory, createRouter } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import HealAlacrityTempestPage from './pages/builds/HealAlacrityTempestPage.vue';
import TestPage from './pages/TestPage.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/builds/heal-alacrity-tempest', component: HealAlacrityTempestPage },
        { path: '/test', component: TestPage },
        { path: '/:pathMatch(.*)*', component: HomePage },
    ],
});
vueApp.use(router);

// Pinia
import { createPinia, setActivePinia } from 'pinia';
const pinia = createPinia();
setActivePinia(pinia);
vueApp.use(pinia);

// Mount the Vue app
vueApp.mount('#app')
