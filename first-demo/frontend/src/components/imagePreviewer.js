import React from 'react';

function ImagePreviewer(src) {
    console.log(src)
    return (
        <div style={{gap: 10}}
             className={`items-center w-full  rounded-md`}>
                <img className="w-3/4 h-full object-contain"
                     src={src.value}
                     alt="product image"/>
        </div>
    );
}

export default ImagePreviewer;