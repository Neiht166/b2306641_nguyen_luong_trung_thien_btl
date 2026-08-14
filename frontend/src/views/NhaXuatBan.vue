<template>
  <ResourcePage
    title="Nhà xuất bản"
    subtitle="Quản lý thông tin nhà xuất bản"
    :columns="columns" :rows="rows" :fields="fields"
    :search-fields="['MaNXB','TenNXB','DiaChi']"
    @save="save" @remove="remove"
  />
</template>
<script setup>
import { onMounted, ref } from "vue";
import ResourcePage from "../components/ResourcePage.vue";
import api from "../services/api";
const rows=ref([]);
const columns=[["MaNXB","Mã NXB"],["TenNXB","Tên NXB"],["DiaChi","Địa chỉ"]];
const fields=[
 {key:"MaNXB",label:"Mã NXB",type:"text",required:true},
 {key:"TenNXB",label:"Tên NXB",type:"text",required:true},
 {key:"DiaChi",label:"Địa chỉ",type:"text"}
];
async function load(){rows.value=(await api.get("/nhaxuatban")).data}
async function save(d,id){id?await api.put("/nhaxuatban/"+id,d):await api.post("/nhaxuatban",d);await load()}
async function remove(id){if(confirm("Bạn chắc chắn muốn xóa?")){await api.delete("/nhaxuatban/"+id);await load()}}
onMounted(load)
</script>
