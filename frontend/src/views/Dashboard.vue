<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div><h3 class="fw-bold mb-1">Tổng quan</h3><p class="text-muted mb-0">Tình hình hoạt động của thư viện</p></div>
      <RouterLink to="/muon-sach" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Tạo lượt mượn</RouterLink>
    </div>

    <div class="row g-4">
      <Stat icon="bi-book" label="Tổng số sách" :value="stats.books" />
      <Stat icon="bi-people" label="Độc giả" :value="stats.readers" />
      <Stat icon="bi-building" label="Nhà xuất bản" :value="stats.publishers" />
      <Stat icon="bi-arrow-left-right" label="Đang mượn" :value="stats.activeBorrows" />
    </div>

    <div class="card mt-4 p-4">
      <h5 class="fw-bold">Các chức năng chính</h5>
      <div class="row g-3 mt-1">
        <div v-for="item in items" :key="item.to" class="col-md-4">
          <RouterLink :to="item.to" class="quick-link">
            <i :class="['bi', item.icon]"></i>
            <span>{{ item.title }}</span>
            <i class="bi bi-chevron-right ms-auto"></i>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import api from "../services/api";

const stats = reactive({ books: 0, readers: 0, publishers: 0, employees: 0, borrows: 0, activeBorrows: 0 });
const items = [
  { title: "Quản lý sách", icon: "bi-book", to: "/sach" },
  { title: "Quản lý độc giả", icon: "bi-people", to: "/docgia" },
  { title: "Nhà xuất bản", icon: "bi-building", to: "/nhaxuatban" },
  { title: "Mượn / trả sách", icon: "bi-arrow-left-right", to: "/muon-sach" },
  { title: "Nhân viên", icon: "bi-person-badge", to: "/nhanvien" }
];

onMounted(async () => Object.assign(stats, (await api.get("/dashboard")).data));
</script>

<script>
export default {
  components: {
    Stat: {
      props: ["icon", "label", "value"],
      template: `<div class="col-xl-3 col-md-6"><div class="card stat-card"><div class="d-flex align-items-center gap-3"><div class="stat-icon"><i :class="'bi '+icon"></i></div><div><div class="text-muted small">{{label}}</div><h3 class="mb-0 fw-bold">{{value}}</h3></div></div></div></div>`
    }
  }
}
</script>

<style scoped>
.quick-link { display:flex; align-items:center; gap:12px; padding:16px; border:1px solid #edf0f5; border-radius:12px; color:#172b4d; text-decoration:none; }
.quick-link:hover { background:#f7faff; }
.quick-link > i:first-child { font-size:21px; color:#1d5d9b; }
</style>
