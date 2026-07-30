<!-- 
    Generic list component.

    Renders a card with a table of times and Add / Edit / Remove controls.
    The item type `T` is a generic, so a parent decides what an "item" is and
    supplies the callbacks that create/edit them. Rendering of each item is
    delegated to the default slot, so this component stays type-agnostic.
-->
<script setup lang="ts" generic="T">
import { ref, computed, type Ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table'

const props = withDefaults(
    defineProps<{
        createItem: (current: T[]) => T | null | undefined | Promise<T | null | undefined>
        editItem?: (value: T) => T | null | undefined | Promise<T | null | undefined>
        initialItems?: T[]
        title?: string
        addLabel?: string
        removeLabel?: string
        editLabel?: string
    }>(),
    {
        editItem: undefined,
        initialItems: () => [],
        title: undefined,
        addLabel: 'Add',
        removeLabel: 'Remove',
        editLabel: 'Edit',
    },
)

const emit = defineEmits<{
    change: [values: T[]]
}>()

type Row = { key: number; value: T }

let seq = 0
const rows = ref(props.initialItems.map((value) => ({ key: seq++, value }))) as Ref<Row[]>
const values = computed(() => rows.value.map((r) => r.value))

function notify() {
    emit('change', values.value)
}

async function add() {
    const result = await props.createItem(values.value)
    if (result === null || result === undefined) return
    rows.value.push({ key: seq++, value: result })
    notify()
}

function remove(key: number) {
    rows.value = rows.value.filter((r) => r.key !== key)
    notify()
}

async function edit(row: Row) {
    if (!props.editItem) return
    const result = await props.editItem(row.value)
    if (result === null || result === undefined) return
    row.value = result
    notify()
}

function clear() {
    rows.value = []
    notify()
}

defineExpose({ add, clear, getValues: () => values.value })
</script>

<template>
    <Card class="w-96 max-w-full">
        <CardHeader v-if="title || $slots.title">
            <CardTitle>
                <slot name="title">{{ title }}</slot>
            </CardTitle>
        </CardHeader>

        <CardContent>
            <Table v-if="rows.length">
                <TableBody>
                    <TableRow v-for="(row, index) in rows" :key="row.key">
                        <TableCell>
                            <slot
                                :item="row.value"
                                :index="index"
                                :remove="() => remove(row.key)"
                                :edit="() => edit(row)"
                            >
                                {{ row.value }}
                            </slot>
                        </TableCell>
                        <TableCell>
                            <div class="flex justify-end gap-1.5">
                                <Button v-if="editItem" variant="outline" size="sm" type="button" @click="edit(row)">
                                    {{ editLabel }}
                                </Button>
                                <Button variant="destructive" size="sm" type="button" @click="remove(row.key)">
                                    {{ removeLabel }}
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div v-else class="text-muted-foreground py-6 text-center">
                <slot name="empty">Nothing here yet.</slot>
            </div>
        </CardContent>
        <CardFooter>
            <slot name="add" :add="add">
                <Button type="button" @click="add">
                    {{ addLabel }}
                </Button>
            </slot>
        </CardFooter>
    </Card>
</template>