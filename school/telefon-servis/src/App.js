import React, {useState} from 'react';
import './App.css'
import {Space, Table, Tag} from "antd";
import {Layout, Menu, message} from 'antd';
import {Link, Route, Routes} from "react-router-dom";
import {
    UnorderedListOutlined,
    PhoneOutlined,
    UserOutlined,
    UserSwitchOutlined,
    CheckOutlined,
    CloseOutlined,
    SendOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {IsNotServis, IsServis, ListPhone, ListUser, ListWorker, Home, SendServis, Login} from "./pages";
import {useNavigate, useLocation} from "react-router";

const {Content, Footer, Sider} = Layout;

function App({props}) {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    if (token !== "true" || token === '' || !token) {
        if (location.pathname === '/') {
            return navigate('/giris');
        }
    }
    const menus = [
        {name: 'Servise Gönder', url: '/servise-gonder', Icon: SendOutlined, type: ''},
        {name: 'Telefonlar', url: '/telefonlar', Icon: UnorderedListOutlined, type: ''},
        {name: 'Kullanıcılar', url: '/kullanicilar', Icon: UserOutlined, type: ''},
        {name: 'Calışanlar', url: '/calisanlar', Icon: UserSwitchOutlined, type: ''},
        {name: 'Servisteki Telefonlar', url: '/servisteki-telefonlar', Icon: CheckOutlined, type: ''},
        {name: 'Serviste Olmayan Telefonlar', url: '/serviste-olmayan-telefonlar', Icon: CloseOutlined, type: ''},
    ]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeKey, setActiveKey] = useState("1");
    if (!token || token === 'false' || token === null) return <Routes><Route path="/" element={<Login/>}/></Routes>
    return (
        <>
            <Layout theme={"dark"} style={{minHeight: '100vh'}}>
                <Sider theme={"dark"} collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <Link to="/">
                        <div className="logo flex justify-center mb-2 mt-2">
                            <PhoneOutlined style={{fontSize: collapsed ? '40px' : '80px', color: 'white'}}/>
                        </div>
                    </Link>
                    <Menu theme={"dark"} activeKey={activeKey} mode="inline">
                        {menus.map(({Icon, name, url}, i) => (
                            <Menu.Item key={String(i)}
                                       icon={<Icon/>}><Link to={url}>{name}</Link></Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{margin: '0 16px'}}>
                        <div className="main-layout site-layout-background">
                            <div
                                className="bg-white container shadow-2xl rounded-2xl mt-20">
                                <div className="pt-10 pb-10">
                                    <Routes>
                                        <Route path="/home" element={<Home/>}/>
                                        <Route path="/servise-gonder" element={<SendServis/>}/>
                                        <Route path="/telefonlar" element={<ListPhone/>}/>
                                        <Route path="/kullanicilar" element={<ListUser/>}/>
                                        <Route path="/calisanlar" element={<ListWorker/>}/>
                                        <Route path="/servisteki-telefonlar" element={<IsServis/>}/>
                                        <Route path="/serviste-olmayan-telefonlar" element={<IsNotServis/>}/>
                                        <Route path="*" element={<Home/>}/>
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Mehmet Demirel ©2022</Footer>
                </Layout>
            </Layout>
        </>
    )

}

export default App;
