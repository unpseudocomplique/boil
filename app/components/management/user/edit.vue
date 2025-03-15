<script setup lang="ts">

const emits = defineEmits<{
    'userUpdated': []
}>()

const user = defineModel()

const isModalOpen = computed({
    get() {
        console.log('user.value', !!user.value, user.value)
        return !!user.value
    },
    set(value) {
        if (!value) {
            user.value = null
        }
    }
})

const updateUser = async () => {
    const { profile, ...userData } = user.value
    await $fetch('/api/users/' + user.value.id, {
        method: 'PUT',
        body: {
            ...userData,
            accessProfileId: profile.id,
        }
    })

    emits('userUpdated')

}

</script>


<template>
    <UModal v-model:open="isModalOpen" :dismissible="false" title="Edit user information">

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

        </template>

        <template #footer>
            <UButton @click="updateUser">Update changes</UButton>
        </template>
    </UModal>
</template>