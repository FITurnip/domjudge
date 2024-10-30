<template>
    <h1>Problem Set</h1>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Open</th>
                <th>Title</th>
                <th>Total Right Answer</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(problem, problemIndex) in problemData.list" :key="'problem_' + problemIndex">
                <td>
                    <router-link :to="{ name: 'player.problem.detail', params: { problem_id: problem.id }}" class="btn btn-sm btn-primary">
                        <i class="fas fa-eye p-0"></i>
                    </router-link>
                </td>
                <td>
                    {{  problem.title }}
                    <!-- <input type="text" :name="`title[${problemIndex}]`" class="form-control form-control-sm" v-model="problem.title"> -->
                </td>
                <td>{{ problem.total_right_answer }}</td>
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