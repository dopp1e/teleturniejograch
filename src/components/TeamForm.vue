<!-- 
    TeamForm component.

    A modal for creating or editing a Team. Exposes an imperative `open(initial)`
    method that shows the dialog and returns a Promise resolving to the resulting
    Team, or a null if the user canceles. Pass a partial Team to edit an existing one
    (its id switches the title to "Edit team"); pass nothing to create a new one
    with a freshly generated id. Members are edited as a dynamic list of text
    inputs, each tracked by a stable sythetic key.
-->
<script setup lang="ts">
import { ref } from 'vue'
import type { Team } from '@/lib/teams'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-vue-next'
import {
    ColorPickerRoot,
    ColorPickerCanvas,
    ColorPickerSliderHue,
    ColorPickerSliderAlpha,
    ColorPickerSwatch,
    ColorPickerInputHex,
    ColorPickerEyeDropper,
} from '@vuelor/picker'

type MemberRow = { key: number; value: string }

const PRESETS = [
    '#F87171', '#FB923C', '#FBBF24', '#34D399',
    '#60A5FA', '#A78BFA', '#F472B6', '#94A3B8',
]


const visible = ref(false)
const title = ref('New team')
const draft = ref<{ id: string; name: string; hexColor:string; members: MemberRow[] }>({
    id: '',
    name: '',
    hexColor: randomPreset(),
    members: [],
})

let seq = 0
let resolver: ((team: Team | null) => void) | null = null

function randomPreset(): string {
    return PRESETS[Math.floor(Math.random() * PRESETS.length)] ?? PRESETS[0]!
}

function newId(): string {
    return globalThis.crypto?.randomUUID?.() ?? `t_${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`
}

function open(initial: Partial<Team> = {}): Promise<Team | null> {
    title.value = initial.id ? 'Edit team' : 'New team'
    draft.value = {
        id: initial.id ?? newId(),
        name: initial.name ?? '',
        hexColor: initial.hexColor ?? randomPreset(),
        members: (initial.members ?? []).map((value) => ({ key: seq++, value })),
    }
    visible.value = true
    return new Promise((resolve) => {
        resolver = resolve
    })
}

function addMember() {
    draft.value.members.push({ key: seq++, value: '' })
}

function removeMember(key: number) {
    draft.value.members = draft.value.members.filter((m) => m.key !== key)
}

function save() {
    const name = draft.value.name.trim()
    if (!name) return
    const resolve = resolver
    resolver = null
    visible.value = false
    resolve?.({
        id: draft.value.id,
        name,
        hexColor: draft.value.hexColor,
        members: draft.value.members.map((m) => m.value.trim()).filter(Boolean),
    })
}

function cancel() {
    const resolve = resolver
    resolver = null
    visible.value = false
    resolve?.(null)
}

function onOpenChange(next: boolean) {
    if (!next) cancel()
}

defineExpose({ open })
</script>

<template>
    <Dialog :open="visible" @update:open="onOpenChange">
        <DialogContent class="text-foreground">
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
            </DialogHeader>

            <div class="grid gap-4 py-2">
                <div class="grid gap-2">
                    <Label for="team-name">Team name</Label>
                    <Input id="team-name" v-model="draft.name" placeholder="e.g. Red Rockets" @keyup.enter="save" />
                </div>

                <div class="grid gap-2">
                    <Label class="flex items-center gap-2">
                        Team color
                        <span
                            class="inline-block size-3 rounded-full border"
                            :style="{ backgroundColor: draft.hexColor }"
                        />
                    </Label>
                    <ColorPickerRoot v-model="draft.hexColor" format="hex" class="grid gap-3">
                        <ColorPickerCanvas class="h-40 w-full rounded-md" />
                        <ColorPickerSliderHue />
                        <div class="flex flex-wrap gap-1">
                            <ColorPickerSwatch v-for="preset in PRESETS" :key="preset" :value="preset" />
                        </div>
                        <div class="flex items-center gap-2">
                            <ColorPickerInputHex class="flex-1" />
                            <ColorPickerEyeDropper />
                        </div>
                    </ColorPickerRoot>
                </div>

                <div class="grid gap-2">
                    <Label>Members</Label>
                    <div v-for="member in draft.members" :key="member.key" class="flex items-center gap-2">
                        <Input v-model="member.value" placeholder="Member name" class="flex-1" @keyup.enter="save" />
                        <Button type="button" variant="outline" size="icon" aria-label="Remove member" @click="removeMember(member.key)">
                            <X class="size-4" />
                        </Button>
                    </div>
                    <Button type="button" variant="outline" size="sm" class="justify-self-start" @click="addMember">
                        + Add member
                    </Button>
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" @click="cancel">Cancel</Button>
                <Button type="button" @click="save">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>