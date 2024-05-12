<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Home, FilePlus, Archive, Image } from "lucide-vue-next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-4">
          <div>
            <a
              href="#"
              class="flex items-center py-5 px-2 text-gray-700 dark:text-gray-200"
            >
              <Image class="mr-2 h-6 w-6" />
              <span class="font-bold">Echo Diary</span>
            </a>
          </div>
          <div class="hidden md:flex items-center space-x-1">
            <NuxtLink to="/app">
              <p
                class="py-5 px-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
              >
                Home
              </p>
            </NuxtLink>
          </div>
        </div>
        <div class="hidden md:flex items-center space-x-1">
          <div v-if="$auth.loggedIn">
            <div class="flex flex-row space-x-4">
              <Avatar v-if="$auth.user.picture">
                <AvatarImage
                  :src="$auth.user.picture"
                  alt="user profile avatar"
                />
                <AvatarFallback>
                  {{ $auth.user?.given_name?.[0] }}
                  {{ $auth.user?.family_name?.[0] }}
                </AvatarFallback>
              </Avatar>
              <div v-else class="avatar">
                {{ $auth.user?.given_name?.[0] }}
                {{ $auth.user?.family_name?.[0] }}
              </div>
              <div>
                <p class="text-heading-2">
                  {{ $auth.user?.given_name }} {{ $auth.user?.family_name }}
                </p>
                <NuxtLink class="text-subtle" to="/api/logout" external>
                  Log out
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-else>
            <NuxtLink
              class="btn btn-ghost sign-in-btn"
              to="/api/login"
              external
            >
              Sign in
            </NuxtLink>
            <NuxtLink class="btn btn-dark" to="/api/register" external>
              Sign up
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
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
                  <NuxtLink to="/app/dashboard">
                    <span
                      class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Home class="w-5 h-5" />
                      <span>Dashboard</span>
                    </span>
                  </NuxtLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink as-child>
                  <NuxtLink href="/app/new-entry">
                    <span
                      class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <FilePlus class="w-5 h-5" />
                      <span>New Entry</span>
                    </span>
                  </NuxtLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink as-child>
                  <NuxtLink to="/app/view-entries">
                    <span
                      class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Archive class="w-5 h-5" />
                      <span>View Entries</span>
                    </span>
                  </NuxtLink>
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
