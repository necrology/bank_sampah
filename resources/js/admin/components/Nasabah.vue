<template>
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Nasabah</h1>
    <!-- <p class="mb-4">
        DataTables is a third party plugin that is used to generate the demo
        table below. For more information about DataTables, please visit the
        <a target="_blank" href="https://datatables.net"
            >official DataTables documentation</a
        >.
    </p> -->

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="row">
                <div class="col-sm-6">
                    <h6 class="mt-2 font-weight-bold text-primary">
                        Tabel Data Nasabah
                    </h6>
                </div>
                <div class="col-sm-6 d-flex justify-content-end">
                    <button
                        @click="showModal"
                        class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                    >
                        <i class="fas fa-plus fa-sm text-white-50"></i> Tambah
                        Data
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table
                    class="table table-bordered"
                    id="dataTableNasabah"
                    width="100%"
                    cellspacing="0"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>No Telp</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="nasabah in nasabah"
                            :key="nasabah.id_nasabah"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>{{ nasabah.nama }}</td>
                            <td>{{ nasabah.alamat }}</td>
                            <td>{{ nasabah.nomor_telepon }}</td>
                            <td>
                                <button
                                    @click="editNasabah(nasabah)"
                                    class="btn btn-warning btn-sm"
                                >
                                    <i class="fas fa-edit fa-sm"></i>
                                </button>
                                &nbsp;
                                <button
                                    @click="deleteNasabah(nasabah.id_nasabah)"
                                    class="btn btn-danger btn-sm"
                                >
                                    <i class="fas fa-trash fa-sm"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal Tambah -->
    <div
        class="modal fade"
        id="nasabahModal"
        tabindex="-1"
        aria-labelledby="nasabahModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="nasabahModalLabel">
                        Tambah Data
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-dismiss="modal"
                        aria-label="Close"
                        id="closeModal"
                    >
                        X
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addNasabah">
                        <div class="mb-3">
                            <label for="nama" class="form-label">Nama</label>
                            <input
                                type="text"
                                class="form-control"
                                id="nama"
                                v-model="newNasabah.nama"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="alamat" class="form-label"
                                >Alamat</label
                            >
                            <textarea
                                class="form-control"
                                id="alamat"
                                v-model="newNasabah.alamat"
                                required
                            ></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="nomor_telepon" class="form-label"
                                >No Telp</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="nomor_telepon"
                                v-model="newNasabah.nomor_telepon"
                                required
                            />
                        </div>
                        <button type="submit" class="btn btn-primary">
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Edit -->
    <div
        class="modal fade"
        id="editNasabahModal"
        tabindex="-1"
        aria-labelledby="editNasabahModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editNasabahModalLabel">
                        Edit Data
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-dismiss="modal"
                        aria-label="Close"
                        id="closeEditModal"
                    >
                        X
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updateNasabah">
                        <div class="mb-3">
                            <label for="editNama" class="form-label"
                                >Nama</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="editNama"
                                v-model="editNasabahData.nama"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="editAlamat" class="form-label"
                                >Alamat</label
                            >
                            <textarea
                                class="form-control"
                                id="editAlamat"
                                v-model="editNasabahData.alamat"
                                required
                            ></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="EditNomor_telepon" class="form-label"
                                >No Telp</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="EditNomor_telepon"
                                v-model="editNasabahData.nomor_telepon"
                                required
                            />
                        </div>
                        <button type="submit" class="btn btn-primary">
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from "vue";
import $ from "jquery";
import "datatables.net/js/dataTables.js";
import "datatables.net/js/dataTables.min.js";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import axios from "axios";

export default {
    data() {
        return {
            nasabah: [],
            newNasabah: {
                nama: "",
                alamat: "",
                nomor_telepon: "",
            },
            editNasabahData: {
                id: null,
                nama: "",
                alamat: "",
                nomor_telepon: "",
            },
        };
    },
    mounted() {
        this.fetchNasabah();
    },
    methods: {
        async fetchNasabah() {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/getNasabah"
                );
                this.nasabah = response.data;
                this.$nextTick(() => {
                    this.initDataTable();
                });
            } catch (error) {
                console.error("Error Fetching Nasabah: ", error);
            }
        },
        initDataTable() {
            $("#dataTableNasabah").DataTable({
                language: {
                    emptyTable: "Data Kosong!", // Pesan ketika data kosong
                },
                columnDefs: [
                    {
                        targets: 0, // Kolom nomor urut
                        orderable: false, // Nonaktifkan pengurutan pada kolom ini
                        render: (data, type, row, meta) => {
                            return meta.row + 1; // Menampilkan nomor urut
                        },
                    },
                ],
            });
        },
        showModal() {
            this.newNasabah.nama = "";
            this.newNasabah.alamat = "";
            this.newNasabah.nomor_telepon = "";
            const modal = new bootstrap.Modal(
                document.getElementById("nasabahModal")
            );
            modal.show();
        },
        closeModal() {
            this.newNasabah.nama = "";
            this.newNasabah.alamat = "";
            this.newNasabah.nomor_telepon = "";
            document.getElementById("closeModal").click();
        },
        reloadPage() {
            this.$router.go(0);
        },
        async addNasabah() {
            try {
                await axios.post(
                    "http://localhost:8000/api/addDataNasabah",
                    this.newNasabah
                );
                this.reloadPage();
            } catch (error) {
                console.error("Error adding post:", error);
            }
        },
        async deleteNasabah(id) {
            if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                try {
                    await axios.delete(
                        `http://localhost:8000/api/deleteDataNasabah/${id}`
                    );
                    this.reloadPage();
                } catch (error) {
                    console.error("Error deleting data:", error);
                }
            }
        },
        editNasabah(nasabah) {
            this.editNasabahData.id = nasabah.id_nasabah;
            this.editNasabahData.nama = nasabah.nama;
            this.editNasabahData.alamat = nasabah.alamat;
            this.editNasabahData.nomor_telepon = nasabah.nomor_telepon;

            const modal = new bootstrap.Modal(
                document.getElementById("editNasabahModal")
            );
            modal.show();
        },
        async updateNasabah() {
            try {
                await axios.put(
                    `http://localhost:8000/api/updateDataNasabah/${this.editNasabahData.id}`,
                    {
                        nama: this.editNasabahData.nama,
                        alamat: this.editNasabahData.alamat,
                        nomor_telepon: this.editNasabahData.nomor_telepon,
                    }
                );
                this.reloadPage();
            } catch (error) {
                console.error("Error updating data:", error);
            }
        },
    },
    beforeUnmount() {
        // Hancurkan DataTable saat komponen dibongkar
        $("#dataTableNasabah").DataTable().destroy(true);
    },
};
</script>
