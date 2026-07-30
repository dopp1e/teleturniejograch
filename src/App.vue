<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { HomeIcon } from "lucide-vue-next";
import NavIcon from "@/components/NavIcon.vue";
</script>

<template>
  <div class="h-screen flex flex-col">
    <RouterView class="grow" />
    <Separator />
    <NavigationMenu class="flex-none w-screen">
      <NavigationMenuList class="flex gap-4">
        <NavigationMenuItem class="flex-1 p-2">
          <NavigationMenuLink as-child>
            <RouterLink to="/"
              ><NavIcon text="Home"><HomeIcon></HomeIcon></NavIcon
            ></RouterLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem class="flex-1">
          <NavigationMenuLink as-child>
            <RouterLink to="/about">About</RouterLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem class="flex-1">
          <NavigationMenuLink as-child>
            <RouterLink to="/bracket">Bracket</RouterLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
