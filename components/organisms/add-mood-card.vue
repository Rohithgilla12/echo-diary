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
          <DropdownMenuRadioItem value="😡">😡</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😔">😔</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😐">😐</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😊">😊</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="😃">😃</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
