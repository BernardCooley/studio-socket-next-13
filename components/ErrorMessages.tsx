import React, { useState, useEffect } from "react";

interface Props {
    errorMessages?: string[];
}

const ErrorMessages = ({ errorMessages }: Props) => {
    return (
        <div className="text-error">
            {errorMessages &&
                errorMessages.length > 0 &&
                errorMessages.map((error) => (
                    <div key={JSON.stringify(error)}>{error}</div>
                ))}
        </div>
    );
};

export default ErrorMessages;
