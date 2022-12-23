import { useContext } from 'react';
import AuthContext from 'contexts/auth-context';

function useAuthorizedRequest({ qeury, payload, settings }) {
    const { token, clearSession } = useContext(AuthContext);

    const result = qeury({ token, ...payload }, settings);

    const { error } = result;
    if (error && error.status === 401) {
        clearSession();
    }

    return result;
}

export default useAuthorizedRequest;
