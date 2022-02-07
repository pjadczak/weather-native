export const isObjectEmpty = (obj: object): boolean => {
    return obj
        && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype;
}

export const zFill = (number: number) => {
    return number<10 ? '0'+number : number;
}

export const dateToString = (date: Date, hours: boolean  = true, seconds: boolean = false) => {
    if (!date) return null;
    if (!hours){
        return `${date.getFullYear()}-${zFill(date.getMonth()+1)}-${zFill(date.getDate())}`;
    }
    if (seconds){
        return `${date.getFullYear()}-${zFill(date.getMonth()+1)}-${zFill(date.getDate())} ${zFill(date.getHours())}:${zFill(date.getMinutes())}:${zFill(date.getSeconds())}`;
    }
    return `${date.getFullYear()}-${zFill(date.getMonth()+1)}-${zFill(date.getDate())} ${zFill(date.getHours())}:${zFill(date.getMinutes())}`;
}

export const getDayName = (dayNumberAfterToday: number = -1): string[] => {

    if (dayNumberAfterToday === 0) return ['Dziś'];

    const todayDate = new Date();
    const todayTime = Math.floor(new Date().getTime() / 1000);

    const dayDate = new Date(todayDate.setTime(todayDate.getTime() +  (dayNumberAfterToday * 24 * 60 * 60 * 1000)));
    const day = dayDate.getDay();
    const dayTime = Math.floor(new Date(todayDate.setTime((new Date()).getTime() +  (dayNumberAfterToday * 24 * 60 * 60 * 1000))).getTime() / 1000);
    const nextDay = (dayTime - todayTime)/(24 * 60 * 60);

    if (nextDay === 1) return ['Jutro'];

    const dayNames = ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek", "Piątek","Sobota"];

    return [...[dayNames[day]],...(dayNumberAfterToday>7 ? [' - '+dateToString(dayDate, false)] : [])];

}

export const calcPercentageRange = (input: number, min: number, max: number): number => {
    return ((input - min) * 100) / (max - min);
}
