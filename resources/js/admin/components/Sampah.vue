<template>
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Sampah</h1>
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
                        Tabel Data Jenis Sampah
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
                    id="dataTableSampah"
                    width="100%"
                    cellspacing="0"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Jenis</th>
                            <th>Harga Per Kg</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sampah in sampah" :key="sampah.id_sampah">
                            <td>{{ index + 1 }}</td>
                            <td>{{ sampah.jenis }}</td>
                            <td>{{ sampah.harga_per_kg }}</td>
                            <td>
                                <button
                                    @click="editSampah(sampah)"
                                    class="btn btn-warning btn-sm"
                                >
                                    <i class="fas fa-edit fa-sm"></i>
                                </button>
                                &nbsp;
                                <button
                                    @click="deleteSampah(sampah.id_sampah)"
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
        id="sampahModal"
        tabindex="-1"
        aria-labelledby="sampahModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="sampahModalLabel">
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
                    <form @submit.prevent="addSampah">
                        <div class="mb-3">
                            <label for="jenis" class="form-label">Jenis</label>
                            <input
                                type="text"
                                class="form-control"
                                id="jenis"
                                v-model="newSampah.jenis"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="harga_per_kg" class="form-label"
                                >Harga Per Kg</label
                            >
                            <input
                                type="number"
                                class="form-control"
                                id="harga_per_kg"
                                v-model="newSampah.harga_per_kg"
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
        id="editSampahModal"
        tabindex="-1"
        aria-labelledby="editSampahModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editSampahModalLabel">
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
                    <form @submit.prevent="updateSampah">
                        <div class="mb-3">
                            <label for="editJenis" class="form-label"
                                >Jenis</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="editJenis"
                                v-model="editSampahData.jenis"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="editHarga_per_kg" class="form-label"
                                >Harga Per Kg</label
                            >
                            <input
                                type="number"
                                class="form-control"
                                id="editHarga_per_kg"
                                v-model="editSampahData.harga_per_kg"
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
            sampah: [],
            newSampah: {
                jenis: "",
                harga_per_kg: "",
            },
            editSampahData: {
                id: null,
                jenis: "",
                harga_per_kg: "",
            },
        };
    },
    mounted() {
        this.fetchSampah();
    },
    methods: {
        async fetchSampah() {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/getSampah"
                );
                this.sampah = response.data;
                this.$nextTick(() => {
                    this.initDataTable();
                });
            } catch (error) {
                console.error("Error Fetching Sampah: ", error);
            }
        },
        initDataTable() {
            $("#dataTableSampah").DataTable({
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
            this.newSampah.jenis = "";
            this.newSampah.harga_per_kg = "";
            const modal = new bootstrap.Modal(
                document.getElementById("sampahModal")
            );
            modal.show();
        },
        closeModal() {
            this.newSampah.jenis = "";
            this.newSampah.harga_per_kg = "";
            document.getElementById("closeModal").click();
        },
        reloadPage() {
            this.$router.go(0);
        },
        async addSampah() {
            try {
                await axios.post(
                    "http://localhost:8000/api/addDataSampah",
                    this.newSampah
                );
                this.reloadPage();
            } catch (error) {
                console.error("Error adding post:", error);
            }
        },
        async deleteSampah(id) {
            if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                try {
                    await axios.delete(
                        `http://localhost:8000/api/deleteDataSampah/${id}`
                    );
                    this.reloadPage();
                } catch (error) {
                    console.error("Error deleting data:", error);
                }
            }
        },
        editSampah(sampah) {
            this.editSampahData.id = sampah.id_sampah;
            this.editSampahData.jenis = sampah.jenis;
            this.editSampahData.harga_per_kg = sampah.harga_per_kg;

            const modal = new bootstrap.Modal(
                document.getElementById("editSampahModal")
            );
            modal.show();
        },
        async updateSampah() {
            try {
                await axios.put(
                    `http://localhost:8000/api/updateDataSampah/${this.editSampahData.id}`,
                    {
                        jenis: this.editSampahData.jenis,
                        harga_per_kg: this.editSampahData.harga_per_kg,
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
        $("#dataTableSampah").DataTable().destroy(true);
    },
};
</script>
