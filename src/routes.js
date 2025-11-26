import HomePage from "./pages/HomePage.vue";
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
        component: BuildPage
    },
    {
        path: "/build",
        children: [
            {
                path: "heal-alacrity-antiquary",
                component: BuildPage,
                meta: {
                    buildData: "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"
                }
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