<template>
  <ResourcePage
    title="Quản lý sách"
    subtitle="Danh sách sách trong thư viện"
    :columns="columns"
    :rows="rows"
    :fields="fields"
    :search-fields="['MaSach','TenSach','MaNXB','NguonGocTacGia']"
    @save="save"
    @remove="remove"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import ResourcePage from "../components/ResourcePage.vue";
import api from "../services/api";
const rows = ref([]);
const columns = [
  ["MaSach","Mã sách"],["TenSach","Tên sách"],["DonGia","Đơn giá"],["SoQuyen","Số quyển"],["NamXuatBan","Năm XB"],["MaNXB","Mã NXB"],["NguonGocTacGia","Nguồn gốc / tác giả"]
];
const fields = [
  { key:"MaSach", label:"Mã sách", type:"text", required:true },
  { key:"TenSach", label:"Tên sách", type:"text", required:true },
  { key:"DonGia", label:"Đơn giá", type:"number", required:true },
  { key:"SoQuyen", label:"Số quyển", type:"number", required:true },
  { key:"NamXuatBan", label:"Năm xuất bản", type:"number", required:true },
  { key:"MaNXB", label:"Mã NXB", type:"text", required:true },
  { key:"NguonGocTacGia", label:"Nguồn gốc / tác giả", type:"text" }
];
async function load(){ rows.value=(await api.get("/sach")).data; }
async function save(data, id){ id ? await api.put("/sach/"+id,data) : await api.post("/sach",data); await load(); }
async function remove(id){ if(confirm("Bạn chắc chắn muốn xóa?")) { await api.delete("/sach/"+id); await load(); } }
onMounted(load);
</script>
