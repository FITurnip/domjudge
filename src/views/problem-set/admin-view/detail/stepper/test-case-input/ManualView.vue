<template>
    <!-- <pre>{{ testCaseData }}</pre> -->

    <el-table :data="testCaseData.list" stripe>
        <el-table-column label="No.">
            <template #default="scope">
                {{ scope.$index + 1 }}
            </template>
        </el-table-column>
        <el-table-column label="Input File">
            <template #default="scope">
                <el-upload
                    :max-file-size="2 * 1024 * 1024"
                    :show-file-list="true"
                    :limit="1"
                    :on-change="(file) => handleFileChange(scope.$index, 'input_file', file)"
                    :auto-upload="false"
                >
                    <el-button size="small" type="primary">Upload Input</el-button>
                </el-upload>
            </template>
        </el-table-column>
        <el-table-column label="Output File">
            <template #default="scope">
                <el-upload
                    :max-file-size="2 * 1024 * 1024"
                    :show-file-list="true"
                    :limit="1"
                    :on-change="(file) => handleFileChange(scope.$index, 'output_file', file)"
                    :auto-upload="false"
                >
                    <el-button size="small" type="primary">Upload Output</el-button>
                </el-upload>
            </template>
        </el-table-column>
        <el-table-column label="Hidden Test Case">
            <template #default="scope">
                <el-radio-group v-model="scope.row.hidden_test_case">
                    <el-radio :label="true">Yes</el-radio>
                    <el-radio :label="false">Don't Hide</el-radio>
                </el-radio-group>
            </template>
        </el-table-column>
        <el-table-column label="Action">
            <template #default="scope">
                <div class="d-flex justify-content-center gap-3">
                    <template v-if="scope.row.id !== null">
                        <el-button size="mini" type="info">
                            <el-icon><check /></el-icon>
                        </el-button>
                        <el-button size="mini" type="danger" @click="removeTestCase(scope.$index)">
                            <el-icon><delete /></el-icon>
                        </el-button>
                    </template>
                    <template v-else>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="addNewTestCase()"
                            :disabled="!scope.row.input_file || !scope.row.output_file || !scope.row.hidden_test_case"
                        >
                            <el-icon><plus /></el-icon>
                        </el-button>
                    </template>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { ElIcon } from 'element-plus';
import { Check, Delete, Plus } from '@element-plus/icons-vue'; // Import the icons

export default defineComponent({
    name: "ManualView",
    components: {
        ElIcon,
        Check,
        Delete,
        Plus
    },
    setup() {
        const testCaseData = reactive({
            list: [] as { id: number | null, input_file: null, output_file: null, hidden_test_case: boolean }[],
        });

        const initTestCase = () => ({
            id: null,
            input_file: null,
            output_file: null,
            hidden_test_case: true,
        });

        const addNewTestCase = () => {
            const newTestCase = initTestCase();
            testCaseData.list.push(newTestCase);
        };

        const removeTestCase = (index: number) => {
            testCaseData.list.splice(index, 1);
        };

        // Handle file change for both input and output files
        const handleFileChange = (index: number, type : string, file) => {
            if (file && file.raw) {
                testCaseData.list[index][type] = file.raw;
            } else {
                // Reset the field if no file is selected
                testCaseData.list[index][type] = null;
            }
        };

        onMounted(() => {
            testCaseData.list = [
                { id: 1, input_file: null, output_file: null, hidden_test_case: true },
                { id: 2, input_file: null, output_file: null, hidden_test_case: false },
                { id: 3, input_file: null, output_file: null, hidden_test_case: true },
            ];
            addNewTestCase(); // Add a new test case row at the end
        });

        return {
            testCaseData,
            addNewTestCase,
            removeTestCase,
            handleFileChange, // Make the file change handler available in the template
        };
    },
});
</script>

<style scoped>
/* Add any necessary styling here */
</style>
