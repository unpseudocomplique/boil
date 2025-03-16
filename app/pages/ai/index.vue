<script setup lang="ts">

const toast = useToast()
const prompt = ref('')

const { data, execute } = await useFetch('/api/ai', {
    query: {
        prompt
    },
    lazy: true,
    watch: false,
    immediate: false

})

const generate = async () => {
    try {
        execute()
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'Error',
            description: 'Failed to generate text',
            color: 'error'
        })
    }
}
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <h1>AI</h1>
        <div class="flex flex-col gap-4">
            <UInput v-model="prompt" label="Prompt" placeholder="Enter a prompt" />
        </div>
        <UButton @click="generate">
            Generate
        </UButton>
        <UCard>
            <MDC :value="data?.text || ''" tag="article" />
        </UCard>
    </div>
</template>