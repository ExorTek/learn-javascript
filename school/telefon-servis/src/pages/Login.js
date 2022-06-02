import React, {useState} from 'react';
import {Button, Form, Input, Tabs, message} from "antd";
import {LockOutlined} from "@ant-design/icons";
import axios from "axios";
import {useNavigate} from "react-router";

const LoginForm = ({form, setForm, login}) => (
    <div className="flex flex-col items-center w-full mt-4 login-input max-w-lg mx-auto">
        <Form>
            <Form.Item name="kullaniciAdi" rules={[{required: true, message: 'Lütfen E-Posta Adresinizi Giriniz!'}]}>
                <Input onChange={({target: {value}}) => setForm({...form, kullaniciAdi: value})}
                       placeholder={"E-Posta"}/>
            </Form.Item>
            <Form.Item name="sifre" rules={[{required: true, message: 'Lütfen Şifrenizi Giriniz!'}]}>
                <Input.Password placeholder={"Şifre"}
                                onChange={({target: {value}}) => setForm({...form, sifre: value})}/>
            </Form.Item>
        </Form>
        <Button onClick={login} className="custom-button w-full text-center flex justify-center"
                style={{height: 40}}>Login</Button>
    </div>
)
const {TabPane} = Tabs;

function Login(props) {
    let [form, setForm] = useState({})
    document.title = "Telefon Servis - Giriş";
    const navigate = useNavigate();
    const signIn = () => {
        axios.post('http://localhost:5001/api/main/giris', form).then(({data}) => {
            localStorage.setItem('token', data);
            if (data === true) {
                navigate('/home');
            } else {
                message.error("Kullanıcı Adı veya Şifre Hatalı!")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className={"min-h-max w-full login-tabpane"}>
            <Tabs>
                <TabPane tab={<span><LockOutlined/>Giriş</span>} key="1">
                    <LoginForm form={form} setForm={setForm} login={signIn}/>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Login;