import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handelLoginApi } from '../../services/userService';





class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handlOnchangeUserName = (event) => {
        this.setState({
            username: event.target.value
        })

    }

    handlOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handelLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handelLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
           this.props.userLoginSuccess(data.user)

                console.log(`login success `);

            }

        } catch (error) {

            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })

                }

            }
            console.log(error.response);
            // this.setState({
            //     errMessage:e.messagae  
            // })

        }
    }

    handelShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })

    }


    render() {

        return (
            <div className='login-backgroud'>
                <div className='login-container'>
                    <div className='login-content row' >
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>User name</label>
                            <input
                                type='text'
                                className='form-control
                              ' placeholder='Enter your username'
                                value={this.state.username} onChange={(event) => this.handlOnchangeUserName(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-eye'>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handlOnchangePassword(event)}
                                />
                                <span onClick={() => this.handelShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye icon-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}

                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handelLogin()}>Log in</button
                            ></div>
                        <div className='col-12'>
                            <span className='forgot-password'>forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'> Or singin with:</span>
                        </div>

                        <div className='col-12 social-login'>
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-google-plus-g google"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // uesrLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
