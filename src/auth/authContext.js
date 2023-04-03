import React, { createContext, useState, useEffect } from "react";
import { reqLogin, reqRegister } from "../services/authService";
import { getUser } from "../services/userService";

export const AuthContext = createContext({});

export const Auth = ({ children })=>{
    const [isAuth, setIsAuth] = useState();
    const [user, setUser] = useState();

    useEffect(()=> {
        init();
    }, [])

    const init = async ()=>{
        if(window.localStorage.getItem('tokens')){
            update();
        }
        else {
            setIsAuth(false);
        }
    }

    const update = async ()=>{
        getUser()
            .then((user)=>{
                setIsAuth(true);
                setUser(user);
            })
            .catch((err)=>{
                setIsAuth(false)
            });
    }

    const login = async (data) => {
        await reqLogin(data);
        setIsAuth(true);
        setUser(await getUser());
    };

    const register = async (data) =>{
        await reqRegister(data);
        await login({ email: data.email, password: data.password });
    };

    const logout =  async () => {
        setIsAuth(false);
        setUser({});
        window.localStorage.setItem("tokens", "");
    };

    if(isAuth && !user) return (<div>Loading</div>);

    return (
        <AuthContext.Provider value={ {isAuth, user, login, logout, register, update} }>
            {children}
        </AuthContext.Provider>
    )
}
