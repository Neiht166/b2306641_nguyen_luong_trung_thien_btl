import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Sach from "../views/Sach.vue";
import DocGia from "../views/DocGia.vue";
import NhaXuatBan from "../views/NhaXuatBan.vue";
import NhanVien from "../views/NhanVien.vue";
import MuonSach from "../views/MuonSach.vue";

const routes = [
  {
    path: "/login",
    component: Login,
    meta: {
      guest: true,
    },
  },

  {
    path: "/",
    redirect: "/dashboard",
  },

  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/sach",
    component: Sach,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/docgia",
    component: DocGia,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/nhaxuatban",
    component: NhaXuatBan,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/muon-sach",
    component: MuonSach,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/nhanvien",
    component: NhanVien,
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch (error) {
    user = null;
  }

  if (to.meta.requiresAuth && !token) {
    return "/login";
  }

  if (to.meta.guest && token) {
    return "/dashboard";
  }

  if (to.meta.adminOnly && user?.ChucVu !== "Quản trị viên") {
    return "/dashboard";
  }

  return true;
});

export default router;
