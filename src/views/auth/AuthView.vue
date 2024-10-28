<template>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active" id="login-tab" data-bs-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">Login</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="register-tab" data-bs-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="home-tab">
            <LoginView></LoginView>
        </div>
        <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="profile-tab">
            <RegisterView></RegisterView>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LoginView from "./LoginView.vue";
import RegisterView from './RegisterView.vue';

export default defineComponent({
    name: "AuthView",
    components: {
        LoginView,
        RegisterView
    },
    setup() {
        return {}
    }
});
</script>