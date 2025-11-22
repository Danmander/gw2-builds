import HomePage from "./pages/HomePage.vue";
import HealAlacrityTempestPage from "./pages/builds/HealAlacrityTempestPage.vue";
import TestPage from "./pages/TestPage.vue";
import EditorTestPage from "./pages/EditorTestPage.vue";
import BuildPage from "./pages/builds/BuildPage.vue";
import BuildEditorPage from "./pages/builds/BuildEditorPage.vue";

const routes = [
    {
        path: "/build-editor",
        component: BuildEditorPage
    },
    {
        path: "/build",
        children: [
            {
                path: "heal-alacrity-tempest",
                component: HealAlacrityTempestPage
            },
            {
                path: ":pathMatch(.*)*",
                component: BuildPage
            }
        ]
    },
    {
        path: "/test",
        children: [
            {
                path: "editor",
                component: EditorTestPage
            },
            {
                path: ":pathMatch(.*)*",
                component: TestPage
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        component: HomePage
    },
];
export default routes;