import { Provider } from 'react-redux';
import store from 'store';

// Testing pages
// import ProfilePage from 'components/pages/profile-page';
// import SnapshotDetailsPage from 'components/pages/snapshot-details-page/snapshot-details-page';
import AuthPage from 'components/pages/auth-page';

function App() {
    return (
        <Provider store={store}>
            <AuthPage />
        </Provider>
    );
}

export default App;
