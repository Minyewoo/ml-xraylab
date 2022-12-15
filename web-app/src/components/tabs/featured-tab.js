import classNames from 'classnames';

function FeaturedTab({ tabs, activeTabIdx, className }) {
    const { content } = tabs.find((_, idx) => activeTabIdx === idx);

    return <div className={classNames(className)}>{content}</div>;
}

export default FeaturedTab;
