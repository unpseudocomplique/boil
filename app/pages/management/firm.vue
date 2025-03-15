<script setup lang="ts">

const { data: firms } = await useFetch('/api/firms')
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <h1>Firm management</h1>
        firm: {{firms}}
    </div>
</template>