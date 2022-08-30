import swal from 'sweetalert2';
import api from "./api";
const moment = require("moment");

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

export async function showPostAlert(callBack) {
    return new Promise((resolve) => {
        swal.fire({
            title: "What's happening?",
            input: 'textarea',
            showCancelButton: true,
            confirmButtonText: 'Post',
            preConfirm: (text) => {
                const token = localStorage.getItem("token");
                api("createPost", { token, text, repliedToID: 0 }, true).then(function () {
                    callBack();
                });
            }
        });
        resolve();
    });
};

export async function showBioAlert() {
    return new Promise((resolve) => {
        swal.fire({
            title: "Add Bio",
            input: 'textarea',
            showCancelButton: true,
            confirmButtonText: 'Post',
            preConfirm: (bio) => {
                const token = localStorage.getItem("token");
                showLoadingAlert("updateBio", { token, bio }, true, "put").then(res => {
                    resolve(bio);
                });
            }
        });
    });
};

export async function showReplyAlert(userName, repliedToID, callBack = null) {
    return new Promise((resolve) => {
        swal.fire({
            title: `Replying to @${userName}`,
            input: 'textarea',
            showCancelButton: true,
            confirmButtonText: 'Post',
            preConfirm: (text) => {
                const token = localStorage.getItem("token");
                showLoadingAlert("createPost", { token, text, repliedToID }, true).then(res => {
                    if (callBack) {
                        callBack();
                    }
                });
            }
        });
        resolve();
    });
};

export async function showLoadingAlert(action, params, requiresAuth = false, method = "post") {
    return new Promise((resolve) => {
        try {
            swal.fire({
                title: "Loading...",
                timerProgressBar: true,
                allowOutsideClick: () => !swal.isLoading(),
                didOpen: async () => {
                    let time = new Date().getTime();
                    swal.showLoading();

                    const res = await api(action, params, requiresAuth, method)

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

export const formatDate = (entryDate, mask) => {
    if (!entryDate) {
        return null;
    }

    const msk = (mask === undefined) ? 'MM/DD/YYYY hh:mm A' : mask;
    const d = getValidDate(entryDate);
    //const d = new Date(entryDate).toUTCString();

    if (d === null) {
        return null;
    }
    const m = moment(d);

    return m.format(msk);
}

export const getValidDate = (entryDate) => {
    // let date = (entryDate) || new Date().toISOString();
    let date = (new Date(entryDate)).getTime() - (5000 * 60 * 60)
    date = new Date(date).toISOString();

    if (typeof entryDate === 'object') {
        date = new Date(Date.parse(date)).toString();
    } else {
        if (date.indexOf('GMT') > 0) {
            date = new Date(Date.parse(date)).toString();
        }
        if (date.indexOf(':') > 0) {
            date = new Date(date).toString();
        } else {
            date = new Date(date + ' 12:00:00:0.00Z').toString();
        }
    }
    const resDate = new Date(date);

    return resDate; //new Date(Date.parse(resDate));
}

export async function showDeletePostAlert(postID) {
    return new Promise((resolve) => {
        try {
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = showLoadingAlert("deletePost", { userID: localStorage.getItem("userID"), postID }, true, "post");
                    resolve(res || {
                        data: {
                            success: false,
                            message: "Could not delete your post. Please try again later."
                        }
                    });
                }
            });
        } catch (error) {
            resolve({
                data: {
                    success: false,
                    message: "Could not delete your post. Please try again later."
                }
            });
        }
    });
}

export async function showDeleteProfileAlert() {
    return new Promise((resolve) => {
        try {
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = showLoadingAlert("deleteProfile", { userID: localStorage.getItem("userID") }, true, "post");
                    resolve(res || {
                        data: {
                            success: false,
                            message: "Could not delete your profile. Please try again later."
                        }
                    });
                }
            });
        } catch (error) {
            resolve({
                data: {
                    success: false,
                    message: "Could not delete your profile. Please try again later."
                }
            });
        }
    });
}