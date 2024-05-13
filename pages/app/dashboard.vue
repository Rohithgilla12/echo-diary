<script setup lang="ts">
import AddMoodCard from "~/components/organisms/add-mood-card.vue";
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Echo Diary Dashboard</h1>
    <p class="text-gray-600 dark:text-gray-300 mb-8">
      Welcome to your personal AI powered diary. Access all your features from
      the sticky sidebar.
    </p>

    <div
      class="overflow-hidden mb-10 flex flex-row items-center justify-center w-50 h-50"
    >
      <img
        :src="'https://zenquotes.io/api/image'"
        alt="Inspirational Quote"
        class="object-cover w-50 h-50 rounded-xl"
      />
    </div>

    <Card>
      <CardHeader>Add your mood for the day!</CardHeader>
      <CardContent>
        <AddMoodCard />
      </CardContent>
    </Card>
  </div>
</template>
