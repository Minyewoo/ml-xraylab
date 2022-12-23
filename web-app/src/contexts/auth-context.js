/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { profilePath, authPath } from 'components/routes';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const history = useHistory();
    const [token, setToken] = useState(() => {
        const persistedToken = secureLocalStorage.getItem('token');
        if (persistedToken) {
            return JSON.parse(persistedToken);
        }
        return null;
    });

    const startSession = JWTToken => {
        secureLocalStorage.setItem('token', JSON.stringify(JWTToken));
        setToken(JWTToken);
        history.push(profilePath);
    };

    const clearSession = () => {
        secureLocalStorage.removeItem('token');
        setToken(null);
        history.push(authPath);
    };

    const isAuthorized = () => !!token;

    return (
        <AuthContext.Provider
            value={{ token, startSession, clearSession, isAuthorized }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContextProvider };
export default AuthContext;
