<template>
  <ResourcePage title="Nhân viên" subtitle="Quản lý tài khoản và thông tin nhân viên" :columns="columns" :rows="rows"
    :fields="fields" :search-fields="['MSNV', 'HoTenNV', 'ChucVu', 'SoDienThoai']" @save="save" @remove="remove" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import ResourcePage from "../components/ResourcePage.vue";
import api from "../services/api";
const rows = ref([]);
const columns = [["MSNV", "MSNV"], ["HoTenNV", "Họ tên"], ["ChucVu", "Chức vụ"], ["DiaChi", "Địa chỉ"], ["SoDienThoai", "Số điện thoại"]];
const fields = [
  { key: "MSNV", label: "Mã số nhân viên", type: "text", required: true },
  { key: "HoTenNV", label: "Họ tên", type: "text", required: true },
  { key: "Password", label: "Mật khẩu", type: "password", required: true },
  {
    key: "ChucVu",
    label: "Chức vụ",
    type: "select",
    options: [
      { value: "Nhân viên", label: "Nhân viên" },
      { value: "Quản trị viên", label: "Quản trị viên" }
    ]
  },
  { key: "DiaChi", label: "Địa chỉ", type: "text" },
  { key: "SoDienThoai", label: "Số điện thoại", type: "text" }
];
async function load() { rows.value = (await api.get("/nhanvien")).data }
async function save(d, id) { id ? await api.put("/nhanvien/" + id, d) : await api.post("/nhanvien", d); await load() }
async function remove(id) { if (confirm("Bạn chắc chắn muốn xóa?")) { await api.delete("/nhanvien/" + id); await load() } }
onMounted(load)
</script>
