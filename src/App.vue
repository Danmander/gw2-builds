<template>
    <main>
        <v-container class="container">
            <router-view />
        </v-container>
    </main>
</template>

<script>
export default {
    created() {
        this.$router.afterEach((to) => {
            document.title = to.meta.title ? `Dánmander - ${to.meta.title}` : "Dánmander";
        })
    }
}
</script>

<style scoped>
.container {
    max-width: 1440px;
}
</style>