<script setup lang="ts">
const selectedMood = ref("");
const position = ref("bottom");
</script>

<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline"> Select Mood </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Mood for the day</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup v-model="selectedMood">
          <DropdownMenuRadioItem value="😟">😟 Concerned</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😢">😢 Sad</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😐">😐 Neutral</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="🙂"
            >🙂 Slightly Smiling</DropdownMenuRadioItem
          >
          <DropdownMenuRadioItem value="😄">😄 Happy</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😡">😡 Angry</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😨">😨 Fearful</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😴">😴 Tired</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😍">😍 Loving</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😌">😌 Relieved</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
