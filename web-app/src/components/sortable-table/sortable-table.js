import { useState, useEffect } from 'react';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import Table from 'components/UI/table';

function getDefaultComparator(id) {
    return (a, b) => a[id].toString().localeCompare(b[id].toString());
}

function SortableTable({
    className,
    columns,
    data,
    caption,
    onHeaderClick,
    sortId,
    desc = true,
}) {
    const [sortedData, setSortedData] = useState([]);
    useEffect(() => {
        const comparator = (a, b) =>
            getDefaultComparator(sortId)(a, b) * (desc ? -1 : 1);
        const sorted = [...data].sort(comparator);
        setSortedData(sorted);
    }, [data, sortId, desc]);

    const [customColumns, setCustomColumns] = useState([]);
    useEffect(() => {
        const newColumns = columns.map(column => ({
            ...column,
            renderHeader: label => {
                const icon = desc ? <AiFillCaretDown /> : <AiFillCaretUp />;
                return (
                    <>
                        {label}
                        {column.id === sortId ? icon : null}
                    </>
                );
            },
        }));
        setCustomColumns(newColumns);
    }, [columns]);

    return (
        <Table
            className={className}
            columns={customColumns}
            data={sortedData}
            caption={caption}
            onHeaderClick={onHeaderClick}
        />
    );
}

export default SortableTable;
