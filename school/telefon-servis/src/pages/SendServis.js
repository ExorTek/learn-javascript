import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Alert, Button, Modal, Spin, Table, message} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {Login} from "./index";
import {useNavigate} from "react-router";

function SendServis(props) {
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
    const [data2, setData2] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data3, setData3] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data4, setData4] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!data) {
            axios.get('http://localhost:5001/api/main/kullanici-telefonlari')
                .then(async res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [data]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        data?.map((d, di) => {
            axios.get(`http://localhost:5001/api/main/kullanici/${d.userId}`)
                .then(res => {
                    data2.push({user: res.data});
                })
            axios.get(`http://localhost:5001/api/main/telefon/${d.telefonId}`)
                .then(res => {
                    data3.push({tel: res.data});
                })
        })

    }, [data]);

    const showModal = () => {
        setIsModalVisible(true);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sendData, setSendData] = useState({})
    const today = new Date();
    const phone = new Date(sendData?.faturaTarihi?.replace('/', ' '))
    const isServisYear = (today.getFullYear() - phone.getFullYear());
    const isServisMonth = (today.getMonth() - phone.getMonth());
    const isServisDay = (today.getDate() - phone.getDate());
    const isServis = (isServisYear * 365) + (isServisMonth * 30) + isServisDay;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [sendingData, setSendingData] = useState({});
    const columns = [
        {
            title: 'ID',
            dataIndex: 'kullaniciId',
            key: 'kullaniciId',
        },
        {
            title: 'Adı Soyadı',
            dataIndex: 'adiSoyadi',
            key: 'adiSoyadi',
        },
        {
            title: 'Telefon',
            dataIndex: 'telefon',
            key: 'telefon',
        }, {
            title: 'Servise Gönder',
            dataIndex: 'sendService',
            key: 'sendService',
            render: (text, record) => (
                <div className="w-full sm:flex-row flex-col flex justify-end items-center mb-4 gap-4">
                    <Button className="servis-btn" onClick={() => {
                        setSendData({
                            ...sendData,
                            userId: record.kullaniciId,
                            telefonId: record.telId,
                            faturaTarihi: record.faturaTarihi
                        })
                        setTimeout(() => {
                            showModal()

                        }, 500)
                    }} type="primary">
                        Servise Gönder
                    </Button>
                </div>
            )
        }
    ];
    const handleOk = () => {

        setSendingData({
            ...sendingData, userId: sendData?.userId,
            telefonId: sendData?.telefonId,
            serviseAlindiMi: 'isNotServis',
            aciklama: isServis && isServis - 730 > 0 ? `Garanti süresi ${isServis - 730} gün geçmiş. Kullanıcı onaylarsa ${isServis - 730 * 0.009} TL ödeyecektir.` : 'Garanti süresi bitmemiş ve servise alinacak.',

        })
        setTimeout(() => {
            if (sendingData !== {}) {
                axios.post('http://localhost:5001/api/main/servise-gonder', sendingData)
                    .then(res => {
                        console.log(res.data);
                        if (!res.data) {
                            message.error('Zaten servise alındı.')
                            setSendData({})
                            setIsModalVisible(false)
                        } else {
                            message.success('Servise alındı.')
                            setSendData({})
                            setIsModalVisible(false)
                        }
                    })
                    .catch(err => {
                        message.error('Servis alınamadı.')
                        setIsModalVisible(false)
                    })
            }
        }, 2500)
        // if (isServis && isServis - 730 > 0) {
        //     setSendingData({
        //         ...sendingData, userId: sendData?.userId,
        //         telefonId: sendData?.telefonId,
        //         serviseAlindiMi: 'isNotServis',
        //         aciklama: `Garanti süresi ${isServis - 730} gün geçmiş. Kullanıcı onaylarsa ${isServis - 730 * 0.009} TL ödeyecektir.`
        //
        //     })
        //     console.log(sendingData)
        //
        //
        // } else {
        //     setSendingData({
        //         ...sendingData, userId: sendData?.userId,
        //         telefonId: sendData?.telefonId,
        //         serviseAlindiMi: 'isServis',
        //         aciklama: 'Garanti süresi bitmemiş ve servise alındı.'
        //     })
        //     console.log(sendingData)
        //     // setTimeout(() => {
        //     //     axios.post('http://localhost:5001/api/main/servise-gonder', sendingData)
        //     //         .then(res => {
        //     //             if (!res.data) {
        //     //                 message.error('Zaten servise alındı.')
        //     //                 setSendData({})
        //     //                 setIsModalVisible(false)
        //     //             } else {
        //     //                 message.success('Servise alındı.')
        //     //                 setSendData({})
        //     //                 setIsModalVisible(false)
        //     //             }
        //     //         })
        //     //         .catch(err => {
        //     //             message.error('Servis alınamadı.')
        //     //             setIsModalVisible(false)
        //     //         })
        //     // }, 2500)
        // }
    }
    const handleCancel = () => {
        setIsModalVisible(false);
        setSendData({})
        setSendingData({})
        document.querySelectorAll("input").forEach(input => input.value = "");
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [getData, setGetData] = useState(false)
    if (!data4.length > 0) {
        for (let i = 0; i < data2.length; i++) {
            data4.push({
                kullaniciId: data2[i].user.id,
                adiSoyadi: data2[i].user.adiSoyadi,
                telId: data3[i].tel.id,
                telefon: data3[i].tel.model + " - " + data3[i].tel.marka,
                faturaTarihi: data[i].faturaTarihi,
            })
        }
    }
    if (!getData) {
        setTimeout(() => {
            setGetData(true)
        }, 3000)
        return (
            <div className="mx-auto flex justify-center">
                <Spin indicator={<LoadingOutlined style={{fontSize: 68}} spin/>}/>
            </div>
        )
    } else
        return (
            <div className="flex flex-col mx-auto  max-w-3xl">
                <Table columns={columns} dataSource={data4}/>
                <Modal width={'35%'}
                       title={`Servise Gönder`}
                       okText={`Servise Gönder`}
                       cancelText="İptal"
                       visible={isModalVisible} onOk={handleOk}
                       onCancel={handleCancel}>
                    <Alert
                        message={isServis - 730 > 0 ? 'Garanti süresi geçmiş.' : 'Garanti devam ediyor'}
                        description={isServis - 730 > 0 ? `Garanti süresi ${isServis - 730} gün geçmiş. Onaylarsanız  ${isServis - 730 * 0.009}₺ işlem ücreti çıkacak.` : `Telefon garanti süresi ${730 - isServis} gün kaldı.`}
                        type={isServis - 730 > 0 ? 'warning' : 'success'}
                        showIcon
                    />
                </Modal>
            </div>);
}

export default SendServis;