<script setup lang="ts">
import { Button } from "@/components/ui/button";

import EntryDetailsCard from "~/components/organisms/entry-details-card.vue";
import type { Entry } from "~/types/entry";

const { data, pending, refresh } = useFetch("/.netlify/functions/entries", {
  headers: {
    uid: useAuth().user?.id || "",
  },
  server: false,
});

const entries = computed(
  () => (data.value as { entries: Entry[] })?.entries
) as Ref<Entry[]>;
</script>

<template>
  <div>
    <p v-if="pending">Loading...</p>
    <div v-for="entry in entries">
      <EntryDetailsCard :entry="entry" />
    </div>
    <Button :variant="'outline'" @click="refresh">Refresh</Button>
  </div>
</template>
