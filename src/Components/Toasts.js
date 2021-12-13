import { memo, useContext } from "react";
import { ToastContainer } from "react-bootstrap";
import { GlobalContext } from '../GlobalContext';

export default memo(() => {
    const [toasts, setToasts] = useContext(GlobalContext);
    
    function removeToast(index) {
        toasts.splice(index, 1);
        setToasts([...toasts]);
    }
    
    return (
        <ToastContainer id="toastContainer" position="bottom-start">
            {
                toasts.map((toast, index) => {
                    return toast(removeToast, index)
                })
            }
        </ToastContainer>
    )
});
