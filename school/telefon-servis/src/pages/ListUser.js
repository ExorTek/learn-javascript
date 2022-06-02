import React, {useEffect, useState} from 'react';
import {Table, Tag, Space, message, Popconfirm, Button, Form, Select, DatePicker, Modal, Card} from 'antd';
import axios from "axios";
import models from "../toolbox/models.json";
import brands from "../toolbox/brands.json";
import {Option} from "antd/es/mentions";
import moment from "moment";
import Input from "../toolbox/input";
import {useNavigate} from "react-router";

function ListUser(props) {
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
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [newData, setNewData] = useState({});

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [newData2, setNewData2] = useState({});

    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModal2 = () => {
        setIsModalVisible2(true);
    };
    const handleOk = () => {
        if (newData.adiSoyadi && newData.telefon && newData.tcNo) {
            if (newData.id) {
                axios.put(`http://localhost:5001/api/main/kullanici-guncelle/${newData.id}`, newData).then(res => {
                    setIsModalVisible(false);
                    setData(null);
                    setNewData({})
                    message.success("Kullanıcı Güncelleme Başarıyla Gerçekleşti.");
                }).catch(error => message.error("Kullanıcı Güncelleme Başarısız."));
            } else {
                axios.post(`http://localhost:5001/api/main/kullanici-ekle`, newData).then(res => {
                    setData(res.data);
                    setIsModalVisible(false);
                    setNewData({})
                    message.success("Kullanıcı Ekleme Başarıyla Gerçekleşti.");
                }).catch(error => message.error("Kullanıcı Ekleme Başarısız."));
            }
        } else {
            message.error("Alanları Doldurunuz.");
        }
        document.querySelectorAll("input").forEach(input => input.value = "");
    };
    const handleOk2 = () => {
        let datas = {
            ...newData2,
            faturaTarihi: moment(new Date()).format('MM/DD/YYYY'),
            userId: Number(newData2.userId),
            telefonId: Number(newData2.telefonId)
        }
        if (newData2.userId && newData2.telefonId) {
            axios.post(`http://localhost:5001/api/main/kullanici-telefon-ekle`, datas).then(res => {
                setIsModalVisible2(false);
                setNewData2({})
                message.success("Telefon Ekleme Başarıyla Gerçekleşti.");
            }).catch(error => message.error("Telefon Ekleme Başarısız."));
        } else {
            message.error("Alanları Doldurunuz.");
        }
        document.querySelectorAll("input").forEach(input => input.value = "");
    };
    const handleCancel2 = () => {
        setIsModalVisible2(false);
        setNewData2({});
        document.querySelectorAll("input").forEach(input => input.value = "");
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setNewData({});
        document.querySelectorAll("input").forEach(input => input.value = "");
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [telefonlar, setTelefonlar] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!data) {
            axios.get('http://localhost:5001/api/main/kullanicilar')
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    message.error(err.message);
                })
        }

    }, [data]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!telefonlar) {
            axios.get('http://localhost:5001/api/main/telefonlar')
                .then(res => {
                    setTelefonlar(res.data);
                })
                .catch(err => {
                    message.error(err.response.data.message);
                })
        }
    }, [telefonlar]);
    const deleteRow = (id) => {
        if (id) {
            axios.delete(`http://localhost:5001/api/main/kullanici-sil/${id}`).then(res => {
                setData(null);
                message.success("Kullanıcı Silme Başarıyla Gerçekleşti.");
            }).catch(error => message.error("Kullanıcı Silme Başarısız."));
        }
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Adı Soyadı',
            dataIndex: 'adiSoyadi',
            key: 'adiSoyadi',
        },
        {
            title: 'Adres',
            dataIndex: 'adres',
            key: 'adres',
        },
        {
            title: 'Telefon',
            key: 'telefon',
            dataIndex: 'telefon',
            render: (text, record) => (
                <span>
                    {record.telefon}
                </span>
            ),
        },
        {
            title: 'TC Kimlik Numarası',
            key: 'tcNo',
            dataIndex: 'tcNo',
            render: (text, record) => (
                <span>
                    {record.tcNo}
                </span>
            ),
        },
        {
            title: 'Sil',
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
        {
            title: 'Kullanıcıya Telefon Kaydet',
            width: "60px",
            render: (text, record) => (
                <div className="w-full sm:flex-row flex-col flex justify-end items-center mb-4 gap-4">
                    <Button className="guncelle-btn" onClick={() => {
                        setNewData2({...newData2, userId: record.id})
                        showModal2()
                    }} type="primary">
                        Telefon Ekle
                    </Button>
                </div>
            )
        },
    ];
    return (
        <div className="flex flex-col mx-auto  max-w-6xl">
            <div className="mx-auto mb-2">
                <Button className="ekle-btn" onClick={() => showModal()} type="primary"
                        color="--color-secondary">
                    Kullanıcı Ekle
                </Button>
            </div>
            <Table columns={columns} dataSource={data}/>
            <Modal width={'35%'}
                   title={`${newData?.id ? 'Kullanıcı Güncelle' : 'Kullanıcı Ekle'}`}
                   okText={`${newData?.id ? 'Kullanıcı Güncelle' : 'Kullanıcı Ekle'}`}
                   cancelText="İptal"
                   visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel}>
                {newData?.id && (
                    <Card title="Önceki Bilgiler" style={{width: 300}}>
                        <p>Adı Soyadı:{` ${newData.adiSoyadi}`}</p>
                        <p>Adres:{` ${newData.adres}`}</p>
                        <p>Telefon:{` ${newData.telefon}`}</p>
                        <p>Tc Kimlik Numarası:{` ${newData.tcNo}`}</p>
                    </Card>
                )}
                <Form labelCol={{span: 6}}>
                    <Form.Item name="adiSoyadi"
                               rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Input maxLength={50} setForm={setNewData} form={newData} field={'adiSoyadi'}
                               label={'Adı Soyadı'}/>
                    </Form.Item>
                    <Form.Item name="adres"
                               rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Input maxLength={50} style={{minHeight: '60px'}} setForm={setNewData} form={newData}
                               field={'adres'}
                               label={'Adres'}/>
                    </Form.Item>
                    <Form.Item name="telefon"
                               rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Input onlyNumber={true} maxLength={11}
                               setForm={setNewData} form={newData} field={'telefon'}
                               label={'Telefon'}/>
                    </Form.Item>
                    <Form.Item name="tcNo"
                               rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Input onlyNumber={true} maxLength={11} setForm={setNewData} form={newData} field={'tcNo'}
                               label={'TC Kimlik Numarası'}/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal width={'35%'}
                   title={"Kullanıcıya Telefon Kaydet"}
                   okText={`Kaydet`}
                   cancelText="İptal"
                   visible={isModalVisible2} onOk={handleOk2}
                   onCancel={handleCancel2}>
                <Form labelCol={{span: 6}}>
                    <Form.Item name="telefonId" label="Telefon Seç"
                               rules={[{required: true, message: 'Zorunlu Alan!'}]}>
                        <Select
                            defaultValue={newData?.marka ?? null}
                            labelInValue
                            className="outline-none mx-auto  text-left md:ml-2 items-center w-full md:w-4/5 border-2 py-2 px-3 rounded-2xl"
                            onChange={(selected) => {
                                setNewData2({...newData2, telefonId: selected.value})
                            }}>
                            {telefonlar?.map((number) => (
                                <Option key={number.id} value={number.id}>{number.marka + ' - ' + number.model}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ListUser;