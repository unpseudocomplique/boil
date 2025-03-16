<script setup lang="ts">
import { AccessProfile } from '@prisma/client';
const UButton = resolveComponent('UButton')


const page = ref(1)
const search = ref('')
const searchTermDebounced = refDebounced(search.value, 200)
const { data: accessProfiles, error, refresh } = await useFetch('/api/access-profiles', {
    query: { page, search: searchTermDebounced },
    transform: (response) => {
        return response
    },
    watch: [searchTermDebounced, page],
});

if (error.value) {
    console.error("Failed to fetch access profiles:", error.value);
    // You might want to display an error message to the user here.
}


const columns = [
    {
        header: 'Name',
        accessorKey: 'display',
        linkTo: (row) => `/access-profiles/${row.id}`,
    },
    {
        id: 'expand',
        cell: ({ row }) => {
            return h(UButton, {
                color: 'neutral',
                variant: 'ghost',
                icon: 'i-lucide-chevron-down',
                square: true,
                to: `/management/profile/${row.original.id}`,
                innerHTML: 'Show profile'
            })
        }

    },
]

const createProfile = async () => {
    const reponse = await $fetch('/api/access-profiles/admin', {
        method: 'POST',
        body: {}
    })

    await navigateTo(`/management/profile/${reponse.id}`)
}
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <div class="flex justify-between gap-4 flex-wrap">
            <h1>Profile management</h1>
            <UButton @click="createProfile">
                Create new profile
            </UButton>
        </div>
        <UTable v-if="accessProfiles" :data="accessProfiles.data" :columns="columns">
        </UTable>
        <UPagination v-model:page="page" :total="accessProfiles?.pagination.total"
            :items-per-page="accessProfiles?.pagination.perPage" />
    </div>
</template>