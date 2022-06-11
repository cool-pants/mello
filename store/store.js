import { defineStore, acceptHMRUpdate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useStore = defineStore("workspace", {
    state: () => {
        return {
            workspace: useLocalStorage("workspace", [])
        }
    },
    getters:{
        getAllWorkspaces(){
            return this.workspace;
        }
    },

    actions:{
        addWorkspace(workspace) {
            this.workspace.push(workspace);
        },
        removeWorkspace(id){
            var index = this.workspace.findIndex((e)=>e.id===id)
            this.workspace.splice(index, 1)
        }
    }
})