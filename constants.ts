
import { Planet, QuizQuestion } from './types';

export const MOON_DATA: Planet = {
  id: 'moon',
  name: 'הירח',
  englishName: 'The Moon',
  description: 'הלוויין הטבעי היחיד של כדור הארץ. הוא משפיע על הגאות והשפל באוקיינוסים שלנו ומאיר את שמי הלילה. הירח הוא המקום היחיד מחוץ לכדור הארץ שבו בני אדם דרכו עליו.',
  funFact: 'הירח תמיד מפנה אלינו את אותו הצד! אנחנו לעולם לא רואים את "הצד הרחוק" שלו מכדור הארץ ללא חללית.',
  color: 'bg-slate-300',
  distanceFromSun: '384,400 ק"מ (מהארץ)',
  size: '3,474 ק"מ',
  image: 'https://images.unsplash.com/photo-1522030239044-12f3837721dc?q=80&w=600&auto=format&fit=crop',
  moonsCount: '0 (הוא הירח שלנו!)',
  hasRings: false,
  missions: ['אפולו 11', 'צ\'אנג-אה 4', 'ארטמיס (בקרוב)']
};

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
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=600&auto=format&fit=crop',
    moonsCount: '0',
    hasRings: false,
    missions: ['מרינר 10', 'מסנג\'ר', 'בפי-קולומבו']
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
    image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=600&auto=format&fit=crop',
    moonsCount: '0',
    hasRings: false,
    missions: ['ונרה 7', 'מגלן', 'אקאטסוקי']
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
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=600&auto=format&fit=crop',
    moonsCount: '1 (הירח)',
    hasRings: false,
    missions: ['לווייני GPS', 'תחנת החלל הבינלאומית', 'וויאג\'ר 1 (מבט לאחור)']
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
    image: 'https://images.unsplash.com/photo-1614724723154-43d359d0ca09?q=80&w=600&auto=format&fit=crop',
    moonsCount: '2 (פובוס ודיימוס)',
    hasRings: false,
    missions: ['קיוריוסיטי', 'פרסווירנס', 'מרינר 4']
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
    image: 'https://images.unsplash.com/photo-1630839437035-dac17da580d0?q=80&w=600&auto=format&fit=crop',
    moonsCount: '95 (ביניהם אירופה וגנימד)',
    hasRings: true,
    missions: ['גלילאו', 'ג\'ונו', 'וויאג\'ר 2']
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
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=600&auto=format&fit=crop',
    moonsCount: '146 (ביניהם טיטאן)',
    hasRings: true,
    missions: ['קאסיני-הויגנס', 'פיוניר 11', 'וויאג\'ר 1']
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
    image: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?q=80&w=600&auto=format&fit=crop',
    moonsCount: '27 (קרויים על שם דמויות של שייקספיר)',
    hasRings: true,
    missions: ['וויאג\'ר 2 (היחידה שביקרה)']
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
    image: 'https://images.unsplash.com/photo-1614314107768-6018061b5b72?q=80&w=600&auto=format&fit=crop',
    moonsCount: '14 (הגדול ביותר הוא טריטון)',
    hasRings: true,
    missions: ['וויאג\'ר 2']
  }
];

export const DWARF_PLANETS: Planet[] = [
  {
    id: 'pluto',
    name: 'פלוטו',
    englishName: 'Pluto',
    description: 'פעם נחשב לכוכב הלכת התשיעי, כיום הוא מוגדר ככוכב לכת ננסי בחגורת קויפר הקפואה.',
    funFact: 'פלוטו קטן יותר מהירח של כדור הארץ!',
    color: 'bg-stone-400',
    distanceFromSun: '5.9 מיליארד ק"מ',
    size: '2,376 ק"מ',
    image: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?q=80&w=600&auto=format&fit=crop',
    moonsCount: '5 (הגדול ביותר הוא כארון)',
    hasRings: false,
    missions: ['ניו הורייזונס']
  },
  {
    id: 'ceres',
    name: 'צרס',
    englishName: 'Ceres',
    description: 'כוכב הלכת הננסי הקרוב ביותר לשמש, נמצא בחגורת האסטרואידים בין מאדים לצדק.',
    funFact: 'צרס מהווה כרבע מהמסה הכוללת של כל חגורת האסטרואידים!',
    color: 'bg-slate-500',
    distanceFromSun: '414 מיליון ק"מ',
    size: '940 ק"מ',
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=600&auto=format&fit=crop',
    moonsCount: '0',
    hasRings: false,
    missions: ['דון (Dawn)']
  }
];

export const FAMOUS_MOONS: Planet[] = [
  {
    id: 'titan',
    name: 'טיטאן',
    englishName: 'Titan',
    description: 'הירח הגדול ביותר של שבתאי והמקום היחיד מלבד כדור הארץ שיש בו אגמים ונהרות על פני השטח.',
    funFact: 'האטמוספירה של טיטאן כל כך סמיכה, שאם הייתם מחברים לעצמכם כנפיים הייתם יכולים לעוף!',
    color: 'bg-yellow-600',
    distanceFromSun: '1.4 מיליארד ק"מ',
    size: '5,150 ק"מ',
    image: 'https://images.unsplash.com/photo-1614314107768-6018061b5b72?q=80&w=600&auto=format&fit=crop',
    missions: ['קאסיני-הויגנס']
  },
  {
    id: 'europa',
    name: 'אירופה',
    englishName: 'Europa',
    description: 'ירח של צדק המכוסה בשכבת קרח עבה, שמתחתיה מסתתר אוקיינוס מים נוזליים.',
    funFact: 'מדענים חושבים שבאירופה יש פי 2 יותר מים מאשר בכל כדור הארץ!',
    color: 'bg-blue-200',
    distanceFromSun: '778 מיליון ק"מ',
    size: '3,121 ק"מ',
    image: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?q=80&w=600&auto=format&fit=crop',
    missions: ['גלילאו', 'JUICE (בדרך)']
  }
];

export const ALL_DESTINATIONS: Planet[] = [...PLANETS, ...DWARF_PLANETS, ...FAMOUS_MOONS];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "מיהו כוכב הלכת הגדול ביותר במערכת השמש?",
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