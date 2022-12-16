import { Provider } from 'react-redux';
import store from 'store';

// Testing pages
// import ProfilePage from 'components/pages/profile-page';
import SnapshotDetailsPage from 'components/pages/snapshot-details-page/snapshot-details-page';

function App() {
    return (
        <Provider store={store}>
            <SnapshotDetailsPage id={1} />
        </Provider>
    );
}

export default App;
