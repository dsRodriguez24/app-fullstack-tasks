import Swal from 'sweetalert2'


export const toastSw2 = (title: string, text: string, icon: any) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)

            try {
                const container = toast.parentElement as HTMLElement | null;
                if (container) {
                    container.style.zIndex = '14000';
                }
                (toast as HTMLElement).style.zIndex = '14001';
            } catch (e) {
                // no-op
            }
        }
    })

    Toast.fire({
        icon: icon,
        title: title,
        // text: text
    })

}