<script setup lang="ts">
import { AccessProfile } from '@prisma/client';
const UButton = resolveComponent('UButton')

const { data: accessProfiles, pending, error, refresh } = await useFetch<{ data: AccessProfile[] }>('/api/access-profiles', {
    transform: (response) => {
        return response
    }
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
            console.log('row', row)
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
</script>

<template>
    <div>
        <UTable v-if="accessProfiles" :data="accessProfiles.data" :columns="columns">
        </UTable>
        <div v-else-if="pending" class="flex items-center justify-center p-4">
            <p>Loading access profiles...</p>
        </div>
        <div v-else-if="error" class="flex items-center justify-center p-4 text-red-500">
            <p>Failed to fetch access profiles.</p>
        </div>
    </div>
</template>