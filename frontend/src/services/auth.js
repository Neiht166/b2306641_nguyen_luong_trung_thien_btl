import { ref, computed } from "vue";

const user = ref(JSON.parse(localStorage.getItem("user") || "null"));

const token = ref(localStorage.getItem("token"));

export function useAuth() {
  function login(authToken, authUser) {
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(authUser));

    token.value = authToken;
    user.value = authUser;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    token.value = null;
    user.value = null;
  }

  const isLoggedIn = computed(() => {
    return !!token.value;
  });

  const isAdmin = computed(() => {
    return user.value?.ChucVu === "Quản trị viên";
  });

  return {
    user,
    token,
    isLoggedIn,
    isAdmin,
    login,
    logout,
  };
}
