import { NextPage } from "next";
import { useState } from 'react';
import { Modal } from "react-bootstrap";
import Register from "../pages/api/register";
import { executeRequest } from "../services/api";

type LoginProps = {
    setToken(s:string):void
}

export const Login: NextPage<LoginProps> = ({setToken}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);


    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password_register, setRegisterPassword] = useState('');
    const [password_register_confirm, setRegisterPasswordConfirm] = useState('');

    const doLogin = async () => {
        try {
            setErrorMsg('');
            if (!login || !password) {
                return setErrorMsg('Favor preencher os campos');
            }

            setLoading(true);

            const body = {
                login,
                password
            }

            const result = await executeRequest('login', 'POST', body);
            if(result && result.data){
                const obj = result.data;
                localStorage.setItem('accessToken', obj.token);
                localStorage.setItem('name', obj.name);
                localStorage.setItem('email', obj.email);
                setToken(obj.token);
            }
        } catch (e: any) {
            console.log('Ocorreu erro ao efetuar login:', e);
            if(e?.response?.data?.error){
                setErrorMsg(e?.response?.data?.error);
            }else {
                setErrorMsg('Ocorreu erro ao efetuar login');
            }
        }

        setLoading(false);
    }

    const newUser = async () => {
       setShowModal(true)
    }

    
    const closeModal = () => {
        setShowModal(false);
        setLoading(false);
        setName('');
        setEmail('');
        setRegisterPassword('');
    }

    const registerUser = async () => {
        if(password_register != password_register_confirm){
            setErrorMsg("As senhas devem ser iguais.")
            return
        }
        try {
            setLoading(true);

            const body = {
                "name": name,
                "password": password_register,
                "email": email
            }
            var response = await executeRequest('register?', 'POST', body);
            setErrorMsg("Usuário criado com sucesso!")
            closeModal();

            setLoading(false);

            console.log("updateUser")
        } catch (e: any) {
            console.log('Ocorreu erro ao atualizar tarefa:', e);
            if (e?.response?.data?.error) {
                setErrorMsg(e?.response?.data?.error);
            } else {
                setErrorMsg('Ocorreu erro ao atualizar tarefa');
            }
            setLoading(false);
        }
    }

    return (
        <>
            <div className="container-login">
                <img src="/logo.svg" alt="Logo Fiap" className="logo" />
                <div className="form">
                    {errorMsg && <p>{errorMsg}</p>}
                    <div>
                        <img src="/mail.svg" alt="Login" />
                        <input type='text' placeholder="Login"
                            value={login} onChange={event => setLogin(event.target.value)}
                        />
                    </div>

                    <div>
                        <img src="/lock.svg" alt="Senha" />
                        <input type='password' placeholder="Senha"
                            value={password} onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                             <button onClick={doLogin} disabled={loading}>{loading ? '...Carregando' : 'Login'}</button>
                    <button onClick={newUser} disabled={loading}>{loading ? '...Carregando' : 'Novo usuário'}</button>
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={closeModal}
                className="container-modal">
                <Modal.Body>
                    <p>Novo usuário</p>
                    {errorMsg && <p className="error">{errorMsg}</p>}
                    <input type="text" placeholder="Nome"
                        value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Email"
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha"
                        value={password_register} onChange={e => setRegisterPassword(e.target.value)} />
                    <input type="password" placeholder="Confirmar senha"
                        value={password_register_confirm} onChange={e => setRegisterPasswordConfirm(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <div className="button col-12">
                        <button onClick={registerUser}>
                            {loading ? '...Carregando' : 'Salvar'}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}