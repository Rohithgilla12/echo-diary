<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Image, Mic } from "lucide-vue-next";

import { Label } from "@/components/ui/label";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import type { Entry } from "~/types/entry";

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const value = ref<DateValue>();
const body = ref<string>();
const image = ref<File | null>();
const audio = ref<File | null>();

const loading = ref(false);

const { toast } = useToast();

const updateImage = (e: any) => {
  image.value = e.target.files[0];
};

const updateAudio = (e: any) => {
  audio.value = e.target.files[0];
};

const supabase = useSupabaseClient();

//todo: move it to a better place later
const uploadFiles = async () => {
  const fileIds = [] as string[];
  try {
    if (image.value) {
      const { data, error } = await supabase.storage
        .from("entries")
        .upload(image.value.name, image.value);

      if (error) {
        toast({ description: error.message, title: "Error" });
      } else {
        fileIds.push(data.path);
      }
    }

    if (audio.value) {
      const { data, error } = await supabase.storage
        .from("entries")
        .upload(audio.value.name, audio.value);

      if (error) {
        toast({ description: error.message, title: "Error" });
      } else {
        fileIds.push(data.path);
      }
    }
  } catch (error) {
    toast({
      description: "Oops, error while uploading files to the ☁️",
      title: "Error",
    });
  } finally {
    return fileIds;
  }
};

const cleanUp = () => {
  body.value = "";
  image.value = null;
  audio.value = null;
};

const checkIfFieldsAreValid = () => {
  if (!value.value) {
    toast({
      description: "Please select a date.",
      title: "Error",
      variant: "destructive",
    });
    return false;
  }

  if (!body.value) {
    toast({
      description: "Please write something.",
      title: "Error",
      variant: "destructive",
    });
    return false;
  }

  return true;
};

const addEntryObject = async () => {
  if (!checkIfFieldsAreValid()) {
    return;
  }
  try {
    loading.value = true;
    const fileIds = await uploadFiles();

    const requestBody = {
      body: body.value,
      files: fileIds,
      date: value.value?.toString(),
      uid: useAuth().user?.id,
    } as Entry;

    $fetch("/.netlify/functions/add-entry", {
      method: "POST",
      body: JSON.stringify(requestBody),
      onResponse(response) {
        cleanUp();
        if (response.response.status === 200) {
          toast({
            description: "Entry saved successfully.",
            title: "Success",
          });
        } else {
          toast({
            description: "Oops, error while saving the entry.",
            title: "Error",
          });
        }
      },
    });
  } catch (error) {
    toast({
      description: "Oops, error while saving the entry.",
      title: "Error",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div id="new-entry" class="mb-6">
    <Card>
      <CardHeader>
        <CardTitle>Add a New Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="mb-4">
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-[280px] justify-start text-left font-normal',
                    !value && 'text-muted-foreground'
                  )
                "
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{
                  value
                    ? df.format(value.toDate(getLocalTimeZone()))
                    : "Pick a date"
                }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="value" initial-focus />
            </PopoverContent>
          </Popover>
          <div class="grid w-full gap-1.5">
            <Label htmlFor="content" class="my-2">What's on your mind</Label>
            <Textarea
              placeholder="I am feeling excited today..."
              class="mb-2"
              id="content"
              v-model="body"
            />
          </div>

          <div class="mt-4">
            <div class="flex flex-row space-x-8">
              <span>
                <label class="cursor-pointer" for="picture">
                  <Image class="mr-2 h-4 w-4" /> Upload Image
                </label>
                <Input
                  @change="updateImage"
                  id="picture"
                  type="file"
                  accept="image/*"
                />
              </span>
              <span>
                <label class="cursor-pointer" for="audio">
                  <Mic class="mr-2 h-4 w-4" /> Upload Audio
                </label>
                <Input
                  @change="updateAudio"
                  id="audio"
                  type="file"
                  accept="audio/*"
                />
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button v-if="loading" variant="ghost" disabled>Adding...</Button>
        <Button v-else variant="default" @click="() => addEntryObject()"
          >Save</Button
        >
        <Button variant="ghost">Cancel</Button>
      </CardFooter>
    </Card>
  </div>
</template>
