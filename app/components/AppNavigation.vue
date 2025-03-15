<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

const router = useRouter()

const items = computed(() => {
  if (!loggedIn.value) return []

  const { managerUsers, manageProfiles, manageFirm } = user.value?.accessProfile

  const managementRoutes = [
    ...(managerUsers ? [{
      label: 'User',
      icon: 'i-lucide-file-text',
      description: 'Manage users of the company',
      to: '/management/user',
    }] : []),
    ...(manageFirm ? [{
      label: 'Company',
      icon: 'i-lucide-file-text',
      description: 'Manage your company',
      to: '/management/firm'
    }] : []),
    ...(manageProfiles || true ? [{
      label: 'Profile',
      icon: 'i-lucide-file-text',
      description: 'Manage access profile',
      to: '/management/profile'
    }] : [])
  ]

  const connectedRoutes = [
    {
      label: 'Home',
      icon: 'i-lucide-home',
      to: '/',
    },
    ...(managementRoutes.length > 0 ? [{
      label: 'Management',
      icon: 'i-lucide-book-open',

      children: managementRoutes
    }] : []),
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
  <UNavigationMenu :items="items" class="w-full justify-center z-10" />
</template>
