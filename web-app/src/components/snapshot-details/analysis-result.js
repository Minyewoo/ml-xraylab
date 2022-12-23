/* eslint-disable import/no-unresolved */
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeAnalysisSortField,
    tolggleAnalysisSortOrder,
} from 'store/reducers/snapshot-analysis.slice';
import SortableTable from 'components/sortable-table';
import ConditionalWrapper from 'components/conditional-wrapper';
import { HighlightText } from 'components/UI/highlight';
import styles from './analysis-result.module.scss';

function AnalysisResults({ className, results }) {
    const { sortField, desc } = useSelector(state => state.snapshotAnalysis);
    const dispatch = useDispatch();

    const columns = [
        { id: 'disease', label: 'Disease' },
        {
            id: 'probability',
            label: 'Probability',
            renderData: probability => (
                <ConditionalWrapper
                    condition={probability > 0.7}
                    renderWrapper={children => (
                        <HighlightText variant="colored">
                            {children}
                        </HighlightText>
                    )}
                >
                    {probability.toFixed(5)}
                </ConditionalWrapper>
            ),
        },
    ];

    const handleChangeSortField = event => {
        const newSortField = event.target.dataset.key;
        if (sortField !== newSortField) {
            dispatch(changeAnalysisSortField(newSortField));
        } else {
            dispatch(tolggleAnalysisSortOrder());
        }
    };

    return (
        <SortableTable
            className={classNames(className, styles.table)}
            columns={columns}
            data={results}
            onHeaderClick={handleChangeSortField}
            sortId={sortField}
            desc={desc}
        />
    );
}

export default AnalysisResults;
