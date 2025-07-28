<!-- eslint-disable vue/max-attributes-per-line -->

<template>
    <h1>Pages</h1>
    <router-link
        v-for="(route, index) in routes"
        :key="index"
        :to="route"
        class="d-block"
    >
        {{ route }}
    </router-link>
</template>

<script>

export default {
    computed: {
        routes() {
            const flatten = function (currentPath, routes) {
                const childRoutes = [];
                routes.forEach(route => {
                    if(route.children === undefined) {
                        childRoutes.push(currentPath + route.path + '/');
                    } else {
                        childRoutes.push(...flatten(currentPath + route.path + '/', route.children));
                    }
                });
                return childRoutes;
            }

            return flatten('', this.$router.options.routes);
        }
    }
}
</script>

<style scoped></style>