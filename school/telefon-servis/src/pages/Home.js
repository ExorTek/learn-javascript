import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Bar, Pie} from "@ant-design/charts";
import {Login} from "./index";
import {useNavigate} from "react-router";

function Home(props) {
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
            axios.get('http://localhost:5001/api/main/toplam-veri').then(res => {
                setData(res.data);
            })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [data]);
    const newData = [
        {value: data ? data[0] : 1, name: "Kullanıcı Sayısı"},
        {value: data ? data[1] : 2, name: "Telefon Syısı"},
        {value: data ? data[2] : 3, name: "Calışan Sayısı"}
    ];
    const newData2 = [
        {value: data ? data[3] : 3, name: "Servise Alınan Telefon Sayısı"},
        {value: data ? data[4] : 4, name: "Servis Dışı Telefon Sayısı"},
    ];
    const config = {
        data: newData,
        xField: 'value',
        yField: 'name',
        seriesField: 'name',
        legend: {
            position: 'top-left',
        },

    };
    const config2 = {
        appendPadding: 10,
        data: newData2,
        angleField: 'value',
        colorField: 'name',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };
    return (
        <div className="flex flex-row justify-center gap-14 mt-10">
            <Bar className="mb-8 h-full" style={{height: 'auto !important'}} {...config}/>
            <Pie {...config2}/>
        </div>
    );
}

export default Home;