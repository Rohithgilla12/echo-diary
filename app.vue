<template>
  <header>
    <nav class="nav container">
      <h1 class="text-display-3">Echo Diary</h1>
      <div v-if="$auth.loggedIn">
        <div class="profile-blob">
          <img
            v-if="$auth.user.picture"
            class="avatar"
            :src="$auth.user.picture"
            alt="user profile avatar"
            referrerPolicy="no-referrer"
          />
          <div v-else class="avatar">
            {{ $auth.user?.given_name?.[0] }} {{ $auth.user?.family_name?.[0] }}
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
        <NuxtLink class="btn btn-ghost sign-in-btn" to="/api/login" external>
          Sign in
        </NuxtLink>
        <NuxtLink class="btn btn-dark" to="/api/register" external>
          Sign up
        </NuxtLink>
      </div>
    </nav>
  </header>
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
                    href="#dashboard"
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
                    href="#new-entry"
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
                    href="#view-entries"
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
      <NuxtPage />
    </main>
  </div>

  <footer class="footer">
    <p>
      Made with ❤️ by
      <a href="https://github.com/Rohithgilla12">Rohith Gilla</a>
    </p>
  </footer>
</template>

<script>
import "~/assets/css/globals.css";
import {
  Home,
  User,
  Search,
  FilePlus,
  Archive,
  Calendar as CalendarIcon,
  Image,
  Mic,
  Terminal,
} from "lucide-vue-next";
</script>
