<script setup lang="ts">
import type { Entry } from "~/types/entry";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { getPublicUrls, isAudioFile, isImageFile } from "~/lib/utils";

const props = defineProps<{
  entry: Entry;
}>();

const urls = getPublicUrls(props.entry.files);

const audioUrl = computed(() => urls.find((url) => isAudioFile(url)));
const imageUrl = computed(() => urls.find((url) => isImageFile(url)));
</script>

<template>
  <div>
    <Card class="mb-8">
      <CardHeader>
        <CardDescription class="text-sm">{{ entry.date }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-200 mb-4">
            {{ entry.body }}
          </p>
          <div class="flex items-center space-x-4">
            <NuxtImg
              :src="imageUrl"
              alt="entry image"
              class="w-20 h-20 rounded-md shadow"
              v-if="imageUrl"
            />
            <!-- <img
                src="/placeholder.svg"
                alt="placeholder"
                class="w-20 h-20 rounded-md shadow"
              /> -->
            <audio controls :src="audioUrl" class="max-w-lg" v-if="audioUrl">
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
