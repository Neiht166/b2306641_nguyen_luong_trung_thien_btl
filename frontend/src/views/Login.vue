<template>
    <div class="login-page">
        <div class="login-card">

            <div class="text-center mb-4">
                <div class="logo">
                    <i class="bi bi-book-half"></i>
                </div>

                <h3 class="fw-bold mb-1">LIBRARY</h3>
                <p class="text-muted mb-0">QUẢN LÝ MƯỢN SÁCH</p>
            </div>

            <form @submit.prevent="login">

                <div class="mb-3">
                    <label class="form-label fw-semibold">
                        Mã nhân viên
                    </label>

                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="bi bi-person"></i>
                        </span>

                        <input v-model="MSNV" type="text" class="form-control" placeholder="Nhập mã nhân viên" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-semibold">
                        Mật khẩu
                    </label>

                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="bi bi-lock"></i>
                        </span>

                        <input v-model="Password" type="password" class="form-control" placeholder="Nhập mật khẩu"
                            required>
                    </div>
                </div>

                <div v-if="error" class="alert alert-danger py-2">
                    {{ error }}
                </div>

                <button type="submit" class="btn btn-primary w-100 py-2" :disabled="loading">
                    <span v-if="loading">
                        <span class="spinner-border spinner-border-sm me-2"></span>
                        Đang đăng nhập...
                    </span>

                    <span v-else>
                        <i class="bi bi-box-arrow-in-right me-1"></i>
                        Đăng nhập
                    </span>
                </button>

            </form>

        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";
import { useAuth } from "../services/auth";

const { login: saveLogin } = useAuth();
const router = useRouter();

const MSNV = ref("");
const Password = ref("");
const error = ref("");
const loading = ref(false);

async function login() {
    error.value = "";
    loading.value = true;

    try {
        const response = await api.post("/auth/login", {
            MSNV: MSNV.value,
            Password: Password.value
        });

        const { token, user } = response.data;

        // Lưu thông tin đăng nhập
        saveLogin(token, user);

        // Chuyển đến trang tổng quan
        await router.replace("/dashboard");

    } catch (err) {

        error.value =
            err.response?.data?.message ||
            "Đăng nhập thất bại";

    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f7fb;
    padding: 20px;
}

.login-card {
    width: 100%;
    max-width: 420px;
    background: white;
    padding: 35px;
    border-radius: 18px;
    box-shadow: 0 15px 45px rgba(15, 39, 66, .12);
}

.logo {
    width: 65px;
    height: 65px;
    margin: 0 auto 15px;
    border-radius: 16px;
    background: #0f2742;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
}

.input-group-text {
    background: white;
}

.form-control:focus {
    box-shadow: none;
    border-color: #1d5d9b;
}

.btn-primary {
    background: #1d5d9b;
    border-color: #1d5d9b;
}
</style>