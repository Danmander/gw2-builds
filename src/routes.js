import HomePage from "./pages/HomePage.vue";
import TestPage from "./pages/TestPage.vue";
import EditorTestPage from "./pages/EditorTestPage.vue";
import BuildPage from "./pages/builds/BuildPage.vue";
import BuildEditorPage from "./pages/builds/BuildEditorPage.vue";

const routes = [
    {
        path: "/build-editor",
        component: BuildEditorPage,
        meta: {
            title: "Build Editor",
        }
    },
    {
        path: "/build",
        component: BuildPage,
        meta: {
            title: "Custom Build",
        }
    },
    {
        path: "/build",
        children: [
            {
                path: "heal-alacrity-antiquary",
                component: BuildPage,
                meta: {
                    title: "Heal Alacrity Antiquary",
                    buildData: "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-UigAQmMd7TJWBcVqIJdgLOVtonjVic4Wm-97HY0wYDDAeL1EgIzuAhg5q+wwJykTbuDq0IEOJcQm1gNkGGzQc4Ki3q+zYNwcxU8Bx2jnOuoOegxBhhOI2ttO+TS2kKqad2ZMyZ5UXzxjoBGIMjXkFjNKmmBB+jSHkUglGwUNh4KkbAK4gbpU5hMgwdssAOGgNQoknC6B2gESIj28ieFnBQJie-HMnADraKgDmYcdQczKO7JIUSg9jDImgepFQvMALNuRaDa6qTumCBXIeMpYL5GoRMhbJylMunDEkDjdQg5YRoASDGwgM14zqHKgZSqsAv2yBAFEIAA"
                }
            },
            {
                path: "heal-quickness-galeshot",
                component: BuildPage,
                meta: {
                    title: "Heal Alacrity Galeshot",
                    buildData: "N4IgLglmA2CmIC4QAlYENoAICKBXCAxgNYB2sAzuZgOIYUAWA9mCADQgAmFBAThAA6RGJRCACysWGEwBtQsIS4SYNAFtYHBKgw58xMpUwBVZWo0BdAORVoUGLEzkI5MLB6tZ8kggDmdckxgWuhYeISkFFS0cAHM5gB0mADKZpj8PIwARnCq5B4AVrgumADuUPSYsABusCSYMVRyBAr0IRAkPgmezd5+MYHBOmH6kTT+geZpGVUQXFQATACs3QqqED70YOYeTQoAjnoRlNsr3gBmuDwAnie73jywPrVuaEIkt14I6cywBG8fPQQ5DKZzABnIAIUMx8jB4kzQJA4lRqdTuCDQj2cCQAOiRcSUAHyYAAq9GcmEy+GgSPJaEw6nUFKpHESAElpBxGBRMCRmJh6Ggapg0AQCKMwIxTkCVJkILYwDdhYjMOTMmgnAQMNArphCsU6SVYcUqmg+AjpIwzlKlCp1JptKFDuDjKY7ScSmSCBVyVByLBoFaMA80BwdXS-WsALQMhyUuUstggU2qWGIUAlWDrTYAYWg6vIogkHAguFUiZ4SlgrI4iHmABYABx1+bsdpnCAADwoiBkAEYAMwAdkHrAHw9HQ5HY6nk4nw-MAF92GA+CQiFICwhQG3O92EH3+wA2GfHiengfno8nweL9gZtD8YRJDc99PoR8kTcyUAK-jwJBiCK8CtiQ7Ydog07sE4PhytWX6DnW-bzIet4-lcf6iAA6qaTA8CIIFgRBs4gNBsEcF+9aHv2ACci6oSA94fl+aEYUgSQqGcZyJju4EIJBJHrGR8GIchrCUTRdELtsIAPLYBDVhBAAMvbIQ27BnIwjAcApCDUb2h7UYp7C4JA8pXDpx6LPMakgCZcpQFcSREHK0BwT2KmNtRrAkLg0DQN5vn+T5fkBX50krmgUAADLtHu34gLMiA2RFUBufu1ENoeo6KYORn6Rl9GJQgSzLjwkVgGlMjUYOanUYeiyjgZN5LtuNYIDVpXlZV8xHkZPV1WJzaLHRUHOX5AByPybiAACajC4Jgmp1O2fmYFc808JgdlmY40DMFQZRgPQCC4pGsjkGN0B8fW1HDZgGmbWiGIwRCSpIiGxZvDoaLfK4fwQMI5inedl3XXW1H9rcF0uWDg4oTs0N+e1g7zL2vbwsqMiI1dcPVbR92wlKXDtgiYoIAAQsGRBqnCmAcGoaBPMDWOgx51WTA9Uo9J9AN1AQcAIn6CDZsIPPCJguboJ+FBAyQZ0szD-aIYp+MSlKDwzDUkxopyJRkBw8J+RAFDM9j12LAZHOEx9UC899nzc7b4v81LQsi4iTt1JLgsy296vVBANQIAASgHNQQriuIAIIcGLJBalcHjrQtS2YCo65p4aaQbqU5RrfNJ1y1KHpQA4kBPLTnNPZiEdF2i-q-CuhClFcNR4RjSJohkxCYH4ABe-pwFbj2fMTECk7AFNUzTkz06ojOwMznyZBkesUugleE2ijtvItAvS8LouexL+9+rX8ufPkIqmgi9OTGraIQKoKayrYA+TM8awm0XUckDqzCtE2n+aQyd7rtCREUWAFxoC4kTClMAk1XCbmCv5GSzBXi80QXuBKRIAAiwhLDSEgcXd84tgQPnvpKWAHYoD50uFKPoDBmDCyuPzYQDhyaMBKF0IwfoQYw2HKjSGKpPyuBDMKKgR1ySGhIIQxaE8sAIh1NjKgydLAPEWpcB4yhtTyJcO0Hw8RI4kAAMQmMwAAeT-GQHguJeyJAVkjFSh5Uay3sSQh8ZCSgPgQAABSkMkbx-A3EOLNsOfsvZ8YAGp1YIgrhTdAxQnIuRCfwpG4SlapMcTjQcETaJ2NCaDQckSqJZLCZE6i+S8SmPMVFTS-BcRzXoXtRg-BMAa0YNAcOwoMhKCROkSIBi0k5LyZMS0Vpt6aWpFw94adJS4H4OuWAbTk4j0BAccI4IO70kYMUS0dC1mrCzFsIx1TWRy0yFIDMtQ9FgCoPs7JyNRlJ3mo4JgvkIFC1NqzZCri5lbUWZINpaILjXEhN4YEEBQRbI8EdBwDw9lWlWVKNYGwtjfIERU1W8zAXLP9k8GxGDAYYvSSU4Rt9KjlDcMMsGt0xmHPuHEtwCT1TSGSWFf5CylnAs+L9RuvNZaNNebED5wpoDkElCuHUatmiqH4HAVwUo0AmUlK8FQPcvSRW8FHFVmAo5gHVUQCWAp2ivXVGnMkVBvgzDmFKaEsIuisiRa87xyh-nWtmA4G2X0sBontbTUBqdiGPNRuEjuAB6LenwyodGZeTRJbLLo4mqWYzAuC2gdFzkdImUDx4kDJpTdA1NTS1yaZYVaGBvFXCoAKIUIoxSGAfmE4pCF3Sem9FQA0TB+D8CGYsOsikc0k3zZPQtaBi20zngvC1CIiCSMlDIWVH5ahBHEvjClMh4F8RyopZNuJHnFLquSzGZtnF-NNF66AwZQxbT9DSOoyKMgqF3mrLlQKKSaU-B4SkIDXmpy4HmaVrRVC7WOboqFPJJBcBZMYp1dD2mwA2RolMGida5onlPItM94Op3IHtaQ7QaVs0hgjH5dY4ZQyKSjNGlGBFNVojsT4Dc-h8AIC3Nuszb6RoZQgbuRr+6D1gAkRMycwC4EuQANU9YwEWcweyLiAA"
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