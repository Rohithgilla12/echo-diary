<template>
  <div class="container">
    <div class="card start-hero">
      <p class="text-body-2 start-hero-intro">Woohoo!</p>
      <p class="text-display-2">
        Your authentication is all sorted.
        <br />
        Build the important stuff.
      </p>
      <p>{{ JSON.stringify(user, null, 2) }}</p>
    </div>
    <section class="next-steps-section">
      <h2 class="text-heading-1">Next steps for you</h2>
      <Button>Button</Button>
      <Alert>
        <Home class="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Home } from "lucide-vue-next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const client = useAuth();
const user = client.user;

definePageMeta({
  middleware: ["auth-logged-in"],
});
</script>
