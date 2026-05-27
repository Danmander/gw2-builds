<template>
    <main>
        <v-container class="container">
            <router-view />
        </v-container>
    </main>
    
    <user-preferences-dialog />
</template>

<script>
import UserPreferencesDialog from './components/user-preferences/UserPreferencesDialog.vue';

export default {
    components: {
        UserPreferencesDialog
    },
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