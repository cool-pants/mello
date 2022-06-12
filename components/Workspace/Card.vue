<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useStore } from '~~/store/store';
import Workspace from '~~/types/workspace';
import Trash from '~~/pages/assets/Trash.vue';

const props = defineProps<{
    workspace: Workspace
}>()

const workspaceStore = useStore();

const compDesc = computed(() => {
    if (props.workspace.description.length > 15)
        return props.workspace.description.slice(0, 10) + "...."
    return props.workspace.description
})

</script>

<template>
    <div class="workspace-card">
        <div class="workspace-title">
            <p>#{{ props.workspace.id }}</p>
            <Trash @click="workspaceStore.removeWorkspace(props.workspace.id)" />
        </div>
        <div class="workspace-body">
            <div class="workspace-head"> {{ props.workspace.title }} </div>
            <div class="workspace-desc" v-if="props.workspace.description !== null">
                {{ compDesc }}
            </div>
        </div>
        <nuxt-link class="workspace-link" :to="`/workspace/${props.workspace.id}`">
            Explore...
        </nuxt-link>
    </div>
</template>

<style lang="scss" scoped>
.workspace-title {
    p {
        font-weight: 900;
        margin: 0px;
    }
}

.workspace-head {
    font-size: 18px;
    text-decoration: underline;
}

.workspace-body {
    font-size: 12px;
    margin-top: 5px;
}

.workspace-link {
    font-size: 10px;
    color: rgba($color: #1466c4, $alpha: 1.0);
}
</style>