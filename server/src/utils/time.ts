import dayjs from 'dayjs';

export const timeSinceWeekStart = () => {
    let now = dayjs();
    let monday = now.startOf('week');
    let secondsSinceMonday = now.diff(monday, 'second');
    return secondsSinceMonday;
}
