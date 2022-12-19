import { Switch, Route } from 'react-router-dom';

import ProfilePage from 'components/pages/profile-page';
import AuthPage from 'components/pages/auth-page';
import SnapshotDetailsPage from 'components/pages/snapshot-details-page';

export const snapshotsPath = '/snapshots/:id';
export const buildSnapshotsPath = id => `/snapshots/${id}`;
export const profilePath = '/profile';
export const authPath = '/auth';

function RoutesSwitcher() {
    return (
        <Switch>
            <Route path={snapshotsPath} component={SnapshotDetailsPage} />
            <Route path={profilePath} component={ProfilePage} />
            <Route path={authPath} component={AuthPage} />
        </Switch>
    );
}

export { RoutesSwitcher };
