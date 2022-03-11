import { vsprintf } from 'sprintf-js';

const ImgFlagPl = require('../../assets/images/pl.png');
const ImgFlagEn = require('../../assets/images/en.png');

export const getWord = (langCode: string, word: string,data: [] = []): string => {
    if (dictionary[langCode].data[word] == undefined) {
        const arraySplit = word.split('>>');
        return vsprintf( arraySplit[1]||arraySplit[0] , typeof data === 'string' ? [data] : data );
    }
    const arraySplit = dictionary[langCode].data[word].split('>>');
    return vsprintf(arraySplit[1]||arraySplit[0],typeof data === 'string' ? [data] : data); 
};


export const dictionary = {
    pl: {
        name: 'Polski',
        image: ImgFlagPl,
        data: {
            'Teraz': 'Teraz',
            'Dane pogodowe zbierane z:': 'Dane pogodowe zbierane z:',
            'Źródło aplikacji na githubie:': 'Źródło aplikacji na githubie:',
            'Autor:': 'Autor:',
            'Kontakt': 'Kontakt',
            'Aplikacja wykonana za pomocą <bold>React Native</bold> w języku <bold>TypeScript</bold>. Aplikacja oparta o biblioteki:': 'Aplikacja wykonana za pomocą <bold>React Native</bold> w języku <bold>TypeScript</bold>. Aplikacja oparta o biblioteki:',
            'menu>>Pogoda': 'Pogoda',
            'menu>>O aplikacji': 'O aplikacji',
            'menu>>Ustawienia': 'Miejscowość / Położenie',
            'Lokacja': 'Lokacja',
            'Wilgotność': 'Wilgotność',
            'Ciśnienie': 'Ciśnienie',
            'Odczuwalna': 'Odczuwalna',
            'Nie udostępniłeś swojej lokalizacji, możesz to zrobić ręcznie w ustawieniach': 'Nie udostępniłeś swojej lokalizacji, możesz to zrobić ręcznie w ustawieniach',
            'Nie udostępniłeś swojej lokalizacji': 'Nie udostępniłeś swojej lokalizacji',
            'Dziś': 'Dziś',
            'Jutro': 'Jutro',
            'Pojutrze': 'Pojutrze',
            'Poniedziałek': 'Poniedziałek',
            'Wtorek': 'Wtorek',
            'Środa': 'Środa',
            'Czwartek': 'Czwartek',
            'Piątek': 'Piątek',
            'Sobota': 'Sobota',
            'Niedziela': 'Niedziela',
            'Ładuję dane ...': 'Ładuję dane ...',
            'Wprowadź nazwę miejscowości': 'Wprowadź nazwę miejscowości',
            '... lub Pobierz pogodę z danych Twojego położenia': '... lub Pobierz pogodę z danych Twojego położenia',
            'Twoje położenie': 'Twoje położenie',
            'settings_button>>Ustaw': 'settings_button>>Ustaw',
            'settings_button_cancel>>Anuluj': 'settings_button_cancel>>Anuluj',
            'Nie znalazłem miejscowości': 'Nie znalazłem miejscowości',
            'Wiatr': 'Wiatr',
            'km/h': 'km/h',
            'Szukam lokacji': 'Szukam lokacji',
            'Szukam pozycji GPS': 'Szukam pozycji GPS',
            'Wyjdź z aplikacji': 'Wyjdź z aplikacji',
        }
    },
    en: {
        name: 'Angielski',
        image: ImgFlagEn,
        data: {
            'Teraz': 'Now',
            'Dane pogodowe zbierane z:': 'Weather data collected from:',
            'Źródło aplikacji na githubie:': 'Source of the application on github:',
            'Autor:': 'Author:',
            'Kontakt': 'Contact',
            'Aplikacja wykonana za pomocą <bold>React Native</bold> w języku <bold>TypeScript</bold>. Aplikacja oparta o biblioteki:': 'Application made with <bold> React Native </bold> in <bold> TypeScript </bold> language. Application based on libraries:',
            'menu>>Pogoda': 'Weather',
            'menu>>O aplikacji': 'About application',
            'menu>>Ustawienia': 'City / Location',
            'Lokacja': 'Location',
            'Wilgotność': 'Humidity',
            'Ciśnienie': 'Pressure',
            'Odczuwalna': 'Feels like',
            'Nie udostępniłeś swojej lokalizacji, możesz to zrobić ręcznie w ustawieniach': 'You haven\'t shared your location, you can do it manually in the settings',
            'Nie udostępniłeś swojej lokalizacji': 'You haven\'t shared your location',
            'Dziś': 'Today',
            'Jutro': 'Tomorrow',
            'Pojutrze': 'Day after tomorrow',
            'Poniedziałek': 'Monday',
            'Wtorek': 'Tuesday',
            'Środa': 'Wednesday',
            'Czwartek': 'Thursday',
            'Piątek': 'Friday',
            'Sobota': 'Saturday',
            'Niedziela': 'Sunday',
            'Ładuję dane ...': 'loading data ...',
            'Wprowadź nazwę miejscowości': 'Enter the name of the city',
            '... lub Pobierz pogodę z danych Twojego położenia': '... or get weather from your location data',
            'Twoje położenie': 'Your location',
            'settings_button>>Ustaw': 'settings_button>>Set',
            'settings_button_cancel>>Anuluj': 'settings_button_cancel>>Cancel',
            'Nie znalazłem miejscowości': 'I have not found the place',
            'Wiatr': 'Wind',
            'km/h': 'km/h',
            'Szukam lokacji': 'I\'m looking for a location',
            'Szukam pozycji GPS': 'I\'m looking for a GPS position',
            'Wyjdź z aplikacji': 'Exit the application',
        }
    }
}