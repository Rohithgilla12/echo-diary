<template>
  <div class="container">
    <h1>Please Login to continue</h1>

    <div>
      <NuxtLink class="btn btn-ghost sign-in-btn" to="/api/login" external>
        Sign in
      </NuxtLink>
      <NuxtLink class="btn btn-dark" to="/api/register" external>
        Sign up
      </NuxtLink>
    </div>
  </div>
</template>
