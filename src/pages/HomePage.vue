<!-- eslint-disable vue/max-attributes-per-line -->

<template>
    <h1>Pages</h1>
    <router-link
        v-for="(route, index) in routes"
        :key="index"
        :to="route.path"
        class="d-block"
    >
        {{ route.path }}
    </router-link>
</template>

<script>

export default {
    computed: {
        routes() {
            return this.$router.options.routes;
        }
    }
}
</script>

<style scoped></style>