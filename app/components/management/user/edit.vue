<script setup lang="ts">

const emits = defineEmits<{
    'userUpdated': []
}>()


const profileSearch = ref('')
const searchTermDebounced = refDebounced(profileSearch, 200)

const { data: profiles, status } = await useFetch('/api/access-profiles', {
    key: 'paginated-profiles',
    query: { search: searchTermDebounced },
    watch: [searchTermDebounced],
    lazy: true
})

const user = defineModel()

const isModalOpen = computed({
    get() {
        return !!user.value
    },
    set(value) {
        if (!value) {
            user.value = null
        }
    }
})

const updateUser = async () => {
    const { accessProfile, ...userData } = user.value
    await $fetch('/api/users/' + user.value.id, {
        method: 'PUT',
        body: {
            ...userData,
            accessProfileId: accessProfile.id,
        }
    })

    emits('userUpdated')

}

</script>


<template>
    <UModal v-model:open="isModalOpen" :dismissible="false" title="Edit user information"
        :ui="{ body: 'flex flex-col gap-4' }">

        <template #body v-if="user">
            <UFormField label="Email" required>
                <UInput v-model="user.email" placeholder="Enter your email" class="w-full" />
            </UFormField>

            <UFormField label="Firstname" required>
                <UInput v-model="user.firstname" placeholder="Enter your first name" class="w-full" />
            </UFormField>

            <UFormField label="Lastname" required>
                <UInput v-model="user.lastname" placeholder="Enter your last name" class="w-full" />
            </UFormField>

            <UFormField label="Change password" required>
                <UInput v-model="user.password" placeholder="Enter your password" class="w-full" />
            </UFormField>

            <USelectMenu v-model="user.accessProfile" v-model:search-term="profileSearch" :items="profiles?.data || []"
                :loading="status === 'pending'" ignore-filter icon="i-lucide-user" placeholder="Select a profile"
                label-key="display" key="display">
            </USelectMenu>

        </template>

        <template #footer>
            <UButton @click="updateUser">Update changes</UButton>
        </template>
    </UModal>
</template>