<template>
  <ResourcePage title="Quản lý sách" subtitle="Danh sách sách trong thư viện" :columns="columns" :rows="rows"
    :fields="fields" :search-fields="[
      'MaSach',
      'TenSach',
      'MaNXB',
      'NguonGocTacGia'
    ]" @save="save" @remove="remove" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import ResourcePage from "../components/ResourcePage.vue";
import api from "../services/api";

const rows = ref([]);

const columns = [
  ["MaSach", "Mã sách"],
  ["TenSach", "Tên sách"],
  ["HinhAnh", "Hình ảnh"],
  ["DonGia", "Đơn giá"],
  ["SoQuyen", "Số quyển"],
  ["NamXuatBan", "Năm XB"],
  ["MaNXB", "Mã NXB"],
  ["NguonGocTacGia", "Nguồn gốc / tác giả"]
];

const fields = [
  {
    key: "MaSach",
    label: "Mã sách",
    type: "text",
    required: true
  },
  {
    key: "TenSach",
    label: "Tên sách",
    type: "text",
    required: true
  },
  {
    key: "HinhAnh",
    label: "Hình ảnh",
    type: "file"
  },
  {
    key: "DonGia",
    label: "Đơn giá",
    type: "number",
    required: true
  },
  {
    key: "SoQuyen",
    label: "Số quyển",
    type: "number",
    required: true
  },
  {
    key: "NamXuatBan",
    label: "Năm xuất bản",
    type: "number",
    required: true
  },
  {
    key: "MaNXB",
    label: "Mã NXB",
    type: "text",
    required: true
  },
  {
    key: "NguonGocTacGia",
    label: "Nguồn gốc / tác giả",
    type: "text"
  }
];



async function load() {
  try {
    const response = await api.get("/sach");

    rows.value = response.data;

    console.log("Danh sách sách:", rows.value);

  } catch (error) {
    console.error("Lỗi tải danh sách sách:", error);
  }
}



async function save(data, id) {
  try {

    const formData = new FormData();


    formData.append("MaSach", data.MaSach);
    formData.append("TenSach", data.TenSach);
    formData.append("DonGia", data.DonGia);
    formData.append("SoQuyen", data.SoQuyen);
    formData.append("NamXuatBan", data.NamXuatBan);
    formData.append("MaNXB", data.MaNXB);

    formData.append(
      "NguonGocTacGia",
      data.NguonGocTacGia || ""
    );



    if (data.HinhAnhFile) {

      console.log(
        "Ảnh đang upload:",
        data.HinhAnhFile
      );

      formData.append(
        "HinhAnhFile",
        data.HinhAnhFile
      );
    }



    if (id) {

      await api.put(
        "/sach/" + id,
        formData
      );

    } else {

      await api.post(
        "/sach",
        formData
      );
    }


    await load();

  } catch (error) {

    console.error(
      "Lỗi lưu sách:",
      error
    );

    if (error.response) {
      console.error(
        "Server:",
        error.response.data
      );
    }

    alert(
      error.response?.data?.message ||
      "Có lỗi xảy ra khi lưu sách"
    );
  }
}



async function remove(id) {

  if (
    !confirm(
      "Bạn chắc chắn muốn xóa?"
    )
  ) {
    return;
  }

  try {

    await api.delete(
      "/sach/" + id
    );

    await load();

  } catch (error) {

    console.error(
      "Lỗi xóa sách:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Không thể xóa sách"
    );
  }
}

onMounted(load);

</script>