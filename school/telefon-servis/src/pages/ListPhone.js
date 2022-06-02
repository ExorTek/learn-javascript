import React, {useEffect, useState} from 'react';
import {Table, Tag, Space, message, Popconfirm, Button, Modal, DatePicker, Form, Select} from 'antd';
import axios from "axios";
import brands from "../toolbox/brands.json";
import models from "../toolbox/models.json";
import {Option} from "antd/es/mentions";
import moment from "moment";
import {Login} from "./index";
import {useNavigate} from "react-router";

function ListPhone(props) {
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
    const [model, setModel] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!data) {
            axios.get('http://localhost:5001/api/main/telefonlar')
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    message.error(err.response.data.message);
                })
        }
    }, [data]);
    const deleteRow = (id) => {
        if (id) {
            axios.delete(`http://localhost:5001/api/main/telefon-sil/${id}`).then(res => {
                setData(null);
                message.success("Telefon Silme Başarıyla Gerçekleşti.");
            }).catch(error => message.error("Telefon Silme Başarısız."));
        }
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        console.log(newData)
        if (newData.marka && newData.model && newData.uretimZamani) {
            if (newData.id) {
                axios.put(`http://localhost:5001/api/main/telefon-guncelle/${newData.id}`, newData).then(res => {
                    setIsModalVisible(false);
                    setData(null);
                    setNewData({})
                    message.success("Telefon Güncelleme Başarıyla Gerçekleşti.");
                    window.location.reload()
                }).catch(error => message.error("Telefon Güncelleme Başarısız."));
            } else {
                axios.post(`http://localhost:5001/api/main/telefon-ekle`, newData).then(res => {
                    setData(res.data);
                    setIsModalVisible(false);
                    setNewData({})
                    message.success("Telefon Ekleme Başarıyla Gerçekleşti.");
                    window.location.reload()
                }).catch(error => message.error("Telefon Ekleme Başarısız."));
            }
        } else {
            message.error("Alanları Doldurunuz.");
        }
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
            title: 'Marka',
            dataIndex: 'marka',
            key: 'marka',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Seri No',
            key: 'seriNo',
            dataIndex: 'seriNo',
        },
        {
            title: 'Üretim Tarihi',
            key: 'uretimZamani',
            dataIndex: 'uretimZamani',
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
        {
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
                    Telefon Ekle
                </Button>
            </div>
            <Table style={{overflow: 'auto'}} columns={columns} dataSource={data}/>
            <Modal width={'35%'}
                   title={`${newData.id ? 'Telefon Güncelle' : 'Telefon Ekle'}`}
                   okText={`${newData.id ? 'Telefon Güncelle' : 'Telefon Ekle'}`}
                   cancelText="İptal"
                   visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel}>
                <Form labelCol={{span: 6}}>
                    <Form.Item name="marka" label="Marka" rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Select
                            defaultValue={newData?.marka ?? null}
                            labelInValue
                            className="outline-none mx-auto  text-left md:ml-2 items-center w-full md:w-4/5 border-2 py-2 px-3 rounded-2xl"
                            onChange={(selected) => {
                                setNewData({...newData, marka: selected.value})
                                setModel(models?.find((number) => number.name === selected.value))
                            }}>
                            {brands?.map((number) => (
                                <Option key={number} value={number}>{number}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="model" label="Model" rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Select
                            defaultValue={newData?.model ?? null}
                            labelInValue
                            className="outline-none mx-auto  text-left md:ml-2 items-center w-full md:w-4/5 border-2 py-2 px-3 rounded-2xl"
                            onChange={(selected) => setNewData({...newData, model: selected.value})}>
                            {model?.model?.map((number) => (
                                <Option key={number} value={number}>{number}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="uretimZamani" label="Üretim Zamanı"
                               rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <DatePicker
                            onChange={(e) => setNewData({...newData, uretimZamani: moment(e).format('MM/DD/YYYY')})}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ListPhone;