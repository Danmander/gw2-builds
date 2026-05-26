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
                    buildData: "N4IgLglmA2CmIC4QAlYENoAICC00GMAnKATxwDtIBHAVzUJJABoR6BbAe0MVAHdYIAcwAWYAMJ4AzpMQgAsrAAmEGm2YhCNcrACSixACYALAA4AzAE4WEcgDMIAD1gyEAbQCMZgOxemnn37evv7BQYE+ALoAvixgxOQA1rBgLqA29k4uHmYAbKF5gQWeRbn5XtEs-GgADhzkAMrJWXzoteTN4CTV8Ej1+LDVYLDc1naOiCEskkIQ0HpZXkZmBjkVoGBdPSAAChCSYBzQ6unjCJMg04Kz84iuxjmW0WsgVW0dG92y9d30x2MOEzCFxmc0UWXujyiTxYhFg0Ag+D0EwADO4ViYWLYOBxFEiEBZ3DkLMiWDRIPCNni8gBWAwYkBk2akeoJWag8HuHwY8g0aDQJg8vkC3n8kAgCKxQhoKAAGRszluaX0CAMJPAUqgNzc7kJJLRFmCniMzwgyqMRkl0rAWo8hLMfgMAR11JMJuVAXVVptBjMRhyTGMZncAcsZmhF1ZfIAchwhi4QBAAHyYHS2TAkDg0QCYBLDMNU8CQbIJMGhMK4EXUEJISNAAG70CASzBgNBJMuSSPQM7GIzIiKYGz7dCKTAcNOuDtslWcryu5scPOEDi102wPPDNhobSUMsV8gIWGCWDaKWQOr9g7pzOETAAKlvx8gucktDQinvADpMAAVYR7EvQJIC5wCkV40Jgk7VO2nYIA8KzlJgAC0yYTjBDxonOig0PExZgMIa5Li2Z7kJgj4QLC0BkEBYGYPgW6YDQkhrhm2G7vglY2FAEBoJAtawP2WI3pwuaMbAti8s2f7kIIkgfgAOuQCn1BwbBroyFJUZ2kg0WwQiiJg2hKAgCmIdBU6eMi1KrJggklmxlbsWwABGHAIAAIvQCSYGIKkuZgABiEBwoo-a8H++DCLR9FOWujlOfKI68FAkWoVODxmNS7gXgucRCEeN4uXhZZxFa3YGv2W4jq4FEImcqLohEJlmXyZxmMiOQGAJXD2fu7HkMoxG0XAW5MQgPn9VxdTecNTGSI15CmalLU+D6fYlv1zVdhZGVdTeb4DRAdQYD1CCcZAPEQHx82LZOLUWcinU2d13SEEB5DHZw8UaU1S1bW1ZhzrZL50COn1MhsCkKf53UsTecJQGut38jRdEkRF2JMZgMVgPwx7GQtm2tZ4j22eWfUIIoYnceQ-T9ooaCbkeP1IwgK3UtSu2YMJa6qapRaQ4pgvqCVUAxnGsjjdMlM3pIvA1NURbzsVGpgCqvZrRAaYsQA5CJ0zSYTK1tdlmCCNKJH0bADglQxmNjobXirf26ARc2ECqTRokO5Y5QfuohEXXUYsKkgADEoeYAA8t0J4KbwybbLCdH7N75VK2bNiYGYJ1btQdAMAg2CEJAtgECkFUbXLUBPTeeFrmTDnYtAigcLw+4+YcLdtybsJMWAWNiVwiMtsXiulvYIhgF+idicMaBOZRkn-jY+DQDQlPaQYOeUBAr4F5Hti2Me0x8Tgo+l-g5eYGFCKRfQx7a-3v2szkLqdfJgvuF+Df7rnu-5yQBAB8j7tEumuIuJcy7zS-tvPO9BAEQM1lAzAAAKaosIj5SgXmQeiP8EB-z3oA4Bx8wFn0gZfCIABKBSMDn4+B9tA7+e58E70IUAw+JDT6IIvmARhsD-7wPcrPUBXDz5QJod-FmcE8gRGQs-dCdJ+woKmvRDAlFqGC3DpgAASrGQOgsACamZtZ8mvrnJWXt5HLBkXIqRQZFGoJURbPkJBKG2JgvQ8q7i0pmAyllUch8TrsU7q3duTcu7kAiF+X8-4kqmPQcuVc65CCbm3P3dw1ITq6Unk2PB4kGC5OYYeY8c9iKFPJrLTWYBtDSHKZWFcgguAVyqswhJQxL6HUiR-BS2BFAHSOi4pgqcEKCClJQbSeFYRrm0LwfhbDuFlzml+XAcsSDaS9jjBceCCEAMLmIy+c0labhsC2TO2y8BEFIE2Ooa57Y31dmwRi-cYrrTmbs4hIjwH7N4Uc82pySJ1y5nsfWxZ3DIiyXpXh3TyBJkwEY8CLdyCP0wMINAp9LyWOYTswRCyDn9jHOOZhwTm6hKiTgbS0A6jFjQNpFits1x1zYAPQSzFrwGStk-FmniEI61MS8+ecALHVCSAMLG2J2jQq0bilISkVL1yxaw3Z2AOk8MOXErALzub0vElgPC9FYz4VekMuIZBLwiqgpbEgtyY410krAJlN9BUt0VrDTAAdiLQoAKpMR1W8wRHyT5fPIeXfGN0PGO0iIuRJG8aJJSKqWPBcVXKBWCibBJ+Ayw1XwHVNEORXTMw8a-Ewj0EkrhjftSa70sB4PwhgIsCBUB1ukv2JyOC+StxdZmJWkhqgM0JuldwxpRwW2cZRAW3qxISW2YqwRblhGBrIUgvFobDZ5sJBVdtvBaVdsvD2vtVi-H4pvM-CyaJOa2CmdfP8gqMDUVLaaTt4E413yCb5ZNQVm5pqXBm6q8Ns1gtzfmgmdCcg5FRP2e95asZCCxthFONb0Dwmkg2xD11V15CHWo1u2lbIVuIsdZOoF7bqVIBBLSAstFzqbcWZ9J1Kb2C3P0BAAAhWErYnL0DmgpX8PNzZmLILyrAqL+qCrwfR6mTHWPoASBx16-Z-ytttorE9QZljNLtSRPdbBdIGzoQYCwjoyXwqigC1s9cuWO2NutRQAB6bqKnkQ7SVlh2ZsMmLQDTLu3tTLq6wD4iRbm0LUw0VRafEDJh11DL6lLYYSmDbVymg5s9zKh4QTltUBWBsvPoFrguLTht9OGehcZ1GAFqKyxqEraqWhYBqxMI5+TWsu1yx3H548XNUtiapox2rUn2P0DpgzNAR4-YsBYmAGgMUABqq4OA+Q3rcCUIAN6XMGJ02QRdWXgSfEoAJeYCyK0aTiWDswwSYHhG2PBPbYCX2GCh46uACDEA2Jgb4N2hiEAiAAfkwAAdUzM3Gip5DWmwZgvNctHAXwj4tpe2rqhgM03HGH7v24TIxbimFFaKGX4RO4D2yLEACEfqC6NqwI9y5L3sAzoKVGstzhMAGEyXg7Jog6m-wuc9kg7OED5O50MvBxSTz6J52097nSeeVNsNU5wc0BfMIaU06z852h7bwbJ4gwwokC3jj+P82knI0FOwObSpZeZrkN8blBVt+iDGHSdSQ89yJUK-DofuLcGfkFjFj0+BB+jSCq8w-YTuNLqe2bAK4cusfaT4gwGysBZmJrqP0tGw12i1fGin6a6B0+HMqtH87rdYsIeo-2RyvbYQjkvH1fz+GhOIeGNpFBGA8KZhEAOfum4kjrKgrZautGoDaT-O3hmmZxlq+YRroKn3KGjZAE5NjMn6DB3jOocTPWV+yBAFEIAA"
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