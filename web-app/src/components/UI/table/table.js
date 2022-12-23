function TableHead({ className, columns }) {
    return (
        <thead className={className}>
            <tr>
                {columns.map(({ id, label, renderHeader }) => (
                    <th key={id}>
                        <span data-key={id}>
                            {renderHeader === undefined
                                ? label
                                : renderHeader(label)}
                        </span>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

function TableBody({ className, columns, data }) {
    return (
        <tbody className={className}>
            {data.map((item, idx) => (
                <tr key={item.id ?? idx}>
                    {columns.map(({ id, renderData }) => (
                        <td key={id}>
                            <span data-key={id}>
                                {renderData === undefined
                                    ? item[id]
                                    : renderData(item[id])}
                            </span>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

function Table({ className, columns, data, caption, onHeaderClick }) {
    const handleTableClick = event => {
        const { tagName, parentElement } = event.target;
        if (
            onHeaderClick &&
            tagName.toLowerCase() === 'span' &&
            parentElement.tagName.toLowerCase() === 'th'
        ) {
            onHeaderClick(event);
        }
    };

    return (
        <table className={className} onClickCapture={handleTableClick}>
            {caption && <caption>{caption}</caption>}
            <TableHead columns={columns} />
            <TableBody columns={columns} data={data} />
        </table>
    );
}

export default Table;
