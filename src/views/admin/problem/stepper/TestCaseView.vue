<template>
    <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="Manual" name="manual">
            <ManualInput></ManualInput>
        </el-tab-pane>
        <el-tab-pane label="Use Generator" name="use-generator">
            <GeneratorInput></GeneratorInput>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ManualInput from "./test-case-input/ManualView.vue";
import GeneratorInput from "./test-case-input/GeneratorView.vue";

export default defineComponent({
    name: "TestCaseView",
    components: {
        ManualInput,
        GeneratorInput
    },
    setup() {
        const activeTab = ref("manual"); // Default active tab

        return {
            activeTab
        };
    }
});
</script>