<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from '../store/store';

interface Workspace {
    id: string,
    name: string
}

const newWorkspaceName = ref<string>('')
const workspaceStore = useStore();

const createWorkspace = () => {
    const randomId = Math.floor(Math.random() * 1000)

    workspaceStore.addWorkspace({
        id: String(randomId),
        name: newWorkspaceName.value
    })
    newWorkspaceName.value = ""
}

const workspaceList = computed(() => workspaceStore.getAllWorkspaces)

</script>

<template>
    <h1>Home Page</h1>
    <h2>Recently Viewed</h2>
    <h2>Workspaces</h2>
    <input type="text" v-model="newWorkspaceName" @keyup.enter="createWorkspace" />
    <button @click="createWorkspace">Create a Workspace</button>
    <ul class="workspace-list">
        <li class="workspace-card" v-for="workspace in workspaceList" :key="workspace.id">
            {{ workspace.id }}: {{ workspace.name }}
        </li>
    </ul>
</template>

<style>
.workspace-card {
    display: block;
    border: 2px solid #222;
    border-radius: 4px;
    padding: 2rem;
    margin-bottom: 1rem;
}

.workspace-list {
    margin-left: 0px;
    padding-left: 0px;
}
</style>
