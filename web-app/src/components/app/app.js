import { Provider } from 'react-redux';
import store from 'store';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoutesSwitcher } from 'components/routes';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <RoutesSwitcher />
            </Router>
        </Provider>
    );
}

export default App;
