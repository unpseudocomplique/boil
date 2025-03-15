<script lang="ts" setup>

const { loggedIn, session, fetch, clear, openInPopup, ready, user } = useUserSession()
</script>

<template>
    <div>
        <p>Hello world</p>
        <pre>{{ loggedIn }}</pre>
        <pre>{{ session }}</pre>
    </div>
</template>