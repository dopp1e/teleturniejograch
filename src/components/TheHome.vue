<script setup lang="ts">
import type { Team, Result } from "@/lib";

let teamA: Team = {
  id: "1",
  name: "Team A",
  members: ["Alice", "Bob"],
};
let teamB: Team = {
  id: "2",
  name: "Team B",
  members: ["Charlie", "David"],
};
let teamC: Team = {
  id: "3",
  name: "Team C",
  members: ["Eve", "Frank"],
};

let result: Result = {
  teamIdA: teamA.id,
  teamIdB: teamB.id,
  scoreA: 0,
  scoreB: 0,
};

let results: Result[] = [result];
let teams: Team[] = [teamA, teamB, teamC];
</script>

<template>
  <!-- TODO: GRID -->
</template>
