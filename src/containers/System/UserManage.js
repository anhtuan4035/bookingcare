import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModaleditUser from './ModaleditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}

        }


    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let respone = await getAllUsers('ALL');
        if (respone && respone.errCode === 0) {
            this.setState({
                arrUsers: respone.users
            })

        }

    }


    /** lifecycle
     * Run conponent :
     * 1. Run constructor -> init state
     * 2. Did muont (muon gan gia tri cho state)
     * 3. Render(re-render)
 
     */
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toogleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toogleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let respone = await createNewUserService(data);
            if (respone && respone.errCode !== 0) {
                alert(respone.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
            console.log(`respone create user`, respone);
        } catch (e) {
            console.log(e);
        }
        console.log(`check data`, data);
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {

                await this.getAllUsersFromReact();

            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }


    }


    handleEditUser = (user) => {

        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                })
                await this.getAllUsersFromReact()
            } else {
                alert(res.errCode)
            }

        } catch (e) {
            console.log(e);

        }

    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toogleFromParent={this.toogleUserModal}
                    createNewUser={this.createNewUser}

                />

                {this.state.isOpenModalEditUser &&
                    <ModaleditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toogleFromParent={this.toogleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}

                    />}
                <div className="title text-content">Manage users With React</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>
                        <i className='fas fa-plus'></i> Add new users</button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>

                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>

                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })

                            }

                        </tbody>




                    </table>
                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
