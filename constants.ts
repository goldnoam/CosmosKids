
import { Planet, QuizQuestion } from './types';

export const PLANETS: Planet[] = [
  {
    id: 'mercury',
    name: 'כוכב חמה',
    englishName: 'Mercury',
    description: 'כוכב הלכת הקרוב ביותר לשמש. הוא קטן, סלעי ואין לו אטמוספירה שתגן עליו.',
    funFact: 'יום אחד בכוכב חמה אורך כמו 59 ימים בכדור הארץ!',
    color: 'bg-gray-400',
    distanceFromSun: '58 מיליון ק"מ',
    size: '4,879 ק"מ',
    image: 'https://picsum.photos/seed/mercury/400/400'
  },
  {
    id: 'venus',
    name: 'נוגה',
    englishName: 'Venus',
    description: 'כוכב הלכת החם ביותר במערכת השמש בגלל אפקט החממה הכבד שלו.',
    funFact: 'בנוגה השמש זורחת במערב ושוקעת במזרח!',
    color: 'bg-orange-300',
    distanceFromSun: '108 מיליון ק"מ',
    size: '12,104 ק"מ',
    image: 'https://picsum.photos/seed/venus/400/400'
  },
  {
    id: 'earth',
    name: 'כדור הארץ',
    englishName: 'Earth',
    description: 'הבית שלנו! המקום היחיד ביקום שאנחנו יודעים שיש בו חיים.',
    funFact: 'כדור הארץ הוא כוכב הלכת היחיד שלא קרוי על שם אל רומי או יווני.',
    color: 'bg-blue-500',
    distanceFromSun: '150 מיליון ק"מ',
    size: '12,742 ק"מ',
    image: 'https://picsum.photos/seed/earth/400/400'
  },
  {
    id: 'mars',
    name: 'מאדים',
    englishName: 'Mars',
    description: 'ידוע כ"כוכב הלכת האדום" בגלל הברזל המחומצן (חלודה) שעל פני השטח שלו.',
    funFact: 'במאדים נמצא ההר הגבוה ביותר במערכת השמש - אולימפוס מונס!',
    color: 'bg-red-600',
    distanceFromSun: '228 מיליון ק"מ',
    size: '6,779 ק"מ',
    image: 'https://picsum.photos/seed/mars/400/400'
  },
  {
    id: 'jupiter',
    name: 'צדק',
    englishName: 'Jupiter',
    description: 'ענק הגזים הגדול ביותר. הוא כל כך גדול שכל שאר כוכבי הלכת יכולים להיכנס בתוכו.',
    funFact: 'לצדק יש "כתם אדום גדול" שהוא למעשה סופה ענקית שמשתוללת כבר מאות שנים!',
    color: 'bg-amber-200',
    distanceFromSun: '778 מיליון ק"מ',
    size: '139,820 ק"מ',
    image: 'https://picsum.photos/seed/jupiter/400/400'
  },
  {
    id: 'saturn',
    name: 'שבתאי',
    englishName: 'Saturn',
    description: 'מפורסם בזכות הטבעות המרהיבות שלו העשויות מקרח ומאבק.',
    funFact: 'שבתאי כל כך קל, שאם היה לנו אוקיינוס מספיק גדול, הוא היה צף עליו!',
    color: 'bg-yellow-100',
    distanceFromSun: '1.4 מיליארד ק"מ',
    size: '116,460 ק"מ',
    image: 'https://picsum.photos/seed/saturn/400/400'
  },
  {
    id: 'uranus',
    name: 'אורנוס',
    englishName: 'Uranus',
    description: 'ענק קרח כחלחל שסובב על צדו.',
    funFact: 'אורנוס הוא כוכב הלכת הראשון שהתגלה באמצעות טלסקופ.',
    color: 'bg-cyan-200',
    distanceFromSun: '2.9 מיליארד ק"מ',
    size: '50,724 ק"מ',
    image: 'https://picsum.photos/seed/uranus/400/400'
  },
  {
    id: 'neptune',
    name: 'נפטון',
    englishName: 'Neptune',
    description: 'כוכב הלכת המרוחק ביותר מהשמש. יש בו רוחות חזקות מאוד.',
    funFact: 'שנה אחת בנפטון אורכת 165 שנים בכדור הארץ!',
    color: 'bg-blue-700',
    distanceFromSun: '4.5 מיליארד ק"מ',
    size: '49,244 ק"מ',
    image: 'https://picsum.photos/seed/neptune/400/400'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "מיו כוכב הלכת הגדול ביותר במערכת השמש?",
    options: ["מאדים", "צדק", "שבתאי", "כדור הארץ"],
    correctAnswer: 1
  },
  {
    question: "ממה עשויות הטבעות של שבתאי בעיקר?",
    options: ["יהלומים", "גז", "קרח ואבק", "מתכת"],
    correctAnswer: 2
  },
  {
    question: "איזה כוכב לכת מכונה 'כוכב הלכת האדום'?",
    options: ["מאדים", "נוגה", "נפטון", "חמה"],
    correctAnswer: 0
  }
];
