<script setup lang="ts">

// const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
const { loggedIn, session, fetch, clear, openInPopup, ready } = useUserSession()

const router = useRouter()

const user = ref({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
})

const firm = ref({
  display: "",
})

const show = ref(false)

const createFirm = () => {
    $fetch('/api/firms', {
        method: 'POST',
        body: {
            firm: firm.value,
            user: user.value,
        }
    }).then(res => {
      router.push('/')
    })
}

const canCreate = computed(() => {
    return firm.value.display && user.value.firstname && user.value.lastname && user.value.email && user.value.password
})

</script>
<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-gray-50">
      <body class="h-full">
      ```
    -->
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-32 w-auto rounded-full" src="/badminton.jpeg" alt="Company logo" />
        <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create your account</h2>
      </div>
  
      <div class="mt-10 card-base sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form class="space-y-6" @submit.prevent="createFirm">

            <UFormField label="Company Name" required>
              <UInput v-model="firm.display" placeholder="Your firm name" class="w-full" />
            </UFormField>

            <UFormField label="First Name" required>
              <UInput v-model="user.firstname" placeholder="Enter your first name" class="w-full" />
            </UFormField>

            <UFormField label="Last Name" required>
              <UInput v-model="user.lastname" placeholder="Enter your last name" class="w-full" />
            </UFormField>

            <UFormField label="Email" required>
                <UInput v-model="user.email" placeholder="Enter your email"  class="w-full" icon="i-lucide-at-sign" />
            </UFormField>
            <UFormField label="Password" required>
            <UInput
                v-model="user.password"
                placeholder="Will be used to log in"
                 class="w-full"
                :type="show ? 'text' : 'password'"
                :ui="{ trailing: 'pe-1' }"
            >
                <template #trailing>
                <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show ? 'Hide password' : 'Show password'"
                    :aria-pressed="show"
                    aria-controls="password"
                    @click="show = !show"
                />
                </template>
            </UInput>
            </UFormField>
  
      
  
                <UButton type="submit" :disabled="!canCreate" class="w-full justify-center">Button</UButton>
          </form>
  
          <div>
            <div class="relative mt-10">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-200" />
              </div>
              <div class="relative flex justify-center text-sm/6 font-medium">
                <span class="text-white px-6 bg-base">Or continue with</span> 
              </div>
            </div>
  
            <div class="mt-6 flex justify-center gap-4">
              <a href="#" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
                <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
                <span class="text-sm/6 font-semibold">Google</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </template>
  