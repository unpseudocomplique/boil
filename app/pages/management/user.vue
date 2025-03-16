<script setup lang="ts">
import type { TableRow } from '@nuxt/ui'

const { data: users } = await useFetch('/api/users')

if (!users.value) throw new Error('No users')

const data = ref(users.value.map((user) => {
    return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        accessProfile: user.userFirms[0].accessProfile,
    }
}))

const selectedUser = ref<typeof data.value[0] | null>(null)

const selectLine = (user: TableRow<typeof data.value[0]>) => {
    selectedUser.value = user.original
}


const columns = [
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Firstname',
        accessorKey: 'firstname',
    },
    {
        header: 'Lastname',
        accessorKey: 'lastname',
    },
    {
        header: 'Profile',
        accessorKey: 'accessProfile.display',
    }
]

const updateUser = async () => {
    if (!selectedUser.value) return
    const userIndex = data.value.findIndex(user => user.id === selectedUser.value.id)
    if (userIndex === -1) throw new Error('User not found')
    data.value[userIndex] = selectedUser.value
    selectedUser.value = null
}

</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <h1>User management</h1>
        <ManagementUserEdit v-model="selectedUser" @user-updated="updateUser" />
        <UTable :data="data" class="flex-1" :columns="columns" @select="selectLine" />
    </div>
</template>