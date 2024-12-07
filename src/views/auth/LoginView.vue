<template>
    <el-form>
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
                <el-button 
                    type="primary" 
                    size="small" 
                    @click="login" 
                    :loading="isLoading" 
                    class="w-100"
                >
                    Login
                </el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/user/AuthService';

export default defineComponent({
    name: "LoginView",
    setup() {
        const router = useRouter();
        const auth = new AuthService();
        
        // Reactive variables for form inputs
        const username = ref('');
        const password = ref('');
        const isLoading = ref(false); // Loading state

        const login = async () => {
            isLoading.value = true; // Set loading to true

            try {
                const role = await auth.authenticate(username.value, password.value) as unknown as string;
                console.log("Authenticated Role:", role); // Log the authenticated role

                if (role) {
                    // Redirect based on role
                    if (role === 'admin') {
                        router.push({ name: 'admin.problem-set.list' });
                    } else {
                        router.push({ name: "player.problem-set.list" });
                    }
                } else {
                    console.error('Login failed, role not found.');
                    // You might want to show an error message to the user here
                }
            } catch (error) {
                console.error('Authentication error:', error);
                // Handle authentication error (e.g., show a message)
            } finally {
                isLoading.value = false; // Reset loading state
            }
        }

        return {
            username,
            password,
            login,
            isLoading
        }
    }
});
</script>