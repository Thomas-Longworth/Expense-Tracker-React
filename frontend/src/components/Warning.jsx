import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
const Warning = ({ available }) => {
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (available < 0) {
            setShowToast(true);
            const timeout = setTimeout(() => {
                setShowToast(false);
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [available]);
    console.log(available)

    const handleClose = () => {
        setShowToast(false);
    };

    return (
        <>
            {showToast && (
                <div class="position-fixed top-0 end-0 p-3 toast-container "  >
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <button onClick={handleClose} type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                        <div className="toast-header text-danger   ">
                            <FaExclamationTriangle />
                            <strong className="mr-auto text-danger text-center">----WARNING----</strong>
                            <FaExclamationTriangle />


                        </div>

                        <div className="toast-body ">
                            You are currently overspending your budget!
                        </div>
                    </div>

                </div>

            )}
        </>
    );
};

export default Warning;