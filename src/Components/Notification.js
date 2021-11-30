import { Toast } from 'react-bootstrap'

export default function Notifications(RemoveToast, index) {
    return (
        <Toast key={index} onClose={RemoveToast} className="p-3" id="toast">
            <Toast.Header id="toastHead">
                <strong className="me-auto">Aleks</strong>
                <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>hellloooooo</Toast.Body>
        </Toast>

    )
}
