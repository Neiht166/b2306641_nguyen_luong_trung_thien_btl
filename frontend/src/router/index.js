import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Sach from "../views/Sach.vue";
import DocGia from "../views/DocGia.vue";
import NhaXuatBan from "../views/NhaXuatBan.vue";
import NhanVien from "../views/NhanVien.vue";
import MuonSach from "../views/MuonSach.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/dashboard" },
    { path: "/dashboard", component: Dashboard },
    { path: "/sach", component: Sach },
    { path: "/docgia", component: DocGia },
    { path: "/nhaxuatban", component: NhaXuatBan },
    { path: "/nhanvien", component: NhanVien },
    { path: "/muon-sach", component: MuonSach }
  ]
});
