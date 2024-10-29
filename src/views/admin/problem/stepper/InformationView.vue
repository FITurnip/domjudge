<template>
    <form>
        <div class="row">
            <div class="col-3">
                <label for="title" class="form-label">Title</label>
            </div>
            <div class="col-9">
                <input type="text" name="title" id="title" class="form-control form-control-sm">
            </div>

            <div class="col-3">
                <label for="problem_statement" class="form-label">Problem Statement</label>
            </div>
            <div class="col-9">
                <textarea name="problem_statement" id="problem_statement" class="form-control form-control-sm"></textarea>
            </div>

            <div class="col-3">
                <label for="input_format" class="form-label">Input Format</label>
            </div>
            <div class="col-9">
                <textarea name="input_format" id="input_format" class="form-control form-control-sm"></textarea>
            </div>

            <div class="col-3">
                <label for="constraint" class="form-label">Constraint</label>
            </div>
            <div class="col-9">
                <textarea name="constraint" id="constraint" class="form-control form-control-sm"></textarea>
            </div>

            <div class="col-3">
                <label for="output_format" class="form-label">Output Format</label>
            </div>
            <div class="col-9">
                <textarea name="output_format" id="output_format" class="form-control form-control-sm"></textarea>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    name: "InformationView",
    setup() {
        return {}
    }
});
</script>