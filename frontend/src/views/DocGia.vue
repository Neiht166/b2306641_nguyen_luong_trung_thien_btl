<template>
  <ResourcePage title="Quản lý độc giả" subtitle="Thông tin người mượn sách" :columns="columns" :rows="rows"
    :fields="fields" :search-fields="['MaDocGia', 'HoLot', 'Ten', 'DienThoai']" @save="save" @remove="remove" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import ResourcePage from "../components/ResourcePage.vue";
import api from "../services/api";
const rows = ref([]);
const columns = [["MaDocGia", "Mã độc giả"], ["HoLot", "Họ lót"], ["Ten", "Tên"], ["NgaySinh", "Ngày sinh"], ["Phai", "Phái"], ["DiaChi", "Địa chỉ"], ["DienThoai", "Điện thoại"]];
const fields = [
  { key: "MaDocGia", label: "Mã độc giả", type: "text", required: true },
  { key: "HoLot", label: "Họ lót", type: "text", required: true },
  { key: "Ten", label: "Tên", type: "text", required: true },
  { key: "NgaySinh", label: "Ngày sinh", type: "date" },
  {
    key: "Phai",
    label: "Phái",
    type: "select",
    options: [
      { value: "Nam", label: "Nam" },
      { value: "Nữ", label: "Nữ" },
      { value: "Khác", label: "Khác" }
    ]
  },
  { key: "DiaChi", label: "Địa chỉ", type: "text" },
  { key: "DienThoai", label: "Điện thoại", type: "text" }
];
async function load() { rows.value = (await api.get("/docgia")).data }
async function save(d, id) { id ? await api.put("/docgia/" + id, d) : await api.post("/docgia", d); await load() }
async function remove(id) { if (confirm("Bạn chắc chắn muốn xóa?")) { await api.delete("/docgia/" + id); await load() } }
onMounted(load)
</script>
