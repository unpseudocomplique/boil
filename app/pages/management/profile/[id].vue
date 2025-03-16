<script setup lang="ts">
const toast = useToast()

const route = useRoute()

const { data } = await useFetch(`/api/access-profiles/admin/${route.params.id}/edit`)

const accessProfile = ref(data.value)

const updateProfile = async () => {
    try {

        await $fetch(`/api/access-profiles/admin/${route.params.id}/edit`, {
            method: 'PUT',
            body: {
                accessProfile: accessProfile.value,
            }
        })

        toast.add({
            title: 'Success',
            description: `${accessProfile.value.display} updated`,
            color: 'success'
        })
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'Error',
            description: 'Failed to update profile',
            color: 'error'
        })
    }
}


</script>

<template>
    <div class="flex flex-col gap-4 p-4 items-start">
        <h1>Profile management</h1>

        <UCard class="z-1 w-full" v-if="accessProfile" :ui="{ body: 'flex flex-col gap-4' }">
            <UInput v-model="accessProfile.display" label="Display name" placeholder="Enter a display name" />
            <USwitch label="Manage users" description="Allow admin edit on users"
                v-model="accessProfile.managerUsers" />
            <USwitch label="Manage profiles" description="Can create, edit and delete profiles"
                v-model="accessProfile.manageProfiles" />
            <USwitch label="Update firm" description="Edit firm settings" v-model="accessProfile.manageFirm" />
            <template #footer>

                <UButton @click="updateProfile">
                    Update
                </UButton>
            </template>
        </UCard>
    </div>
</template>