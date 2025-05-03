<template>
    <!-- Page Wrapper -->
    <div id="wrapper">
        <!-- Sidebar -->
        <ul
            class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            <!-- Sidebar - Brand -->
            <a
                class="sidebar-brand d-flex align-items-center justify-content-center"
            >
                <div class="sidebar-brand-icon">
                    <img
                        src="/../landing/assets/img/logo.png"
                        style="width: 50px; height: 50px"
                    />
                </div>
                <div class="sidebar-brand-text mx-3">Bank Sampah</div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0" />

            <!-- Nav Item - Dashboard -->
            <li class="nav-item" :class="{ active: isActive('/dashboard') }">
                <router-link to="/dashboard" class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></router-link
                >
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider my-0" />

            <!-- Nav Item - Dashboard -->
            <li
                class="nav-item"
                :class="{ active: isActive('/dashboard/sampah') }"
            >
                <router-link to="/dashboard/sampah" class="nav-link">
                    <i class="fas fa-fw fa-trash"></i>
                    <span>Sampah</span></router-link
                >
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider my-0" />

            <!-- Nav Item - Dashboard -->
            <li
                class="nav-item"
                :class="{ active: isActive('/dashboard/nasabah') }"
            >
                <router-link to="/dashboard/nasabah" class="nav-link">
                    <i class="fas fa-fw fa-users"></i>
                    <span>Nasabah</span></router-link
                >
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider my-0" />

            <!-- Nav Item - Dashboard -->
            <li
                class="nav-item"
                :class="{ active: isActive('/dashboard/jadwalPenimbangan') }"
            >
                <router-link to="/dashboard/jadwalPenimbangan" class="nav-link">
                    <i class="fas fa-fw fa-calendar"></i>
                    <span>Jadwal Penimbangan</span></router-link
                >
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider my-0" />

            <!-- Nav Item - Dashboard -->
            <li
                class="nav-item"
                :class="{ active: isActive('/dashboard/penimbangan') }"
            >
                <router-link to="/dashboard/penimbangan" class="nav-link">
                    <i class="fas fa-fw fa-balance-scale"></i>
                    <span>Penimbangan</span></router-link
                >
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider" />

            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button
                    class="rounded-circle border-0"
                    id="sidebarToggle"
                ></button>
            </div>
        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
                <!-- Topbar -->
                <nav
                    class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
                >
                    <!-- Sidebar Toggle (Topbar) -->
                    <button
                        id="sidebarToggleTop"
                        class="btn btn-link d-md-none rounded-circle mr-3"
                    >
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="userDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span
                                    class="mr-2 d-none d-lg-inline text-gray-600 small"
                                    >Douglas McGee</span
                                >
                                <img
                                    class="img-profile rounded-circle"
                                    src="/../sbadmin2/img/undraw_profile.svg"
                                />
                            </a>
                            <!-- Dropdown - User Information -->
                            <div
                                class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown"
                            >
                                <a class="dropdown-item" href="#">
                                    <i
                                        class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"
                                    ></i>
                                    Profile
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i
                                        class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"
                                    ></i>
                                    Settings
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i
                                        class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"
                                    ></i>
                                    Activity Log
                                </a>
                                <div class="dropdown-divider"></div>
                                <a
                                    class="dropdown-item"
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#logoutModal"
                                >
                                    <i
                                        class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                                    ></i>
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <router-view />
                </div>
                <!-- /.container-fluid -->
            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Bank Sampah Bersinar 2025</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div
        class="modal fade"
        id="logoutModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Ready to Leave?
                    </h5>
                    <button
                        class="close"
                        type="button"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    Select "Logout" below if you are ready to end your current
                    session.
                </div>
                <div class="modal-footer">
                    <button
                        class="btn btn-secondary"
                        type="button"
                        data-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";

export default {
    data() {
        return {
            userName: null,
        };
    },
    mounted() {
        axios
            .get("http://127.0.0.1:8000/api/session", { withCredentials: true })
            .then((response) => {
                this.userName = response.data.user_name;
            })
            .catch((error) => {
                console.error("Error fetching session:", error);
            });
        // Toggle the side navigation
        $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
                $(".sidebar .collapse").collapse("hide");
            }
        });
    },
    setup() {
        const route = useRoute();

        // Fungsi untuk memeriksa apakah path saat ini aktif
        const isActive = (path) => {
            return route.path === path;
        };

        return { isActive };
    },
};
</script>
