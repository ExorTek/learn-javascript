import React, {useEffect, useState} from 'react';
import {Table, Tag, message, Popconfirm, Button, Form, Select, Modal, Switch, Card} from 'antd';
import axios from "axios";
import brands from "../toolbox/brands.json";
import {Option} from "antd/es/mentions";
import Input from "../toolbox/input";
import {Login} from "./index";
import {useNavigate} from "react-router";

function ListWorker(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if (token !== "true" || token === '' || !token) {
        return navigate('/')
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isModalVisible, setIsModalVisible] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [newData, setNewData] = useState({});

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!data) {
            axios.get('http://localhost:5001/api/main/calisanlar')
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    message.error(err.message);
                })
        }
    }, [data]);
    const deleteRow = (id) => {
        if (id) {
            axios.delete(`http://localhost:5001/api/main/calisan-sil/${id}`).then(res => {
                setData(null);
                message.success("Çalışan Silme Başarıyla Gerçekleşti.");
            }).catch(error => message.error("Çalışan Silme Başarısız."));
        }
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        if (newData.adSoyad && newData.maas && newData.yetkiliMarka) {
            if (newData.id) {
                axios.put(`http://localhost:5001/api/main/calisan-guncelle/${newData.id}`, {
                    ...newData,
                    maas: parseFloat(newData.maas)
                }).then(res => {
                    setIsModalVisible(false);
                    setData(null);
                    setNewData({})
                    message.success("Çalışan Güncelleme Başarıyla Gerçekleşti.");
                }).catch(error => message.error("Çalışan Güncelleme Başarısız."));
            } else {
                axios.post(`http://localhost:5001/api/main/calisan-ekle`, {
                    ...newData,
                    maas: parseFloat(newData.maas)
                }).then(res => {
                    setData(res.data);
                    setIsModalVisible(false);
                    setNewData({})
                    message.success("Çalışan Ekleme Başarıyla Gerçekleşti.");
                }).catch(error => console.log(error));
            }
        } else {
            message.error("Alanları Doldurunuz.");
        }
        document.querySelectorAll("input").forEach(input => input.value = "");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setNewData({});
        document.querySelectorAll("input").forEach(input => input.value = "");
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ad Soyad',
            dataIndex: 'adSoyad',
            key: 'adSoyad',
        },
        {
            title: 'Calışıyor mu?',
            dataIndex: 'calisiyorMu',
            key: 'calisiyorMu',
            render: (text, record) => (
                <>
                    {record.calisiyorMu ? <Tag color="green">Evet</Tag> : <Tag color="red">Hayır</Tag>}
                </>
            )
        },
        {
            title: 'Maaş',
            key: 'maas',
            dataIndex: 'maas',
            render: (text, record) => (
                <>
                    {record.maas} TL
                </>
            )
        },
        {
            title: 'Yetkili Olduğu Marka',
            key: 'yetkiliMarka',
            dataIndex: 'yetkiliMarka',
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
        }, {
            title: 'Güncelle',
            dataIndex: 'update',
            key: 'update',
            width: "60px",
            render: (text, record) => (
                <div className="w-full sm:flex-row flex-col flex justify-end items-center mb-4 gap-4">
                    <Button className="guncelle-btn" onClick={() => {
                        setNewData(record)
                        showModal()
                    }} type="primary">
                        Güncelle
                    </Button>
                </div>
            )
        },
    ];


    return (
        <div className="flex flex-col mx-auto  max-w-3xl">
            <div className="mx-auto mb-2">
                <Button className="ekle-btn" onClick={() => showModal()} type="primary"
                        color="--color-secondary">
                    Çalışan Ekle
                </Button>
            </div>
            <Table columns={columns} dataSource={data}/>
            <Modal width={'35%'}
                   title={`${newData.id ? 'Çalışan Güncelle' : 'Çalışan Ekle'}`}
                   okText={`${newData.id ? 'Çalışan Güncelle' : 'Çalışan Ekle'}`}
                   cancelText="İptal"
                   visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel}>
                {newData?.id && (
                    <Card title="Önceki Bilgiler" style={{width: '100%'}}>
                        <p>Adı Soyadı:{` ${newData.adSoyad}`}</p>
                        <p>Maaş:{` ${newData.maas} TL`}</p>
                        <p>Yetkili Olduğu Marka:{` ${newData.yetkiliMarka}`}</p>
                        <p>Çalışıyor Mu:{' '}{newData.calisiyorMu ? <Tag color="green">Evet</Tag> :
                            <Tag color="red">Hayır</Tag>}</p>
                    </Card>
                )}
                <Form>
                    <Form.Item name="adSoyad"
                               rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Input maxLength={50} setForm={setNewData} form={newData} field={'adSoyad'}
                               label={'Adı Soyadı'}/>
                    </Form.Item>

                    <Form.Item name="maas"
                               rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Input maxLength={50} setForm={setNewData} form={newData} field={'maas'}
                               label={'Maaş'}/>
                    </Form.Item>
                    <Form.Item name="yetkiliMarka" label="Yetkili Marka"
                               rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Select
                            defaultValue={newData?.yetkiliMarka ?? null}
                            labelInValue
                            className="outline-none mx-auto  text-left md:ml-2 items-center w-full md:w-4/5 border-2 py-2 px-3 rounded-2xl"
                            onChange={(selected) => {
                                setNewData({...newData, yetkiliMarka: selected.value})
                            }}>
                            {brands?.map((number) => (
                                <Option key={number} value={number}>{number}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="calisiyorMu" label="Çalışıyor Mu"
                               rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Switch onChange={e => setNewData({...newData, calisiyorMu: e})}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ListWorker;