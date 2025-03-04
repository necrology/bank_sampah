<template>
    <div class="login-form">
        <div class="container">
            <!-- Outer Row -->
            <div class="row justify-content-center d-flex align-items-center" style="height: 100vh;">
                <div class="col-lg-6 col-md-6">
                    <div
                        class="card o-hidden border-0 shadow-lg my-5 col-lg-12"
                    >
                        <div class="card-body p-0">
                            <!-- Nested Row within Card Body -->
                            <div class="row">
                                <!-- <div class="col-lg-6 d-flex"> -->
                                <!-- <div class="col-lg-10 mx-auto p-3 m-3"> -->
                                <!-- <img
                                            width="100%"
                                            src="assets/img/login.jpeg"
                                            alt="Gambar Login"
                                        /> -->
                                <!-- </div> -->
                                <!-- </div> -->
                                <div class="col-lg-12">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900">
                                                Bank Sampah Bersinar
                                            </h1>
                                            <h1 class="h4 text-gray-900 mb-4">
                                                Login
                                            </h1>
                                        </div>
                                        <form
                                            class="user"
                                            @submit.prevent="login"
                                        >
                                            <div class="form-group">
                                                <input
                                                    type="email"
                                                    class="form-control form-control-user"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    v-model="email"
                                                />
                                            </div>
                                            <div class="form-group">
                                                <input
                                                    type="password"
                                                    class="form-control form-control-user"
                                                    id="exampleInputPassword"
                                                    placeholder="Password"
                                                    v-model="password"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                class="btn btn-primary btn-user btn-block"
                                            >
                                                Login
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "/public/sbadmin2/css/sb-admin-2.min.css";
import "/public/sbadmin2/vendor/fontawesome-free/css/all.min.css";

import axios from "axios";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            email: "",
            password: "",
            responseMessage: "",
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/login",
                    {
                        email: this.email,
                        password: this.password,
                    }
                );

                // Redirect ke halaman dashboard setelah login berhasil
                // window.location.href = "/dashboard";
                this.responseMessage = response.data.message;
                console.log(this.responseMessage);

                if (this.responseMessage == "Login Failed") {
                    Swal.fire({
                        text: "Email atau Password Salah!",
                        icon: "error",
                    }).then((result) => {
                        this.email = "";
                        this.password = "";
                        this.responseMessage = "";
                    });
                } else if (this.responseMessage == "Login successful") {
                    Swal.fire({
                        text: "Login Sukses!",
                        icon: "success",
                    }).then((result) => {
                        this.email = "";
                        this.password = "";
                        this.responseMessage = "";
                        window.location.href = "/dashboard";
                    });
                } else {
                    Swal.fire({
                        text: this.responseMessage,
                        icon: "warning",
                    }).then((result) => {
                        this.email = "";
                        this.password = "";
                        this.responseMessage = "";
                    });
                }
            } catch (error) {
                // console.log(error);
                // this.responseMessage = error.message;
                Swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                });
            }
        },
    },
};
</script>
