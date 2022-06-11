import { identifier } from '@babel/types';
import { defineStore } from 'pinia';
import { supabase } from '~~/helpers/supabase';
import Workspace from '~~/types/workspace';

export const useStore = defineStore("workspace", {
    state: () => {
        var workspace: Workspace[];
        return {
            workspace: workspace
        }
    },
    getters:{
        getAllWorkspaces: (state) => state.workspace,
    },

    actions:{
        async fetchAllWorkspaces(){
            let { data, error, status } = await supabase
                                    .from("Workspaces")
                                    .select(`id, created_at, title, description`);
            if(data)
                this.workspace = data
            else
                console.log(error)
        },
        async addWorkspace(workspace: Workspace) {
            this.workspace.push(workspace)
            let {data, error, status} = await supabase
                        .from("Workspaces")
                        .insert({
                            id: workspace.id,
                            title: workspace.title,
                            description: workspace.description 
                        })
        },
        async removeWorkspace(id){
            var index = this.workspace.findIndex((e)=>e.id===id)
            this.workspace.splice(index, 1)
            await supabase
                        .from("Workspaces")
                        .delete()
                        .match({id: id})
        }
    }
})