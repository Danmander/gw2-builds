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
                    buildData: "N4IgLglmA2CmIC4QAlYENoAICC00GMAnKATxwDtIBHAVzUJJABoR6BbAe0MVAHdYIAcwAWYAMJ4AzpMQgAsrAAmEGm2YhCNcrACSixACYALAA4AzAE4WEcgDMIAD1gyEAbQCMZgOxemnn37evv7BQYE+ALoAvixgxOQA1rBgLqA29k4uHmYAbKF5gQWeRbn5XtEs-GgADhzkAMrJWXzoteTN4CTV8Ej1+LDVYLDc1naOiCEskkIQ0HpZXkZmBjkVoGBdPSAAChCSYBzQ6unjCJMg04Kz84iuxjmW0WsgVW0dG92y9d30x2MOEzCFxmc0UWXujyiTxYhFg0Ag+D0EwADO4ViYWLYOBxFEiEBZ3DkLMiWDRIPCNni8gBWAwYkBk2akeoJWag8HuHwY8g0aDQJg8vkC3n8kAgCKxQhoKAAGRszluaX0CAMJPAUqgNzc7kJJLRFmCniMzwgyqMRkl0rAWo8hLMfgMAR11JMJuVAXVVptBjMRhyTGMZncAcsZmhF1ZfIAchwhi4QBAAHyYHS2TAkDg0QCYBLDMNU8CQbIJMGhMK4EXUEJISNAAG70CASzBgNBJMuSSPQM7GIzIiLNjh5wgcWum2B54ZsNDaShlivkBCwwSwbRSyB1ftYwjN4TjgBUe5XkFzkloaEUB4AdJgACrCPaYOApdOZzAdiDVdudhAPFblTAALTJq4758j+QZ0v2ig0PExZgLumDDi267kJgR4QLC0BkJIg4ZjQmD4NOmA0JI454du5b4JWNhQBAaCQLWsCblwmCcLmJGwLYvI7kWkiXgAOuQgn1BwbDjoyFLYZ2kgvvhbBCKImDaEoCCCQBX5smcZjItSqyYFuJZzlRC5UWwABGHAIAAIvQCSYGIokWZgABiEBwoo-a8Pe+DCARRFmeOplmfKiiYLwUC+SB34PGY1LuP2BzNsQgjLtuFnwWWcRWt2Br9tOoWuJhCJnKi6IRGpGlgZ4yI5AYzEUfOCDGcoKEEXA06kQgDnkC1EB1PZ7WkZI5XkOpUWadV1L-vllVdtVqr1UZlaKJxdHkP0UFoFOy6YBV41gT4Pp9iWPWzVpyKxYt569XUGBLQuNGQPRECMSNY2gXN2nInV+ksd0hA4eQd2cMFkl7R951mK6v3bqedChSDTIbIJgnOSx5FoRS44fUwsl+ahPnYqRmABWA-Arqpo1nZ4ng-QZlHLat04bZgihbWgy7g9+h3UtSi1seOYliUWKNCWL6hZVAMZxrI3XTCtsO8DU1RFgOmUamAKq9sdEBpnhADk7HTOQxb7V2h3aQlg6CNKqFEbADhZcRxMcGmZsIBbx3oD5mDqEhz11NLCpIAAxCHmAAPLdKugm8Mm2ywoR+xnT4lj-olNs2JgZj3Qg07UHQDAINghCQLYBApHlp1K1AMM7uODMmdi0CKBwvALg5hyt+3VuIc4yQk5xXDYy2peq6W9giGA14J5xwxoGZWE8TJNj4NANArTJBi5-nEBnkXEe2LYK7TIxOBj+X+CV2F3m+fQK762AKc5C6dUCWL7jXo3eeUHvhckAgQ+x92gvXHCXMuFcRqfx3r-feADwG60gZgAAFNUWEx8pSLzIERb+u84GAKPifUB58IFXwiAASkEtA92qdcpUK-o1PB-8CHANPmAi+kD6EwILvQABVk54gLPggy+YAoFfwhr+PIEQgLuweGiaGyD+pEQwFhShYsw6YAAEqxgDmLAAmpmfWfIwr5zVhxM6kjygyIkRBBRSi7Z8hIOQ6x3MvBp2kYmWRZhYrxUwK7N2jUqJdzbh3Zu3dyARGvHeB84VjFoJHGOCchApwzifu4akud5JTybN-LiDAcmNSXCueeKECnGSrOFWwYBtDSDKZWUcgguBVwKo1eJQwr59Qie-QS2BFA3SBo43GNC3G5UwIIKUlAZLwVhOObQvBuF-14cXDhV9hrXlwErEgMlzFk0HLg2BzDhEV2GmrKcNgWxZ1wXgIgpAmx1HHK7G+CJfJsBIk-AKJ0Fn4KAUQoRKzRGnNthc1C38smiEiaLJMmADH4VbuQR+mBhBoDPolcx+yeFFyOas-s-jc5BJbiEyJOAZLQDqMWNAMk8LO3HPBWAbBB5bjIpmbc2hHYpxGf+A2xiPkLzgGY6oSQBgk2xO0bp5ANFYpSMJUSDdGEHKWdgDpIiTmxKwB8gW1KuJYHgkRWMu4Aa4ziGQRKgrPz2xIA86OddaX0q8rMccrdVYY39ihMVABVUiWqvnMJ+YI9hpDK6U3eq4x0-54mjk3njcKGVSzfyCpZVy7le7xPwGWIq+ASpohyK6LmmkvAvxMD9cNY4ZLXVordLA39dwYCLAgVANaTb9jMtgvkbcnWvkSpIaoW0LHePcMaPxdsHFYVFh6zi3F0WLKLvw1hxDJXDSDc-EwhI8qtt4JSjtg4u09q8T4nFFEIbVTRItWwMynl8owDhIcCTlAmyjRFQycbHIJrci3ZNw5U2FThMVdwpVs1vWfjkVE-Zi2RtLMFYsZkYLJyregeEJs61wYAzQnIeQB0qLbjJAyZaUJ3STs+R5ElSBvmkoJdQeEwA0ACgANTHBwBym9bgShAJvG5gxOmyBLky-Cx4lB+LTPmNAhY72NJxCTGgswwSPggG2b+XbYBX2GIhu6uACDEA2Jgb4CmhiEAiAAfkwAAdUzC3PGa59VjK2ovcc0bfK0uk4xGSjyMZDC2lOOMBnDNwn5KzQcOhEXIppQhKDkm654QAITeqWfWrAqmbkaewPK-J16I3OEwAYDJoKFKiKGYw656mSB1IXHkwruXylFNXLoorCA2nac6dVyQlTqnOGGmV+pQgmknVCgcdo-Hc5mXoMQYYEKxZx1vPeGSIXTMPlLELccU3QrIIdv0QYg7c6SAXhhCh14dBP1bml8gsYAtnwIP0aQas5MtlBrcrrO9YBXFawFmSjEGD6VgPMp9PVy0E3au0WAXU6j9IGugP7JyZpIpJW3YYudq3wcEP2Uy3bYTdcHMZRiv8K2Irg8MGSyCMDwUzCITAtcpxJG2Z+AytdbPE+fPeInW1MyTL69-AbhAhu6fIZedQZlYStlZ0HeM6gVr2GZrAAXsgQBRCAA"
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