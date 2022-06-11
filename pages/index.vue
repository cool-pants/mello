<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from '../store/store';
import Delete from './assets/Trash.vue';
import Trash from './assets/Trash.vue';

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
    <div>
        <h1>Home Page</h1>
        <h2>Recently Viewed</h2>
        <h2>Workspaces</h2>
        <input type="text" v-model="newWorkspaceName" @keyup.enter="createWorkspace" />
        <button @click="createWorkspace">Create a Workspace</button>
        <ul class="workspace-list">
            <li class="workspace-card" v-for="workspace in workspaceList" :key="workspace.id">
                <nuxt-link :to="`/workspace/${workspace.id}`">
                    <div>{{ workspace.id }}: {{ workspace.title }}</div>
                </nuxt-link>
                <Trash @click="workspaceStore.removeWorkspace(workspace.id)" />
            </li>
        </ul>
    </div>
</template>

<style>
.workspace-card {
    display: block;
    border: 2px solid #222;
    border-radius: 4px;
    padding: 2rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.workspace-list {
    margin-left: 0px;
    padding-left: 0px;
}
</style>
