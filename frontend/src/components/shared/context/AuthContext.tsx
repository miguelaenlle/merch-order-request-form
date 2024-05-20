import { createContext, useEffect, useState } from "react";

let logoutTimer: any;
interface AuthContextInterface {
    loaded: boolean;
    isLoggedIn: boolean;
    email: string | null;
    userId: string | null;
    token: string | null;
    userType: "buyer" | "seller";
    openAuthModal: "login" | "signup" | null;
    login: (
        email: string,
        userId: string,
        token: string,
        userType: "buyer" | "seller",
        tokenExpirationDate: Date | null
    ) => void;
    logout: () => void;
    handleOpenAuthModal: (modal: "login" | "signup" | null) => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider: React.FC<{
    children: React.ReactNode
}> = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userType, setUserType] = useState<"buyer" | "seller">("buyer");
    const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [openAuthModal, setOpenAuthModal] = useState<"login" | "signup" | null>(null);

    const handleOpenAuthModal = (modal: "login" | "signup" | null) => {
        setOpenAuthModal(modal);
    }

    const login = (
        email: string,
        userId: string,
        token: string,
        userType: "buyer" | "seller",
        tokenExpirationDate: Date | null
    ) => {
        setEmail(email);
        setUserId(userId);
        setToken(token);
        setUserType(userType);
        setTokenExpirationDate(tokenExpirationDate);
        setIsLoggedIn(true);

        console.log('tokenExpirationDate', tokenExpirationDate);


        localStorage.setItem(
            "userData",
            JSON.stringify({
                email: email,
                userId: userId,
                token: token,
                userType: userType,
                expiration: tokenExpirationDate?.toISOString()
            })
        )

        setLoaded(true);
    }

    const logout = () => {
        setEmail(null);
        setUserId(null);
        setToken(null);
        setUserType("buyer");
        setTokenExpirationDate(null);
        setIsLoggedIn(false);
        localStorage.removeItem("userData");
        
    }

    const autoLogin = () => {
        const userData = localStorage.getItem("userData");
        if (!userData) {
            setLoaded(true);
            return;
        }

        const parsedData = JSON.parse(userData);
        const expirationDate = new Date(parsedData.expiration);

        if (expirationDate <= new Date()) {
            logout();
            setLoaded(true);
            return;
        }

        login(
            parsedData.email,
            parsedData.userId,
            parsedData.token,
            parsedData.userType,
            expirationDate
        )
        setLoaded(true);
    }

    useEffect(() => {
        autoLogin();
    }, [])



    // useEffect(() => {
    //     if (token && tokenExpirationDate) {
    //         const remainingTime =
    //             tokenExpirationDate.getTime() - new Date().getTime();
    //         logoutTimer = setTimeout(logout, remainingTime);
    //     } else {
    //         clearTimeout(logoutTimer);
    //     }
    // }, [token, logout, tokenExpirationDate]);

    return (
        <AuthContext.Provider value={{
            loaded: loaded,
            isLoggedIn: isLoggedIn,
            email: email,
            userId: userId,
            token: token,
            userType: userType,
            openAuthModal,
            login: login,
            logout: logout,
            handleOpenAuthModal
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
