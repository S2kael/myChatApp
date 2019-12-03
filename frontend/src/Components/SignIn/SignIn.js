import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, {useState,useContext} from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import AppContext from '../../Context/Context'

const NormalLoginForm = (props) => {
    const context = useContext(AppContext);
    const [message, setMessage] = useState('')

    const submitLogin = (value) => {
        context.changeUser({
            username: value.username,
            fullname: value.fullname,
            avatar: value.avatar,
            email: value.email,
            userid: value.userid
        })
    }

    if(context.user.email != null){
        props.history.push('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
        if (!err) {
            axios.post(`${context.host}/api/signin/`, values)
            .then(res => {
                if (res.data.success) {
                    submitLogin(res.data)
                    props.history.push('/')
                } else {
                    setMessage(res.data.message)
                }
            })
        }
        });
    };
    const { getFieldDecorator } = props.form;
    return (
        <div className="container-login">
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="/register">register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
}

const Signin = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default withRouter(Signin) 