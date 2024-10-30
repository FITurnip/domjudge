<template>
    <h1>Problem Set</h1>
    <!-- <pre>
        {{ problemSetData }}
    </pre> -->

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Open</th>
                <th>Title</th>
                <th>Total Right Answer</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(problemSet, problemSetIndex) in problemSetData.list" :key="'problem_set_' + problemSetIndex">
                <td>
                    <router-link :to="{ name: 'player.problem.list', params: { problem_set_id: problemSet.id }}" class="btn btn-sm btn-primary">
                        <i class="fas fa-eye p-0"></i>
                    </router-link>
                </td>
                <td>{{ problemSet.title }}</td>
                <td>{{ problemSet.total_right_answer }}</td>
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
                total_right_answer: number,
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
                    total_right_answer: 2
                },
                {
                    id: 2,
                    selected: false,
                    title: "problem set b",
                    total_right_answer: 3
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
                total_right_answer: 0,
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