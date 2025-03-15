<script setup lang="ts">
    const {data: users} = await useFetch('/api/users')

const data = users.value.map((user) => {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    profile: user.userFirms[0].accessProfile,
  }
})


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
        accessorKey: 'profile.display',
    }
]

</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <h1>User management</h1>
        <UTable :data="data" class="flex-1" :columns="columns" />
    </div>
</template>