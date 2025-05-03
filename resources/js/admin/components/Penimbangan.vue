<template>
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Penimbangan</h1>
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
                        Tabel Data Penimbangan
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
                    id="dataTablePenimbangan"
                    width="100%"
                    cellspacing="0"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Tanggal Penimbangan</th>
                            <th>Nama Nasabah</th>
                            <th>Jenis Sampah</th>
                            <th>Berat (Kg)</th>
                            <th>Total (berat x harga/Kg)</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="penimbangan in penimbangan"
                            :key="penimbangan.id_penimbangan"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>
                                {{
                                    formatDate(penimbangan.tanggal_penimbangan)
                                }}
                            </td>
                            <td>{{ penimbangan.nasabah }}</td>
                            <td>{{ penimbangan.jenis }}</td>
                            <td>{{ penimbangan.berat }}</td>
                            <td>{{ penimbangan.total }}</td>
                            <td>
                                <button
                                    @click="editPenimbangan(penimbangan)"
                                    class="btn btn-warning btn-sm"
                                >
                                    <i class="fas fa-edit fa-sm"></i>
                                </button>
                                &nbsp;
                                <button
                                    @click="
                                        deletePenimbangan(
                                            penimbangan.id_penimbangan
                                        )
                                    "
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
        id="penimbanganModal"
        tabindex="-1"
        aria-labelledby="penimbanganModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="penimbanganModalLabel">
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
                    <form @submit.prevent="addPenimbangan">
                        <div class="mb-3">
                            <label for="id_jadwal" class="form-label"
                                >Jadwal Penimbangan</label
                            >
                            <v-select
                                :options="jadwalOptions"
                                placeholder="Pilih Tanggal"
                                v-model="newPenimbangan.id_jadwal"
                                label="label"
                                :reduce="(option) => option.id_jadwal"
                                :required
                            ></v-select>
                        </div>
                        <div class="mb-3">
                            <label for="id_sampah" class="form-label"
                                >Jenis Sampah</label
                            >
                            <v-select
                                :options="sampahOptions"
                                placeholder="Pilih Jenis Sampah"
                                v-model="newPenimbangan.id_sampah"
                                label="label"
                                :reduce="(option) => option.id_sampah"
                                :required
                            ></v-select>
                        </div>
                        <div class="mb-3">
                            <label for="berat" class="form-label"
                                >Berat (Kg)</label
                            >
                            <input
                                type="number"
                                class="form-control"
                                id="berat"
                                @keyup="hitungTotal"
                                v-model="newPenimbangan.berat"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="total" class="form-label">Total</label>
                            <input
                                type="number"
                                class="form-control"
                                id="total"
                                v-model="newPenimbangan.total"
                                readonly
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
        id="editPenimbanganModal"
        tabindex="-1"
        aria-labelledby="editPenimbanganModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editPenimbanganModalLabel">
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
                    <form @submit.prevent="updatePenimbangan">
                        <div class="mb-3">
                            <label for="editId_jadwal" class="form-label"
                                >Jadwal Penimbangan</label
                            >
                            <v-select
                                :options="jadwalOptions"
                                placeholder="Pilih Tanggal"
                                v-model="editPenimbanganData.id_jadwal"
                                label="label"
                                :reduce="(option) => option.id_jadwal"
                                :required
                            ></v-select>
                        </div>
                        <div class="mb-3">
                            <label for="editId_sampah" class="form-label"
                                >Jenis Sampah</label
                            >
                            <v-select
                                :options="sampahOptions"
                                placeholder="Pilih Jenis Sampah"
                                v-model="editPenimbanganData.id_sampah"
                                label="label"
                                :reduce="(option) => option.id_sampah"
                                :required
                            ></v-select>
                        </div>
                        <div class="mb-3">
                            <label for="editBerat" class="form-label"
                                >Berat (Kg)</label
                            >
                            <input
                                type="number"
                                class="form-control"
                                id="editBerat"
                                @keyup="hitungTotalEdit"
                                v-model="editPenimbanganData.berat"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="editTotal" class="form-label">Total</label>
                            <input
                                type="number"
                                class="form-control"
                                id="editTotal"
                                v-model="editPenimbanganData.total"
                                readonly
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
import vSelect from "vue-select";
import { format } from "date-fns";
import "vue-select/dist/vue-select.css";

export default {
    components: { vSelect },
    data() {
        return {
            penimbangan: [],
            newPenimbangan: {
                id_jadwal: "",
                id_sampah: "",
                berat: "",
                total: "",
            },
            editPenimbanganData: {
                id: null,
                id_jadwal: "",
                id_sampah: "",
                berat: "",
                total: "",
            },
            jadwalOptions: [],
            sampahOptions: [],
            sampahPerKg: [],
        };
    },
    mounted() {
        this.fetchPenimbangan();
        this.fetchJadwal();
        this.fetchSampah();
    },
    methods: {
        async fetchSampah() {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/fetchSampah"
                );
                this.sampahOptions = response.data;
            } catch (error) {
                console.error("Error Fetching Sampah: ", error);
            }
        },
        async fetchJadwal() {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/fetchJadwal"
                );
                this.jadwalOptions = response.data;
            } catch (error) {
                console.error("Error Fetching Jadwal: ", error);
            }
        },
        async fetchPenimbangan() {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/getPenimbangan"
                );
                this.penimbangan = response.data;
                this.$nextTick(() => {
                    this.initDataTable();
                });
            } catch (error) {
                console.error("Error Fetching Penimbangan: ", error);
            }
        },
        initDataTable() {
            $("#dataTablePenimbangan").DataTable({
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
            this.newPenimbangan.id_jadwal = "";
            this.newPenimbangan.id_sampah = "";
            this.newPenimbangan.berat = "";
            this.newPenimbangan.total = "";
            const modal = new bootstrap.Modal(
                document.getElementById("penimbanganModal")
            );
            modal.show();
        },
        closeModal() {
            this.newPenimbangan.jenis = "";
            this.newPenimbangan.harga_per_kg = "";
            document.getElementById("closeModal").click();
        },
        reloadPage() {
            this.$router.go(0);
        },
        async addPenimbangan() {
            try {
                await axios.post(
                    "http://localhost:8000/api/addDataPenimbangan",
                    this.newPenimbangan
                );
                this.reloadPage();
            } catch (error) {
                console.error("Error adding post:", error);
            }
        },
        async deletePenimbangan(id) {
            if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                try {
                    await axios.delete(
                        `http://localhost:8000/api/deleteDataPenimbangan/${id}`
                    );
                    this.reloadPage();
                } catch (error) {
                    console.error("Error deleting data:", error);
                }
            }
        },
        editPenimbangan(penimbangan) {
            console.log(penimbangan);
            this.editPenimbanganData.id = penimbangan.id_penimbangan;
            this.editPenimbanganData.id_jadwal = penimbangan.id_jadwal;
            this.editPenimbanganData.id_sampah = penimbangan.id_sampah;
            this.editPenimbanganData.berat = penimbangan.berat;
            this.editPenimbanganData.total = penimbangan.total;

            const modal = new bootstrap.Modal(
                document.getElementById("editPenimbanganModal")
            );
            modal.show();
        },
        async updatePenimbangan() {
            try {
                await axios.put(
                    `http://localhost:8000/api/updateDataPenimbangan/${this.editPenimbanganData.id}`,
                    {
                        id_jadwal: this.editPenimbanganData.id_jadwal,
                        id_sampah: this.editPenimbanganData.id_sampah,
                        berat: this.editPenimbanganData.berat,
                        total: this.editPenimbanganData.total,
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
        async fetchSampahById() {
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/fetchSampahById",
                    this.newPenimbangan
                );
                this.sampahPerKg = response.data[0];
            } catch (error) {
                console.error("Error adding post:", error);
            }
        },
        async fetchSampahByIdEdit() {
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/fetchSampahById",
                    this.editPenimbanganData
                );
                this.sampahPerKg = response.data[0];
            } catch (error) {
                console.error("Error adding post:", error);
            }
        },
        hitungTotal() {
            this.fetchSampahById().then(() => {
                if (
                    this.newPenimbangan.berat &&
                    this.sampahPerKg.harga_per_kg
                ) {
                    this.newPenimbangan.total =
                        this.newPenimbangan.berat *
                        this.sampahPerKg.harga_per_kg;
                }
            });
        },
        hitungTotalEdit() {
            this.fetchSampahByIdEdit().then(() => {
                if (
                    this.editPenimbanganData.berat &&
                    this.sampahPerKg.harga_per_kg
                ) {
                    this.editPenimbanganData.total =
                        this.editPenimbanganData.berat *
                        this.sampahPerKg.harga_per_kg;
                }
            });
        },
    },
    beforeUnmount() {
        // Hancurkan DataTable saat komponen dibongkar
        $("#dataTableJadwal").DataTable().destroy(true);
    },
};
</script>
