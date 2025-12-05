'use client'
import React, { useEffect } from "react";
import swal from "sweetalert";

const LoginSignupPopup = ({
    title = "Success",
    message = "Operation completed successfully",
    type = "success",
    accessToken,
    id
}) => {
    useEffect(() => {
        if (!accessToken) return;

        swal(title, message, type, {
            buttons: false,
            timer: 2000,
            className: id
        }).then(() => {
            // Save to localStorage

            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        });
    }, [accessToken, title, message, type]);

    return null;
};

export default LoginSignupPopup;
