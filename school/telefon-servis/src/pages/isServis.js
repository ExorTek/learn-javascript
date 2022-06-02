import React, {useEffect, useState} from 'react';
import {Table, Tag, message, Popconfirm, Button} from 'antd';
import axios from "axios";
import {Login} from "./index";
import {useNavigate} from "react-router";

function IsServis(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if (token !== "true" || token === '' || !token) {
        return navigate('/')
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!data) {
            axios.get('http://localhost:5001/api/main/serviste-olan-telefonlar')
                .then(res => {
                    setData(res.data.filter(x => x.serviseAlindiMi === "isServis"));
                })
                .catch(err => {
                    message.error(err.message);
                })
        }
    }, [data]);
    const deleteRow = (id) => {
        if (id) {
            axios.delete(`http://localhost:5001/api/main/servisten-sil/${id}`).then(res => {
                setData(null);
                message.success("Servisten Silme Başarıyla Gerçekleşti.");
            }).catch(error => message.error("Servisten Silme Başarısız."));
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Kullanıcı ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Telefon ID',
            dataIndex: 'telefonId',
            key: 'telefonId',
        },
        {
            title: 'Servis Durumu',
            key: 'serviseAlindiMi',
            dataIndex: 'serviseAlindiMi',
            render: (text, record) => (
                <>
                    {record.serviseAlindiMi === "isServis" ? <Tag color="green">Evet</Tag> :
                        <Tag color="red">Hayır</Tag>}
                </>
            )
        },
        {
            title: 'Açıklama',
            key: 'aciklama',
            dataIndex: 'aciklama',

        },
        {
            title: 'Sil',
            dataIndex: 'delete',
            key: 'delete',
            width: "60px",
            render: (text, record) => (
                <div className="w-full sm:flex-row flex-col flex justify-end items-center mb-4 gap-4">
                    <Popconfirm
                        onConfirm={() => deleteRow(record.id)}
                        title="Silmeyi Onaylıyor musunuz?"
                        okText="Onayla"
                        cancelText="Vazgeç"
                    >
                        <Button type="primary" danger color="--color-secondary">
                            Sil
                        </Button>
                    </Popconfirm>
                </div>
            )
        },
    ];

    return (
        <div className="flex justify-center">
            <Table columns={columns} dataSource={data}/>
        </div>
    );
}

export default IsServis;