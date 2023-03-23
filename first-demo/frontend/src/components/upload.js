import React from 'react';
import Resizer from "react-image-file-resizer";

const UploadPhoto = ({src, handleFile, className, imageSize}) => {
    let width = imageSize == "large" ? 500 : 250, height = imageSize == "large" ? 750 : 500
    const resizeFile = async (event) => {
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0]
            let croppedFile = await new Promise((resolve) => {
                Resizer.imageFileResizer(file, width, height, "JPEG", 100,
                    0, (file) => {
                        resolve(file)
                    }, "file");
            })
            handleFile(croppedFile)
        }
    }

    return (
        <div style={{gap: 10}}
             className={`flex  flex-col items-center w-full rounded-md ${className || ""} ${src ? '' : ' border-2 border-gray-300 border-dashed '}`}>
            {src && (
                <img className="w-full h-full object-contain"
                     src={src}
                     alt="product image"/>
            )}
            {!src && (
                <div className={'w-full flex h-full flex-col justify-center'}>
                    <svg className="mx-auto w-full h-12 text-gray-400" stroke="currentColor" fill="none"
                         viewBox="0 0 48 48" aria-hidden="true">
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="flex text-sm items-center justify-center text-gray-600 flex-col w-full">
                        <label
                            htmlFor="file-upload"
                            className="relative text-center items-center flex flex-col justify-center w-full cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                            <label htmlFor={"file"} className=" w-full">Upload images</label>
                            <input multiple id="file"
                                   onChange={resizeFile}
                                   className="sr-only text-center  w-full"
                                   type="file" accept=".jpg, .jpeg, .png" name="file"/>
                        </label>
                        <p className="pl-1 w-full text-center">click and upload</p>
                    </div>
                    <p className="text-xs text-gray-500 text-center w-full">PNG, JPG, JPEG</p>
                </div>
            )}
        </div>
    )
}

export default UploadPhoto;
