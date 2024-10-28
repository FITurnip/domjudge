<template>
    <div class="container">
        <div class="stepper">
            <div class="d-flex justify-content-center mb-4">
                <div
                    v-for="(step, index) in steps"
                    :key="index"
                    class="step text-center"
                    :class="{ active: index === activeStep }"
                >
                    <div class="step-number">
                        {{ index + 1 }}
                    </div>
                    <div>{{ step.title }}</div>
                </div>
                <div v-if="index < steps.length - 1" class="line"></div>
            </div>

            <div class="step-content">
                <slot :name="'step-' + activeStep"></slot>
            </div>

            <div class="mt-4 text-center">
                <button
                    @click="prevStep"
                    :disabled="activeStep === 0"
                    class="btn btn-secondary"
                >
                    Previous
                </button>
                <button
                    @click="nextStep"
                    :disabled="activeStep === steps.length - 1"
                    class="btn btn-primary ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "StepperComponent",
    props: {
        steps: {
            type: Array as () => Array<{
                title: string,
                nextFunction?: () => void, // Optional function to call on next step
                prevFunction?: () => void  // Optional function to call on previous step
            }>, 
            required: true
        }
    },
    setup(props) {
        const activeStep = ref(0); // Current active step

        const nextStep = () => {
            const currentStep = props.steps[activeStep.value];
            if (currentStep.nextFunction) {
                currentStep.nextFunction(); // Call the next function for the current step
            }
            if (activeStep.value < props.steps.length - 1) {
                activeStep.value++;
            }
        };

        const prevStep = () => {
            const currentStep = props.steps[activeStep.value];
            if (currentStep.prevFunction) {
                currentStep.prevFunction(); // Call the previous function for the current step
            }
            if (activeStep.value > 0) {
                activeStep.value--;
            }
        };

        return {
            activeStep,
            nextStep,
            prevStep
        };
    }
});
</script>

<style scoped>
.stepper {
    width: 100%;
}

.step {
    flex: 1;
    text-align: center;
}

.line {
    flex: 1; /* Takes available space between steps */
    height: 2px; /* Line height */
    background-color: #007bff; /* Line color */
    margin: 0; /* No margin, connected to steps */
}

.step.active .step-number {
    background-color: #007bff;
    color: #fff;
}

.step-number {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 2px solid #007bff;
    border-radius: 50%;
    display: inline-block;
    margin-bottom: 10px;
}
</style>
