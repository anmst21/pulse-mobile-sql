export const humanReadableDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return "today";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "yesterday";
    } else {
        // Here, you can format the date as desired for dates other than today and yesterday
        // For simplicity, this example returns the date in the format 'DD/MM/YYYY'
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
};
