<template>
    <div class="row">
        <div class="col-6">
            <div class="row">
                <div class="col-3">
                    <label for="generator" class="form-label">Generator</label>
                </div>
                <div class="col-9">
                    <el-upload
                        class="upload-demo"
                        :max-file-size="2 * 1024 * 1024"
                        :show-file-list="false"
                        :auto-upload="false"
                        :before-upload="handleGeneratorFileUpload"
                        :file-list="testCaseData.generator.input_file ? [testCaseData.generator.input_file] : []"
                        @change="handleInputFile(testCaseData.generator, $event)"
                    >
                        <el-button size="small" type="primary">Upload Generator File</el-button>
                    </el-upload>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-sm btn-primary" @click="generate">
                    Generate
                </button>
            </div>
        </div>

        <div class="col-12">
            <p>Return Output</p>
            <p>Lorem ipsum</p>
        </div>
    </div>

    <!-- <pre>{{ testCaseData }}</pre> -->

    <el-table :data="testCaseData.list" stripe>
        <el-table-column label="No.">
            <template #default="{ $index }">
                {{ $index + 1 }}
            </template>
        </el-table-column>
        <el-table-column label="Input File">
            <template #default="{ row }">
                <el-upload
                    class="upload-demo"
                    :max-file-size="2 * 1024 * 1024"
                    :show-file-list="true"
                    :limit="1"
                    :auto-upload="false"
                    :file-list="row.input_file ? [row.input_file] : []"
                    @change="handleInputFile(row, $event)"
                >
                    <el-button size="small" type="primary">Upload Input File</el-button>
                </el-upload>
            </template>
        </el-table-column>
        <el-table-column label="Hidden Test Case">
            <template #default="{ row }">
                <div class="row">
                    <div class="col-3">
                        <el-radio v-model="row.hidden_test_case" :label="true">Yes</el-radio>
                    </div>
                    <div class="col-9">
                        <el-radio v-model="row.hidden_test_case" :label="false">Don't Hide</el-radio>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Action">
            <template #default="{ $index }">
                <div class="d-flex justify-content-center">
                    <el-button size="mini" type="danger" @click="removeTestCase($index)">
                        <el-icon><delete /></el-icon> <!-- Use Element Plus icons -->
                    </el-button>
                    <el-button size="mini" type="primary"  @click="addTestCaseFormValue()">
                        <el-icon><plus /></el-icon>
                    </el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>

    <!-- <table class="table table-striped">
        <thead>
            <tr>
                <th>No.</th>
                <th>Input File</th>
                <th>Output File</th>
                <th>Hidden Test Case</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(testCase, testCaseIndex) in testCaseData.list" :key="'test_case' + testCaseIndex">
                <td>{{ testCaseIndex + 1 }}</td>
                <td>
                    <el-upload
                        class="upload-demo"
                        :max-file-size="2 * 1024 * 1024"
                        :show-file-list="true"
                        :limit="1"
                        :auto-upload="false"
                        :file-list="testCase.input_file ? [testCase.input_file] : []"
                        @change="handleInputFile(testCase, $event)"
                    >
                        <el-button size="small" type="primary">Upload Input File</el-button>
                    </el-upload>
                </td>
                <td>
                    <el-icon><file-icon /></el-icon>
                </td>
                <td>
                    <div class="row">
                        <div class="col-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" :name="`hidden_test_case[${testCaseIndex}]`" v-model="testCase.hidden_test_case" :value="true">
                                <label class="form-check-label">Yes</label>
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" :name="`hidden_test_case[${testCaseIndex}]`" v-model="testCase.hidden_test_case" :value="false">
                                <label class="form-check-label">Don't Hide</label>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-sm btn-danger" @click="removeTestCase(testCaseIndex)">
                            <el-icon><delete /></el-icon>
                        </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td>{{ testCaseData.list.length + 1 }}</td>
                <td>
                    <el-upload
                        class="upload-demo"
                        :max-file-size="2 * 1024 * 1024"
                        :show-file-list="true"
                        :limit="1"
                        :auto-upload="false"
                        :file-list="testCaseData.new_form_value.input_file ? [testCaseData.new_form_value.input_file] : []"
                        @change="handleInputFile(testCaseData.new_form_value, $event)"
                    >
                        <el-button size="small" type="primary">Upload New Input File</el-button>
                    </el-upload>
                </td>
                <td></td>
                <td>
                    <div class="row">
                        <div class="col-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="new_hidden_test_case" :value="true" v-model="testCaseData.new_form_value.hidden_test_case">
                                <label class="form-check-label">Yes</label>
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="new_hidden_test_case" :value="false" v-model="testCaseData.new_form_value.hidden_test_case">
                                <label class="form-check-label">Don't Hide</label>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-sm btn-primary"
                            @click="addTestCaseFormValue()"
                            :disabled="!testCaseData.new_form_value.input_file || !testCaseData.new_form_value.hidden_test_case">
                            <el-icon><plus /></el-icon>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { ElIcon } from 'element-plus';
import { Delete, Plus } from '@element-plus/icons-vue'; // Importing Element Plus icons

export default defineComponent({
    name: "GeneratorInputView",
    components: {
        ElIcon,
        // File as FileIcon,
        Delete,
        Plus
    },
    setup() {
        const testCaseData = reactive({
            list: [] as {
                id: number | null,
                input_file: File | null,
                output_file: string | null,
                hidden_test_case: boolean
            }[],
            new_form_value: {
                input_file: null as File | null,
                hidden_test_case: true,
            },
            generator: {
                input_file: null as File | null,
            }
        });

        const getTestCaseData = () => {
            testCaseData.list = [
                { id: 1, input_file: null, output_file: 'test', hidden_test_case: true },
                { id: 2, input_file: null, output_file: 'test', hidden_test_case: false },
                { id: 3, input_file: null, output_file: 'test', hidden_test_case: true },
            ];
        };

        const initTestCase = () => ({ id: null, input_file: null, output_file: null, hidden_test_case: true });

        const addTestCaseFormValue = () => {
            const newTestCase = initTestCase();
            testCaseData.list.push(newTestCase);
        };

        const removeTestCase = (index) => {
            testCaseData.list.splice(index, 1);
        };

        const handleInputFile = (testCase, event) => {
            const files = event.fileList; // Get the file list from the event
            if (files && files.length > 0) {
                testCase.input_file = files[0].raw; // Store the raw file
            }
        };

        const handleGeneratorFileUpload = (file) => {
            testCaseData.generator.input_file = file.raw; // Store the raw file for generator
            return false; // Prevent auto-upload
        };

        onMounted(() => {
            getTestCaseData();
        });

        return {
            testCaseData,
            handleInputFile,
            handleGeneratorFileUpload,
            addTestCaseFormValue,
            removeTestCase,
        };
    }
});
</script>