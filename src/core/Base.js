import React from 'react';
const Base = ({
    title = "My title",
    description = "Welcome to Tshop",
    className = "bg-dark text-white p-4",
    children
}) => {
    return (
                <div className="jumbotron bg-dark text-white text-center py-3">
                    <h1 className="display-4">
                        {title}
                    </h1>
                    <p>{description}</p>
                </div>
    );
}

export default Base;
