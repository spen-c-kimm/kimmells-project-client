import swal from 'sweetalert2';
import api from "./api";

export async function wait(timeToDelay) {
    return new Promise((resolve) => setTimeout(resolve, timeToDelay));
};

export async function showSuccessAlert(message, title = "Success!", timer = 1500) {
    return new Promise((resolve) => {
        swal.fire({
            title: title,
            text: message,
            icon: "success",
            timer: timer
        }).then(() => {
            resolve();
        });

    });
};

export async function showFailureAlert(message, title = "Error!", timer = 1500) {
    return new Promise((resolve) => {
        swal.fire({
            title: title,
            text: message,
            icon: "error",
            buttons: false,
            timer: timer
        }).then(() => {
            resolve();
        });

    });
};

export async function showPostAlert(userID, repliedToID = 0) {
    return new Promise((resolve) => {
        swal.fire({
            title: "What's happening?",
            input: 'textarea',
            showCancelButton: true,
            confirmButtonText: 'Post',
            preConfirm: (text) => {
                const token = localStorage.getItem("token");
                showLoadingAlert("createPost", { token, text, repliedToID }).then(res => {
                    console.log("res: ", res);
                });                
            }
        });
        resolve();
    });
};

export async function showLoadingAlert(action, params, requiresAuth = false) {
    return new Promise((resolve) => {
        try {
            swal.fire({
                title: "Loading...",
                timerProgressBar: true,
                allowOutsideClick: () => !swal.isLoading(),
                didOpen: async () => {
                    let time = new Date().getTime();
                    swal.showLoading();

                    const res = await api(action, params, requiresAuth)

                    time = new Date().getTime() - time;

                    if (time < 1000) {
                        await wait(1000 - time);
                    }

                    swal.close();
                    resolve(res);
                }
            });
        } catch (error) {
            resolve(error);
        }
    });
};