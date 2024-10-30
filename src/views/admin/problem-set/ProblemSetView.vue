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
                <label for="new_hidden_problem_set" class="form-label">Hidden Problem Set</label>
            </div>
            <div class="col-9">
                <div class="row">
                    <div class="col-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="new_hidden_problem_set" :value="true" v-model="problemSetData.form_value.hidden_problem_set">
                            <label class="form-check-label" for="new_hidden_problem_set1">
                                Yes
                            </label>
                        </div>
                    </div>

                    <div class="col-9">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="new_hidden_problem_set" :value="false" v-model="problemSetData.form_value.hidden_problem_set">
                            <label class="form-check-label" for="new_hidden_problem_set2">
                                Don't Hide
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="d-flex justify-content-end">
                    <button class="btn btn-sm btn-primary"
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
                            <input class="form-check-input" type="radio" name="new_hidden_problem_set" :value="true" v-model="problemSetData.form_value.hidden_problem_set">
                            <label class="form-check-label" for="new_hidden_problem_set1">
                                Yes
                            </label>
                        </div>
                    </div>

                    <div class="col-9">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="new_hidden_problem_set" :value="false" v-model="problemSetData.form_value.hidden_problem_set">
                            <label class="form-check-label" for="new_hidden_problem_set2">
                                Don't Hide
                            </label>
                        </div>
                    </div>
                </div>
                </td>
                <td>
                    <div class="d-flex justify-content-center gap-3">
                        <button type="button" class="btn btn-sm btn-info">
                            <i class="fas fa-check p-0"></i>
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

export default defineComponent({
    name: "ProblemSetView",
    setup() {
        const problemSetData = reactive({
            form_value: {
                title: "" as string,
                hidden_problem_set: true as boolean,
            },
            list : [] as {
                id: null,
                selected: boolean,
                title: string,
                total_problem: number,
            }[],
            all_selected: false
        });

        const initFormValue = () => {
            problemSetData.form_value = {
                title: "",
                hidden_problem_set: true
            }
        }

        const getProblemSetList = () => {
            problemSetData.list = [
                {
                    id: 1,
                    selected: false,
                    title: "problem set a",
                    total_problem: 2
                },
                {
                    id: 2,
                    selected: false,
                    title: "problem set b",
                    total_problem: 3
                }
            ];
        }

        const selectAllProblemSet = () => {
            problemSetData.list.forEach((problemSet) => {
                problemSet.selected = problemSetData.all_selected;
            });
        }

        const __addProblemSetToArray = (data) => {
            problemSetData.list.push(data);
        };

        const addProblemSet = () => {
            const dummyData = {
                ...problemSetData.form_value,
                id: 3,
                selected: false,
                total_problem: 0,
            }

            __addProblemSetToArray(dummyData);
            initFormValue();
        }

        const removeProblemSet = (index) => {
            problemSetData.list.splice(index, 1)
        }

        onMounted(() => {
            getProblemSetList();
        });

        return {
            problemSetData,

            selectAllProblemSet,
            addProblemSet,
            removeProblemSet
        }
    }
});
</script>