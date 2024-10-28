<template>
    <form>
        <div class="row">
            <div class="col-6">
                <label for="name" class="form-label">Name</label>
            </div>
            <div class="col-6">
                <input type="text" name="name" id="name" class="form-control form-control-sm">
            </div>
            <div class="col-6">
                <label for="username" class="form-label">Username</label>
            </div>
            <div class="col-6">
                <input type="text" name="username" id="username" class="form-control form-control-sm">
            </div>
            <div class="col-6">
                <label for="password" class="form-label">Password</label>
            </div>
            <div class="col-6">
                <input type="password" name="password" id="password" class="form-control form-control-sm">
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-sm btn-primary w-100">Login</button>
                <button type="button" class="btn btn-sm btn-info w-100">Sign Up</button>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "RegisterView",
    setup() {
        return {}
    }
});
</script>