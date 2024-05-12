<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Home, FilePlus, Archive } from "lucide-vue-next";
</script>

<template>
  <div class="flex h-screen bg-gray-100 dark:bg-black">
    <aside
      class="w-64 flex-shrink-0 sticky top-0 h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-600"
    >
      <div class="flex flex-col justify-between h-full">
        <div class="p-4">
          <NavigationMenu>
            <ul>
              <NavigationMenuItem>
                <NavigationMenuLink as-child>
                  <a
                    href="/app/dashboard"
                    class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Home class="w-5 h-5" />
                    <span>Dashboard</span>
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink as-child>
                  <a
                    href="/app/new-entry"
                    class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <FilePlus class="w-5 h-5" />
                    <span>New Entry</span>
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink as-child>
                  <a
                    href="/app/view-entries"
                    class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Archive class="w-5 h-5" />
                    <span>View Entries</span>
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </ul>
          </NavigationMenu>
        </div>
      </div>
    </aside>
    <main class="flex-grow p-4">
      <slot />
    </main>
  </div>
  <footer class="footer">
    <p>
      Made with ❤️ by
      <a href="https://github.com/Rohithgilla12">Rohith Gilla</a>
    </p>
  </footer>
</template>
