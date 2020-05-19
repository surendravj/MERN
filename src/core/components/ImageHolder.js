import React from 'react';
import { API } from '../../backend';
const ImageHolder = ({product}) => {
    const image = product ? `${API}/product/photo/${product._id}` : "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940h"
    return (
        <div className="rounded border border-success p-2">
            <img
                src={image}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>
    );
}

export default ImageHolder;
