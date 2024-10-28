<template>
    <h1>Problem Set</h1>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Open</th>
                <th>Title</th>
                <th>Hidden</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(problem, problemIndex) in problemData.list" :key="'problem_' + problemIndex">
                <td>
                    <router-link :to="{ name: 'problem.detail', params: { problem_id: problem.id }}" class="btn btn-sm btn-primary">
                        <i class="fas fa-eye p-0"></i>
                    </router-link>
                </td>
                <td>
                    <input type="text" :name="`title[${problemIndex}]`" class="form-control form-control-sm" v-model="problem.title">
                </td>
                <td>
                <div class="row">
                    <div class="col-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="new_hidden_problem" :value="true" v-model="problemData.form_value.hidden_problem">
                            <label class="form-check-label" for="new_hidden_problem1">
                                Yes
                            </label>
                        </div>
                    </div>

                    <div class="col-9">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="new_hidden_problem" :value="false" v-model="problemData.form_value.hidden_problem">
                            <label class="form-check-label" for="new_hidden_problem2">
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
                        <button type="button" class="btn btn-sm btn-danger" @click="removeProblem(problemIndex)">
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
import { useRoute } from "vue-router";

export default defineComponent({
    name: "ProblemView",
    setup() {
        const route = useRoute();
        const problemSetId = route.params.problem_set_id;

        const problemData = reactive({
            form_value: {
                title: "" as string,
                hidden_problem: true as boolean,
            },
            list : [] as {
                id: null,
                selected: boolean,
                title: string,
            }[],
            all_selected: false
        });

        const initFormValue = () => {
            problemData.form_value = {
                title: "",
                hidden_problem: true
            }
        }

        const getProblemList = () => {
            problemData.list = [
                {
                    id: 1,
                    selected: false,
                    title: "problem a",
                },
                {
                    id: 2,
                    selected: false,
                    title: "problem b",
                }
            ];
        }

        const selectAllProblem = () => {
            problemData.list.forEach((problem) => {
                problem.selected = problemData.all_selected;
            });
        }

        const __addProblemToArray = (data) => {
            problemData.list.push(data);
        };

        const addProblem = () => {
            const dummyData = {
                ...problemData.form_value,
                id: 3,
                selected: false,
            }

            __addProblemToArray(dummyData);
            initFormValue();
        }

        const removeProblem = (index) => {
            problemData.list.splice(index, 1)
        }

        onMounted(() => {
            getProblemList();
        });

        return {
            problemSetId,

            problemData,

            selectAllProblem,
            addProblem,
            removeProblem,
        }
    }
})
</script>