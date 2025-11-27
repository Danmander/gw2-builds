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
            },
            {
                path: "heal-quickness-galeshot",
                component: BuildPage,
                meta: {
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