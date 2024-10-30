<template>
    <div>
        <el-card>
            <div>
                <h2>Problem A</h2>
            </div>
            <div>
                <div>
                    <h3>Problem Statement</h3>
                    <p>Description of the problem goes here.</p>
                </div>

                <el-divider></el-divider>
                <div>
                    <h3>Input Format</h3>
                    <pre>Format</pre>
                </div>

                <el-divider></el-divider>
                <div>
                    <h3>Output Format</h3>
                    <pre>Format</pre>
                </div>

                <el-divider></el-divider>
                <div>
                    <h3>Constraints</h3>
                    <pre>Format</pre>
                </div>
            </div>
        </el-card>

        <el-card class="mt-4">
            <h3>Test Cases</h3>
            <ul class="test-case-list">
                <li v-for="(testCase, index) in testCases" :key="index" :id="'test-case-' + index">
                    <strong>Test Case {{ index + 1 }}:</strong><br />
                    <span><strong>Input:</strong> <pre>{{ testCase.input }}</pre></span><br />
                    <span><strong>Output:</strong> <pre>{{ testCase.output }}</pre></span>
                    <el-divider v-if="index < testCases.length - 1"></el-divider>
                </li>
            </ul>
        </el-card>

        <el-card class="mt-4">
            <el-tabs
                v-model="activeName"
                type="card"
                class="full-width-tabs"
                @tab-click="handleClick"
            >
                <el-tab-pane label="Source Code" name="source_code">
                    <el-upload
                        class="upload-demo"
                        drag
                        multiple
                        action="#"
                        :on-change="handleFileChange"
                        :show-file-list="false"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">Drag files here or click to upload</div>
                    </el-upload>
                    <el-button type="primary" @click="submitSourceCode">Submit</el-button>
                </el-tab-pane>

                <el-tab-pane label="Result" name="result">
                    <el-table :data="testResults" style="width: 100%">
                        <el-table-column prop="number" label="No." width="100" align="center" />
                        <el-table-column prop="testCase" label="Test Case">
                            <template #default="{ row }">
                                <div @click="scrollToTestCase(row.number - 1)" style="cursor: pointer;">
                                    {{ row.testCase }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="result" label="Result" align="center">
                            <template #default="{ row }">
                                <el-badge :value="row.result" :type="badgeType(row.result)" 
                                          @click.stop="scrollToTestCase(row.number - 1)" 
                                          class="clickable-badge" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { TabsPaneContext } from 'element-plus';

export default defineComponent({
    name: "ProblemDetailView",
    setup() {
        const testCases = ref([
            { input: "aaa", output: "bbb" },
            { input: "abc", output: "def" },
            { input: "xyz", output: "uvw" },
            { input: "123", output: "456" }
        ]);

        const testResults = ref([
            { number: 1, testCase: "Test case 1", result: "WA" },
            { number: 2, testCase: "Test case 2", result: "AC" },
            { number: 3, testCase: "Test case 3", result: "WA" }
        ]);

        const badgeType = (result: string) => {
            switch (result) {
                case 'AC':
                    return 'success'; // Green for accepted
                case 'WA':
                    return 'danger';  // Red for wrong answer
                default:
                    return 'info';    // Default blue for others
            }
        };

        const handleFileChange = (file, fileList) => {
            console.log('Selected file:', file);
        };

        const submitSourceCode = () => {
            console.log('File submitted');
        };

        const scrollToTestCase = (index: number) => {
            const element = document.getElementById('test-case-' + index);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        const activeName = ref('source_code');

        const handleClick = (tab: TabsPaneContext, event: Event) => {
            console.log(tab, event);
        };

        return {
            testCases,
            testResults,
            badgeType,
            scrollToTestCase,
            activeName,
            handleClick,
            handleFileChange,
            submitSourceCode,
        };
    }
});
</script>

<style scoped>
ul.test-case-list {
    list-style-type: none; /* Remove default bullet points */
    padding-left: 0; /* Remove default padding */
}

li {
    margin-bottom: 1rem; /* Space between test cases */
}

strong {
    color: #409EFF; /* Element Plus primary color for emphasis */
}

/* Add cursor pointer to indicate clickable badges */
.clickable-badge {
    cursor: pointer;
}

/* Make the tabs full width */
.full-width-tabs {
    width: 100%; /* Set full width for the tabs */
}

.full-width-tabs .el-tabs__header {
    display: flex; /* Flexbox for header */
    justify-content: space-between; /* Space out the items evenly */
}

.full-width-tabs .el-tabs__item {
    flex: 1; /* Make each tab item flexible */
    text-align: center; /* Center align text in tab items */
    min-width: 0; /* Prevent overflow */
}

.upload-demo i {
    font-size: 28px; /* Font size for upload icon */
}

.upload-demo .el-upload__text {
    margin-top: 10px; /* Margin for upload text */
}
</style>