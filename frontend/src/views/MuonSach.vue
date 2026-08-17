<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold mb-1">Mượn / trả sách</h3>
        <p class="text-muted mb-0">Theo dõi lịch sử mượn sách của độc giả</p>
      </div>
      <button class="btn btn-primary" @click="openCreate"><i class="bi bi-plus-lg"></i> Lập lượt mượn</button>
    </div>

    <div class="card p-3 mb-3">
      <div class="row g-2">
        <div class="col-md-5"><input v-model="search" class="form-control" placeholder="Tìm mã độc giả hoặc mã sách...">
        </div>
        <div class="col-md-3"><select v-model="status" class="form-select">
            <option value="">Tất cả trạng thái</option>
            <option value="borrowed">Đang mượn</option>
            <option value="returned">Đã trả</option>
          </select></div>
      </div>
    </div>

    <div class="card overflow-hidden">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Mã độc giả</th>
              <th>Mã sách</th>
              <th>Ngày mượn</th>
              <th>Ngày trả</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filtered" :key="item._id">
              <td>{{ item.MaDocGia }}</td>
              <td>{{ item.MaSach }}</td>
              <td>{{ formatDate(item.NgayMuon) }}</td>
              <td>{{ formatDate(item.NgayTra) }}</td>
              <td>
                <span :class="[
                  'badge',
                  item.NgayTra ? 'badge-returned' : 'badge-borrowed'
                ]">
                  {{ item.NgayTra ? 'Đã trả' : 'Đang mượn' }}
                </span>
              </td>
              <td class="text-end">
                <button v-if="!item.NgayTra" class="btn btn-sm btn-outline-success me-2"
                  @click="returnBook(item._id)">Trả sách</button>
                <button class="btn btn-sm btn-outline-danger" @click="remove(item._id)"><i
                    class="bi bi-trash"></i></button>
              </td>
            </tr>
            <tr v-if="!filtered.length">
              <td colspan="6" class="text-center py-5 text-muted">Chưa có dữ liệu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="show" class="modal-backdrop-custom">
      <div class="modal-card">
        <h5 class="fw-bold mb-3">Lập lượt mượn sách</h5>
        <form @submit.prevent="create">
          <div class="mb-3"><label class="form-label">Mã độc giả</label><input v-model="form.MaDocGia"
              class="form-control" required></div>
          <div class="mb-3"><label class="form-label">Mã sách</label><input v-model="form.MaSach" class="form-control"
              required></div>
          <div class="mb-3"><label class="form-label">Ngày mượn</label><input v-model="form.NgayMuon" type="date"
              class="form-control" required></div>
          <div class="d-flex justify-content-end gap-2"><button type="button" class="btn btn-light"
              @click="show = false">Hủy</button><button class="btn btn-primary">Lưu</button></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import api from "../services/api";
const rows = ref([]), search = ref(""), status = ref(""), show = ref(false);
const form = reactive({ MaDocGia: "", MaSach: "", NgayMuon: new Date().toISOString().slice(0, 10) });
const filtered = computed(() => rows.value.filter(x => {
  const q = search.value.toLowerCase();
  const match = !q || x.MaDocGia.toLowerCase().includes(q) || x.MaSach.toLowerCase().includes(q);
  const matchStatus = !status.value || (status.value === "borrowed" && !x.NgayTra) || (status.value === "returned" && x.NgayTra);
  return match && matchStatus;
}));
function formatDate(v) { return v ? new Date(v).toLocaleDateString("vi-VN") : "—" }
async function load() { rows.value = (await api.get("/muon-sach")).data }
function openCreate() { form.MaDocGia = ""; form.MaSach = ""; form.NgayMuon = new Date().toISOString().slice(0, 10); show.value = true }
async function create() { try { await api.post("/muon-sach", form); show.value = false; await load() } catch (e) { alert(e.response?.data?.message || "Không thể tạo lượt mượn") } }
async function returnBook(id) { try { await api.put("/muon-sach/" + id + "/return", {}); await load() } catch (e) { alert(e.response?.data?.message || "Không thể trả sách") } }
async function remove(id) { if (confirm("Xóa lịch sử mượn này?")) { await api.delete("/muon-sach/" + id); await load() } }
onMounted(load)
</script>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(15, 39, 66, .45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: white;
  width: min(480px, 92vw);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .2);
}


.badge {
  display: inline-block;
  padding: 7px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
}

.badge-borrowed {
  background-color: #f8e9a1;
  color: #6b5b00;
}

.badge-returned {
  background-color: #d9f0e3;
  color: #176b3a;
}
</style>