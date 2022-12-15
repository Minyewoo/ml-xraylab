import { Provider } from 'react-redux';
import store from 'store';

// Testing page
import ProfilePage from 'components/pages/profile-page';

function App() {
    return (
        <Provider store={store}>
            <ProfilePage />
        </Provider>
    );
}

export default App;
