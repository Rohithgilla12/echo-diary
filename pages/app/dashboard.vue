<script setup lang="ts">
import { useToast } from "~/components/ui/toast";
import type { Mood } from "~/types/entry";

import { formatDate } from "@vueuse/core";
import { groupByMoodCount } from "~/lib/utils";

const { data: moods, refresh } = useFetch("/.netlify/functions/moods", {
  headers: {
    uid: useAuth().user?.id || "",
  },
  server: false,
});

const selectedMood = ref("");
const loading = ref(false);

const { toast } = useToast();

const moodsList = computed(
  () => (moods?.value as { moods: Mood[] })?.moods
) as Ref<Mood[]>;

const hasTodayEntry = computed(() => {
  if (moodsList.value === undefined) return false;
  return moodsList.value.some(
    (mood) => new Date(mood.date).toDateString() === new Date().toDateString()
  );
});

const groupedMoods = computed(() => {
  return groupByMoodCount(moodsList?.value ?? []);
});

const addMoodObject = async () => {
  if (!selectedMood.value) {
    toast({
      description: "Please select a mood.",
      title: "Error",
      variant: "destructive",
    });
    return;
  }

  try {
    loading.value = true;
    await $fetch("/.netlify/functions/add-mood", {
      method: "POST",
      body: JSON.stringify({
        mood: selectedMood.value,
        uid: useAuth().user?.id,
        date: formatDate(new Date(), "yyyy-MM-dd"),
      } as Mood),
    });
    toast({
      description: "Mood added successfully.",
      title: "Success",
    });
    refresh();
  } catch (error) {
    toast({
      description: "Oops, error while saving the mood. Please try again.",
      title: "Error",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};
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
        <p v-if="hasTodayEntry" class="text-muted-foreground">
          You have already added your mood for today.
        </p>
        <div v-else>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline">
                Select Mood {{ selectedMood }}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
              <DropdownMenuLabel>Mood for the day</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup v-model="selectedMood">
                <DropdownMenuRadioItem value="😟"
                  >😟 Concerned</DropdownMenuRadioItem
                >
                <DropdownMenuRadioItem value="😢">😢 Sad</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="😐"
                  >😐 Neutral</DropdownMenuRadioItem
                >
                <DropdownMenuRadioItem value="🙂"
                  >🙂 Slightly Smiling</DropdownMenuRadioItem
                >
                <DropdownMenuRadioItem value="😄"
                  >😄 Happy</DropdownMenuRadioItem
                >
                <DropdownMenuRadioItem value="😡"
                  >😡 Angry</DropdownMenuRadioItem
                >
                <DropdownMenuRadioItem value="😨"
                  >😨 Fearful</DropdownMenuRadioItem
                >
                <DropdownMenuRadioItem value="😴"
                  >😴 Tired</DropdownMenuRadioItem
                >
                <DropdownMenuRadioItem value="😍"
                  >😍 Loving</DropdownMenuRadioItem
                >
                <DropdownMenuRadioItem value="😌"
                  >😌 Relieved</DropdownMenuRadioItem
                >
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      <BarChart
        index="name"
        :data="groupedMoods"
        :categories="['count']"
        :rounded-corners="4"
      />

      <CardFooter v-if="!hasTodayEntry">
        <p v-if="loading">Adding your mood</p>
        <Button v-else @click="addMoodObject()"
          >Add today's mood as {{ selectedMood }}?</Button
        >
      </CardFooter>
    </Card>
  </div>
</template>
