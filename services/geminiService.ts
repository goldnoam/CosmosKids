
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiChat = () => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `אתה עוזר וירטואלי מומחה לאסטרונומיה בשם "אסטרו-בוט". 
      הקהל שלך הוא ילדים ונוער (גילאי 8-16). 
      דבר בעברית ברורה, ידידותית ומעוררת השראה. 
      השתמש בהרבה אימוג'ים של חלל (🚀, ⭐, 🪐, ☄️). 
      אם שואלים אותך שאלה שלא קשורה לחלל, נסה לקשר אותה בעדינות לחלל או ציין שאתה מתמחה ביקום.
      הסבר מושגים מורכבים בצורה פשוטה ומעניינת.`,
    },
  });
};

export const fetchDailySpaceFact = async (): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "תן עובדה אחת מדהימה וקצרה על החלל או האסטרונומיה בעברית, שתעניין ילדים. התחל ב'הידעת?'",
    });
    return response.text || "החלל הוא מקום מדהים ומלא בסודות!";
  } catch (error) {
    console.error("Error fetching space fact:", error);
    return "הידעת? יש יותר כוכבים ביקום מאשר גרגרי חול בכל החופים בכדור הארץ!";
  }
};
