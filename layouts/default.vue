<script>
export default {}
</script>

<template>
    <div>
        <nav class="navbar">
            <nuxt-link to="/">Home</nuxt-link>
        </nav>
        <slot />
    </div>
</template>

<style lang="scss">
@import url('../styles/main.scss');
</style>