import { useState } from 'react';
import classNames from 'classnames';
import TabSwitcher from './tab-switcher';
import FeaturedTab from './featured-tab';

function Tabs({ tabs, className }) {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const handleTabSwitch = idx => setActiveTabIdx(idx);

    return (
        <div className={classNames(className)}>
            <TabSwitcher
                tabs={tabs}
                activeTabIdx={activeTabIdx}
                handleTabSwitch={handleTabSwitch}
            />
            <FeaturedTab tabs={tabs} activeTabIdx={activeTabIdx} />
        </div>
    );
}

export default Tabs;
