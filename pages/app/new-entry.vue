<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/toast";
import { formatISO } from "date-fns";
import { Calendar as CalendarIcon, Image, Mic } from "lucide-vue-next";
import { ref } from "vue";
import { cn } from "@/lib/utils";

import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const value = ref<DateValue>();

const { toast } = useToast();
</script>

<template>
  <div id="new-entry" class="mb-6">
    <Card>
      <CardHeader>
        <CardTitle>Add a New Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="mb-4">
          <Input placeholder="What's on your mind?" class="mb-2" />

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

          <div class="mt-4">
            <Button variant="secondary" class="mb-2" as-child>
              <label class="cursor-pointer">
                <Image class="mr-2 h-4 w-4" /> Upload Image
                <input type="file" class="hidden" accept="image/*" />
              </label>
            </Button>
            <Button variant="secondary" as-child>
              <label class="cursor-pointer">
                <Mic class="mr-2 h-4 w-4" /> Upload Audio
                <input type="file" class="hidden" accept="audio/*" />
              </label>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button
          variant="default"
          @click="() => toast({ description: 'Entry saved.' })"
          >Save</Button
        >
        <Button variant="ghost">Cancel</Button>
      </CardFooter>
    </Card>
  </div>
  <div id="view-entries">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">Past Entries</h2>
    <ScrollArea class="h-[400px] shadow border dark:border-gray-700">
      <ul class="space-y-2 p-4">
        <!-- content -->
      </ul>
    </ScrollArea>
  </div>
</template>
