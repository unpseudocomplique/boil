<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

const router = useRouter()

const items = computed(() => {
  const connectedRoutes = [
    {
      label: 'Home',
      icon: 'i-lucide-home',
      to: '/',
    },
    {
      label: 'Management',
      icon: 'i-lucide-book-open',

      children: [
        {
          label: 'User',
          icon: 'i-lucide-file-text',
          description: 'Manage users of the company',
          to: '/management/user',
        },
        {
          label: 'Company',
          icon: 'i-lucide-file-text',
          description: 'Manage your company',
          to: '/management/firm'
        },
      ]
    },
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onSelect: async () => {
        await clear()
        router.push('/auth/login')
      }
    }
  ]
  return [

    ...(loggedIn.value ? connectedRoutes : []),

  ]
})
</script>

<template>
  <UNavigationMenu :items="items" class="w-full justify-center" />
</template>
