import { Switch, Route, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from 'contexts/auth-context';

import ProfilePage from 'components/pages/profile-page';
import AuthPage from 'components/pages/auth-page';
import SnapshotDetailsPage from 'components/pages/snapshot-details-page';
import SnapshotUploadPage from 'components/pages/snapshot-upload-page';

export const snapshotsPath = '/snapshots/:id';
export const snapshotsUploadPath = '/upload';
export const buildSnapshotsPath = id => `/snapshots/${id}`;
export const profilePath = '/profile';
export const authPath = '/auth';

function AutoRedirectedRoute({ path, condition, children }) {
    const history = useHistory();
    if (condition) history.push(path);
    return children;
}

function AuthorizedOnlyRoute({ path, component: Component }) {
    const { isAuthorized } = useContext(AuthContext);

    return (
        <Route path={path}>
            <AutoRedirectedRoute path={authPath} condition={!isAuthorized()}>
                <Component />
            </AutoRedirectedRoute>
        </Route>
    );
}

function NotAuthorizedOnlyRoute({ path, component: Component }) {
    const { isAuthorized } = useContext(AuthContext);

    return (
        <Route path={path}>
            <AutoRedirectedRoute path={profilePath} condition={isAuthorized()}>
                <Component />
            </AutoRedirectedRoute>
        </Route>
    );
}

function Routes() {
    return (
        <Switch>
            <NotAuthorizedOnlyRoute path={authPath} component={AuthPage} />
            <AuthorizedOnlyRoute path={profilePath} component={ProfilePage} />
            <AuthorizedOnlyRoute
                path={snapshotsPath}
                component={SnapshotDetailsPage}
            />
            <AuthorizedOnlyRoute
                path={snapshotsUploadPath}
                component={SnapshotUploadPage}
            />
        </Switch>
    );
}

export { Routes };
