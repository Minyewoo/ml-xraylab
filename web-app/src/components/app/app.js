import { Provider } from 'react-redux';
import store from 'store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'components/routes';
import { AuthContextProvider } from 'contexts/auth-context';

function App() {
    return (
        <Router>
            <Provider store={store}>
                <AuthContextProvider>
                    <Routes />
                </AuthContextProvider>
            </Provider>
        </Router>
    );
}

export default App;
