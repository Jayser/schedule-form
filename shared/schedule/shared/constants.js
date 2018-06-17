export const DAYS_OF_WEEK = [{
    shortName: 'Sun',
    name: 'Sunday',
    number: 0
}, {
    shortName: 'Mon',
    name: 'Monday',
    number: 1
}, {
    shortName: 'Tue',
    name: 'Tuesday',
    number: 2
}, {
    shortName: 'Wed',
    name: 'Wednesday',
    number: 3
}, {
    shortName: 'Thu',
    name: 'Thursday',
    number: 4
}, {
    shortName: 'Fri',
    name: 'Friday',
    number: 5
}, {
    shortName: 'Sat',
    name: 'Saturday',
    number: 6
}];

export const UNSPECIFIC_INDICATORS = [{
    label: 'First',
    value: 'first'
}, {
    label: 'Second',
    value: 'second'
}, {
    label: 'Third',
    value: 'third'
}, {
    label: 'Fourth',
    value: 'fourth'
}, {
    label: 'Fifth',
    value: 'fifth'
}, {
    label: 'Last',
    value: 'last'
}];

export const unspecificDatesOptions = DAYS_OF_WEEK.map(date => ({
    label: date.name,
    value: date.number
}));
