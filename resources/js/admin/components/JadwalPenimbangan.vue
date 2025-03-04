<template>
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Jadwal Penimbangan</h1>
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
                        Tabel Data Jadwal Penimbangan
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
                    id="dataTableJadwal"
                    width="100%"
                    cellspacing="0"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Nasabah</th>
                            <th>Lokasi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="jadwal in jadwal" :key="jadwal.id_jadwal">
                            <td>{{ index + 1 }}</td>
                            <td>{{ formatDate(jadwal.tanggal) }}</td>
                            <td>{{ jadwal.nasabah }}</td>
                            <td>{{ jadwal.lokasi }}</td>
                            <td>
                                <button
                                    @click="editJadwal(jadwal)"
                                    class="btn btn-warning btn-sm"
                                >
                                    <i class="fas fa-edit fa-sm"></i>
                                </button>
                                &nbsp;
                                <button
                                    @click="deleteJadwal(jadwal.id_jadwal)"
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
        id="jadwalModal"
        tabindex="-1"
        aria-labelledby="jadwalModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="jadwalModalLabel">
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
                    <form @submit.prevent="addJadwal">
                        <div class="mb-3">
                            <label for="tanggal" class="form-label"
                                >Tanggal</label
                            >
                            <input
                                type="date"
                                class="form-control"
                                id="tanggal"
                                v-model="newJadwal.tanggal"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="nasabah" class="form-label"
                                >Nasabah</label
                            >
                            <v-select
                                :options="nasabahOptions"
                                placeholder="Pilih Nasabah"
                                v-model="newJadwal.id_nasabah"
                                label="nama"
                                :reduce="(option) => option.id_nasabah"
                                :required
                            ></v-select>
                        </div>
                        <div class="mb-3">
                            <label for="lokasi" class="form-label"
                                >Lokasi</label
                            >
                            <textarea
                                class="form-control"
                                id="lokasi"
                                v-model="newJadwal.lokasi"
                                required
                            ></textarea>
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
        id="editJadwalModal"
        tabindex="-1"
        aria-labelledby="editJadwalModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editJadwalModalLabel">
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
                    <form @submit.prevent="updateJadwal">
                        <div class="mb-3">
                            <label for="editTanggal" class="form-label"
                                >Tanggal</label
                            >
                            <input
                                type="date"
                                class="form-control"
                                id="editTanggal"
                                v-model="editJadwalData.tanggal"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="editNasabah" class="form-label"
                                >Nasabah</label
                            >
                            <v-select
                                :options="nasabahOptions"
                                placeholder="Pilih Nasabah"
                                v-model="editJadwalData.id_nasabah"
                                label="nama"
                                :reduce="(option) => option.id_nasabah"
                                :required
                            ></v-select>
                        </div>
                        <div class="mb-3">
                            <label for="editLokasi" class="form-label"
                                >Lokasi</label
                            >
                            <textarea
                                class="form-control"
                                id="editLokasi"
                                v-model="editJadwalData.lokasi"
                                required
                            ></textarea>
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
import vSelect from "vue-select";
import { format } from "date-fns";
import "vue-select/dist/vue-select.css";

export default {
    components: { vSelect },
    data() {
        return {
            jadwal: [],
            newJadwal: {
                tanggal: "",
                lokasi: "",
                id_nasabah: "",
            },
            editJadwalData: {
                id: null,
                tanggal: "",
                lokasi: "",
                id_nasabah: "",
            },
            nasabahOptions: [],
        };
    },
    mounted() {
        this.fetchJadwal();
        this.fetchNasabah();
    },
    methods: {
        async fetchNasabah() {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/getNasabah"
                );
                this.nasabahOptions = response.data;
            } catch (error) {
                console.error("Error Fetching Nasabah: ", error);
            }
        },
        async fetchJadwal() {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/getJadwal"
                );
                this.jadwal = response.data;
                this.$nextTick(() => {
                    this.initDataTable();
                });
            } catch (error) {
                console.error("Error Fetching Jadwal: ", error);
            }
        },
        initDataTable() {
            $("#dataTableJadwal").DataTable({
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
            this.newJadwal.tanggal = "";
            this.newJadwal.lokasi = "";
            this.newJadwal.id_nasabah = "";
            const modal = new bootstrap.Modal(
                document.getElementById("jadwalModal")
            );
            modal.show();
        },
        closeModal() {
            this.newJadwal.jenis = "";
            this.newJadwal.harga_per_kg = "";
            document.getElementById("closeModal").click();
        },
        reloadPage() {
            this.$router.go(0);
        },
        async addJadwal() {
            try {
                await axios.post(
                    "http://localhost:8000/api/addDataJadwal",
                    this.newJadwal
                );
                this.reloadPage();
            } catch (error) {
                console.error("Error adding post:", error);
            }
        },
        async deleteJadwal(id) {
            if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                try {
                    await axios.delete(
                        `http://localhost:8000/api/deleteDataJadwal/${id}`
                    );
                    this.reloadPage();
                } catch (error) {
                    console.error("Error deleting data:", error);
                }
            }
        },
        editJadwal(jadwal) {
            this.editJadwalData.id = jadwal.id_jadwal;
            this.editJadwalData.tanggal = format(jadwal.tanggal, "yyyy-MM-dd");
            this.editJadwalData.lokasi = jadwal.lokasi;
            this.editJadwalData.id_nasabah = jadwal.id_nasabah;

            const modal = new bootstrap.Modal(
                document.getElementById("editJadwalModal")
            );
            modal.show();
        },
        async updateJadwal() {
            try {
                await axios.put(
                    `http://localhost:8000/api/updateDataJadwal/${this.editJadwalData.id}`,
                    {
                        tanggal: this.editJadwalData.tanggal,
                        lokasi: this.editJadwalData.lokasi,
                        id_nasabah: this.editJadwalData.id_nasabah,
                    }
                );
                this.reloadPage();
            } catch (error) {
                console.error("Error updating data:", error);
            }
        },
        formatDate(tanggal) {
            return format(tanggal, "dd-MM-yyyy");
        },
    },
    beforeUnmount() {
        // Hancurkan DataTable saat komponen dibongkar
        $("#dataTableJadwal").DataTable().destroy(true);
    },
};
</script>
