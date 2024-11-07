<template>
    <h1>List of Problem Set</h1>
    <form action="">
        <div class="row">
            <div class="col-3">
                <label for="new_title" class="form-label">Title</label>
            </div>
            <div class="col-9">
                <input type="text" name="new_title" class="form-control form-control-sm" v-model="problemSetData.form_value.title">
            </div>
            <div class="col-3">
                <label for="new_isHidden" class="form-label">Hidden Problem Set</label>
            </div>
            <div class="col-9">
                <div class="row">
                    <div class="col-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="new_isHidden" :value="true" v-model="problemSetData.form_value.isHidden">
                            <label class="form-check-label" for="new_isHidden1">
                                Yes
                            </label>
                        </div>
                    </div>

                    <div class="col-9">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="new_isHidden" :value="false" v-model="problemSetData.form_value.isHidden">
                            <label class="form-check-label" for="new_isHidden2">
                                Don't Hide
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="d-flex justify-content-end">
                    <button class="btn btn-sm btn-primary"
                        type="button"
                        :disabled="!problemSetData.form_value.title"
                        @click="addProblemSet()">Save</button>
                </div>
            </div>
        </div>
    </form>
    <div class="d-flex justify-content-end gap-3">
        <button class="btn btn-sm btn-info">Import</button>
        <button class="btn btn-sm btn-primary">Export</button>
    </div>

    <!-- <pre>
        {{ problemSetData }}
    </pre> -->

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Open</th>
                <th><input type="checkbox" name="select_all" class="form-check form-check-sm" @change="selectAllProblemSet()" v-model="problemSetData.all_selected"></th>
                <th>Title</th>
                <th>Total Problem</th>
                <th>Hidden</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(problemSet, problemSetIndex) in problemSetData.list" :key="'problem_set_' + problemSetIndex">
                <td>
                    <router-link :to="{ name: 'admin.problem.list', params: { problem_set_id: problemSet.id }}" class="btn btn-sm btn-primary">
                        <i class="fas fa-eye p-0"></i>
                    </router-link>
                </td>
                <td>
                    <input type="checkbox" :name="`selection[${problemSetIndex}]`" class="form-check form-check-sm" v-model="problemSet.selected">
                </td>
                <td>
                    <input type="text" :name="`title[${problemSetIndex}]`" class="form-control form-control-sm" v-model="problemSet.title">
                </td>
                <td>{{ problemSet.total_problem }}</td>
                <td>
                <div class="row">
                    <div class="col-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" :name="`new_isHidden[${problemSetIndex}]`" :value="true" v-model="problemSet.isHidden">
                            <label class="form-check-label" :for="`new_isHidden1[${problemSetIndex}]`">
                                Yes
                            </label>
                        </div>
                    </div>

                    <div class="col-9">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" :name="`new_isHidden[${problemSetIndex}]`" :value="false" v-model="problemSet.isHidden">
                            <label class="form-check-label" :for="`new_isHidden2[${problemSetIndex}]`">
                                Don't Hide
                            </label>
                        </div>
                    </div>
                </div>
                </td>
                <td>
                    <div class="d-flex justify-content-center gap-3">
                        <button type="button" class="btn btn-sm btn-info">
                            <i class="fas fa-check p-0" @click="updateProblemSet(problemSetIndex)"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger" @click="removeProblemSet(problemSetIndex)">
                            <i class="fas fa-trash p-0"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import ProblemSet from '@/backend/ProblemSet';

export default defineComponent({
    name: "ProblemSetView",
    setup() {
        const problemSetData = reactive({
            form_value: {
                title: "" as string,
                isHidden: true as boolean,
            },
            list : [] as {
                id: any,
                selected: boolean,
                title: string,
                total_problem: number,
                isHidden: boolean,
            }[],
            all_selected: false
        });

        const initFormValue = () => {
            problemSetData.form_value = {
                title: "",
                isHidden: true
            }
        }

        const getProblemSetList = async () => {
            const { data } = await ProblemSet.getAll();
            const formatedData = data.map((item: any) => ({
                ...item,
                selected: false,
                total_problem: 0,
            }));
            
            problemSetData.list = formatedData;
        }

        const selectAllProblemSet = () => {
            problemSetData.list.forEach((problemSet) => {
                problemSet.selected = problemSetData.all_selected;
            });
        }

        const __addProblemSetToArray = (data: any) => {
            problemSetData.list.push(data);
        };

        const addProblemSet = async () => {       
            const { data } = await ProblemSet.create(problemSetData.form_value);

            const insertData = {
                ...problemSetData.form_value,
                id: data.id,
                selected: false,
                total_problem: 0,
            }

            __addProblemSetToArray(insertData);
            initFormValue();
        }

        const updateProblemSet = async (index: number) => {    
            const { data } = await ProblemSet.update(problemSetData.list[index]);
        }

        const removeProblemSet = async (index: number) => {
            const { data } = await ProblemSet.delete(problemSetData.list[index]);
            problemSetData.list.splice(index, 1);
        }

        onMounted(() => {
            getProblemSetList();
        });

        return {
            problemSetData,

            selectAllProblemSet,
            addProblemSet,
            updateProblemSet,
            removeProblemSet,
        }
    }
});
</script>