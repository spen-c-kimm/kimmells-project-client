import swal from 'sweetalert';

export async function showSuccessAlert(message, title = "Success!", timer = 1500) {
    return new Promise((resolve) => {
        swal({
            title: title,
            text: message,
            icon: "success",
            timer: timer
        }).then(() => {
            resolve();
        });

    });
}

export async function showFailureAlert(message, title = "Error!", timer = 1500) {
    return new Promise((resolve) => {
        swal({
            title: title,
            text: message,
            icon: "error",
            buttons: false,
            timer: timer
        }).then(() => {
            resolve();
        });

    });
}