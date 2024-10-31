<template>
    <el-header class="admin-header">
        <div class="header-content">
            <h1>Admin Dashboard</h1>
            <div class="header-actions">
                <el-button @click="logout" type="text" class="logout-button">Logout</el-button>
            </div>
        </div>
    </el-header>
    <el-container style="height: calc(100vh - 64px);"> <!-- Adjust based on header height -->
        <el-aside class="admin-sidebar">
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <router-link to="/admin/dashboard">Dashboard</router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="/admin/users">Manage Users</router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to="/admin/settings">Settings</router-link>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="main-content">
            <div class="scrollable-content">
                <div class="container">
                    <router-view></router-view> <!-- Render child routes here -->
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script lang="ts">
export default {
    name: "AdminLayout",
    methods: {
        logout() {
            // Implement your logout logic here
            console.log("User logged out");
            // Redirect or clear user session
        }
    }
};
</script>

<style scoped>
.admin-layout {
    height: 100vh;
}

.admin-header {
    background: #f5f5f5;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-actions {
    display: flex;
    align-items: center;
}

.header-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.logout-button {
    color: red; /* Change color for visibility */
}

.admin-sidebar {
    width: 200px;
}

.main-content {
    padding: 1rem;
    max-height: 600px; /* Set max height as needed */
    overflow-y: auto; /* Enable vertical scrolling */
}

.scrollable-content {
    height: 100%; /* Ensure it takes full height */
}

.admin-footer {
    background: #f5f5f5;
    padding: 1rem;
    text-align: center;
}
</style>