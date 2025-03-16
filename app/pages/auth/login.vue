<script setup lang="ts">
import { z } from 'zod'

const toast = useToast()

const router = useRouter()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})
type Schema = z.output<typeof schema>

const user = ref<Partial<Schema>>({
  email: "",
  password: "",
})

const login = async () => {
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: user.value.email,
        password: user.value.password,
      }
    })

    router.push('/')
  } catch (error) {
    console.log(error)
    toast.add({
      title: 'Error',
      description: 'Failed to login',
      color: 'error'
    })
  }
}


</script>
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 gap-4">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-32 w-auto rounded-full" src="/badminton.jpeg" alt="Company logo" />
    </div>




    <UCard :ui="{ body: 'flex flex-col gap-4' }" class="w-96 max-w-full mx-auto">
      <h1>Login with</h1>

      <USeparator label="Password" />
      <UForm :schema="schema" :state="user" class="space-y-4" @submit="login">

        <UInput v-model="user.email" placeholder="Enter your email" class="w-full" icon="i-lucide-mail">
        </UInput>
        <UInput type="password" v-model="user.password" placeholder="Enter your password" class="w-full"
          icon="i-lucide-lock">
        </UInput>
        <UButton type="submit" @click="login">Login</UButton>
      </UForm>

      <USeparator />
      <div class="mt-6 flex justify-center gap-4">
        <a href="/auth/google"
          class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
          <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
              fill="#EA4335" />
            <path
              d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
              fill="#4285F4" />
            <path
              d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
              fill="#FBBC05" />
            <path
              d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
              fill="#34A853" />
          </svg>
          <span class="text-sm/6 font-semibold">Google</span>
        </a>
      </div>
    </UCard>

  </div>
</template>
