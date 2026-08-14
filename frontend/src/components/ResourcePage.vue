<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div><h3 class="fw-bold mb-1">{{title}}</h3><p class="text-muted mb-0">{{subtitle}}</p></div>
      <button class="btn btn-primary" @click="openCreate"><i class="bi bi-plus-lg"></i> Thêm mới</button>
    </div>

    <div class="card p-3 mb-3">
      <div class="input-group">
        <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
        <input v-model="search" class="form-control" placeholder="Tìm kiếm...">
      </div>
    </div>

    <div class="card overflow-hidden">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead><tr><th v-for="c in columns" :key="c[0]">{{c[1]}}</th><th class="text-end">Thao tác</th></tr></thead>
          <tbody>
            <tr v-for="row in filtered" :key="row._id">
              <td v-for="c in columns" :key="c[0]">{{display(row[c[0]], c[0])}}</td>
              <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-2" @click="edit(row)"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger" @click="$emit('remove',row._id)"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
            <tr v-if="!filtered.length"><td :colspan="columns.length+1" class="text-center py-5 text-muted">Không có dữ liệu</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="show" class="modal-backdrop-custom">
      <div class="modal-card">
        <h5 class="fw-bold mb-3">{{editing ? "Chỉnh sửa" : "Thêm mới"}}</h5>
        <form @submit.prevent="submit">
          <div v-for="field in fields" :key="field.key" class="mb-3">
            <label class="form-label">{{field.label}}</label>
            <select v-if="field.type==='select'" v-model="form[field.key]" class="form-select" :required="field.required">
              <option v-for="o in field.options" :key="o" :value="o">{{o}}</option>
            </select>
            <input v-else v-model="form[field.key]" :type="field.type || 'text'" class="form-control" :required="field.required">
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-light" @click="show=false">Hủy</button>
            <button class="btn btn-primary">Lưu dữ liệu</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

const props=defineProps({
  title:String, subtitle:String, columns:Array, rows:Array, fields:Array, searchFields:Array
});
const emit=defineEmits(["save","remove"]);
const search=ref(""), show=ref(false), editing=ref(null);
const form=reactive({});

const filtered=computed(()=>props.rows.filter(row=>{
  if(!search.value)return true;
  const q=search.value.toLowerCase();
  return props.searchFields.some(key=>String(row[key]??"").toLowerCase().includes(q));
}));

function reset(){
  Object.keys(form).forEach(k=>delete form[k]);
  props.fields.forEach(f=>form[f.key]=f.type==="number" ? 0 : "");
}
function openCreate(){editing.value=null;reset();show.value=true}
function edit(row){
  editing.value=row._id;reset();
  props.fields.forEach(f=>form[f.key]=row[f.key] ?? "");
  show.value=true;
}
function submit(){
  const data={...form};
  if(!editing.value){
    props.fields.forEach(f=>{if(f.type==="number")data[f.key]=Number(data[f.key])});
  } else {
    props.fields.forEach(f=>{if(f.type==="number")data[f.key]=Number(data[f.key])});
  }
  emit("save",data,editing.value);
  show.value=false;
}
function display(v,key){
  if(v===null||v===undefined||v==="") return "—";
  if(key==="NgaySinh") return new Date(v).toLocaleDateString("vi-VN");
  if(key==="DonGia") return Number(v).toLocaleString("vi-VN")+" đ";
  return v;
}
</script>

<style scoped>
.modal-backdrop-custom{position:fixed;inset:0;background:rgba(15,39,66,.45);display:flex;align-items:center;justify-content:center;z-index:1000}
.modal-card{background:white;width:min(560px,92vw);max-height:90vh;overflow:auto;border-radius:16px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.2)}
</style>
