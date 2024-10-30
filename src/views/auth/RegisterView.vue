<template>
    <el-form>
        <el-row>
            <el-col :span="12">
                <el-form-item label="Name">
                    <el-input size="small" v-model="name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="Username">
                    <el-input size="small" v-model="username"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="Password">
                    <el-input size="small" type="password" v-model="password"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col :span="24">
                <el-button type="primary" size="small" @click="register" class="w-100">Register</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "RegisterView",
    setup() {
        const router = useRouter();
        
        // Reactive variables for form inputs
        const name = ref('');
        const username = ref('');
        const password = ref('');

        const register = () => {
            router.push({ name: 'admin.problem-set.list' });
        }

        return {
            name,
            username,
            password,
            register
        }
    }
});
</script>