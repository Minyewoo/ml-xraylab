import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

function formatDate(date, format = 'DD.MM.YYYY') {
    return dayjs(date).format(format);
}

export default formatDate;
