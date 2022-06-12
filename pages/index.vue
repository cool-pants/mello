<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from '../store/store';
import Trash from './assets/Trash.vue';
import { WorkspaceCard } from '~~/.nuxt/components';

onMounted(() => {
    useStore().fetchAllWorkspaces();
})

const newWorkspaceName = ref<string>('')
const workspaceStore = useStore();

const createWorkspace = () => {
    const randomId = Math.floor(Math.random() * 1000)

    workspaceStore.addWorkspace({
        id: String(randomId),
        title: newWorkspaceName.value,
        description: null
    })
    newWorkspaceName.value = ""
}

const workspaceList = computed(() => workspaceStore.getAllWorkspaces)

</script>

<template>
    <div class="home">
        <h1>Home Page</h1>
        <h2>Workspaces</h2>
        <input type="text" v-model="newWorkspaceName" @keyup.enter="createWorkspace" />
        <button @click="createWorkspace">Create a Workspace</button>
        <div class="workspace-list">
            <WorkspaceCard v-for="workspace in workspaceList" :key="workspace.id" :workspace="workspace" />
        </div>
    </div>
</template>