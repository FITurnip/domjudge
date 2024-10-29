<template>
    <el-steps style="max-width: 600px" :active="activeStep" finish-status="success">
        <el-step title="Information" />
        <el-step title="Test Case" />
    </el-steps>
    
    <Information v-if="activeStep === 0"></Information>
    <TestCase v-if="activeStep === 1"></TestCase>
    
    <el-button style="margin-top: 12px" @click="backStep()">Back step</el-button>
    <el-button style="margin-top: 12px" @click="nextStep()">Next step</el-button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import Stepper from "../../../components/Stepper.vue";
// import Information from "./stepper/InformationView.vue";
// import TestCase from "./stepper/TestCaseView.vue";
export default defineComponent({
    name: "ProblemDetailView",
    components: {
        // Information,
        // TestCase,
    },
    setup() {
        const activeStep = ref<number>(0);
        const backStep = () => {if(activeStep.value > 0) activeStep.value--};
        const nextStep = () => {if(activeStep.value < 2) activeStep.value++};

        return {
            activeStep,
            backStep,
            nextStep
        }
    }
})
</script>