import React, {useState} from 'react';
import ImgCrop from 'antd-img-crop';
import {Upload} from 'antd';

const getSrcFromFile = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
    });
};

function UploadPhotoModal({photoArray}) {
    const [fileList, setFileList] = useState([]);
    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
        photoArray(fileList);
    };

    const onPreview = async (file) => {
        const src = file.url || (await getSrcFromFile(file));
        const imgWindow = window.open(src);
        if (imgWindow) {
            const image = new Image();
            image.src = src;
            imgWindow.document.write(image.outerHTML);
        } else {
            window.location.href = src;
        }
    };
    return (
        <ImgCrop grid rotate>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {fileList.length < 4 && '+ Upload'}
            </Upload>
        </ImgCrop>
    );
}

export default UploadPhotoModal;