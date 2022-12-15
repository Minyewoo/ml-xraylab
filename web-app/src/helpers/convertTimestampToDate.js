import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

function convertTimestampToDate(timestamp, format = 'DD.MM.YYYY') {
    return dayjs(timestamp).format(format);
}

export default convertTimestampToDate;
