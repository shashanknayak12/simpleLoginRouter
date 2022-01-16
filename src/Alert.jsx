import React from 'react';

function Alert(props) {
    return (
        <div className={`alert-custom ${props.type}`}>
            {props.message}

        </div>
    );
}

export default Alert;