export interface CuratedGreeting {
  id: string;
  language: string;
  tone: string;
  relationship: string;
  text: string;
  blessing?: string;
}

export const CURATED_GREETINGS: CuratedGreeting[] = [
  // 1. Family - Warm & Heartfelt (English)
  {
    id: "fam-warm-en",
    language: "English",
    tone: "Warm & Heartfelt",
    relationship: "Family",
    text: "To my dearest family: every diya we light tonight shines brighter because of the love, laughter, and warmth we share. May this Diwali fill our home with endless blessings, golden health, and sweet moments.",
    blessing: "Shubh Deepavali to the heartbeat of my life!",
  },
  // 2. Family - Traditional (Hindi)
  {
    id: "fam-trad-hi",
    language: "Hindi",
    tone: "Traditional & Blessings",
    relationship: "Family",
    text: "दीयों की पावन रोशनी आपके जीवन के हर कोने को सुख, समृद्धि और शांति से आलोकित करे। माँ लक्ष्मी और भगवान गणेश की असीम कृपा पूरे परिवार पर सदा बनी रहे।",
    blessing: "आप सभी को सपरिवार शुभ दीपावली की हार्दिक शुभकामनाएँ!",
  },
  // 3. Family - Poetic (Bengali)
  {
    id: "fam-poetic-bn",
    language: "Bengali",
    tone: "Poetic & Soulful",
    relationship: "Family",
    text: "প্রদীপের স্নিগ্ধ আলোয় মুছে যাক সকল আঁধার, ভালোবাসা আর স্নেহে ভরে উঠুক আমাদের সংসার। আনন্দময় দীপাবলির আন্তরিক শুভেচ্ছা ও বুকভরা ভালোবাসা।",
    blessing: "শুভ দীপাবলি!",
  },
  // 4. Best Friend - Playful & Funny (Hinglish)
  {
    id: "friend-play-hing",
    language: "Hinglish",
    tone: "Playful & Funny",
    relationship: "Best Friend",
    text: "May your Diwali be as bright as your phone screen at 2 AM, and may you receive authentic Kaju Katli instead of that mystery Soan Papdi box circulating since 2018! Wishing you infinite joy and zero calories!",
    blessing: "Happy Diwali, yaar!",
  },
  // 5. Best Friend - Warm & Heartfelt (English)
  {
    id: "friend-warm-en",
    language: "English",
    tone: "Warm & Heartfelt",
    relationship: "Best Friend",
    text: "Through all the madness, adventures, and late-night talks, your friendship has been the sweetest spark in my life. May your Diwali shine as dazzlingly bright as your incredible spirit!",
    blessing: "Wishing you magic, light, and boundless success!",
  },
  // 6. Colleague - Professional & Corporate (English)
  {
    id: "colleague-prof-en",
    language: "English",
    tone: "Professional & Corporate",
    relationship: "Colleague",
    text: "Wishing you and your family a luminous and joyous Diwali. Thank you for your continued dedication, collaboration, and camaraderie throughout this year. May this festive season bring you renewed energy and prosperity.",
    blessing: "Happy Diwali and best wishes for future milestones!",
  },
  // 7. Client/Customer - Royal & Formal (English)
  {
    id: "client-royal-en",
    language: "English",
    tone: "Royal & Formal",
    relationship: "Client/Customer",
    text: "On the auspicious occasion of Deepavali, we extend our most cordial wishes for your sustained prosperity, health, and triumph. We deeply treasure our partnership and look forward to illuminating new horizons together.",
    blessing: "Wishing you an opulent and radiant Diwali!",
  },
  // 8. Mentor/Teacher - Traditional & Blessings (English)
  {
    id: "mentor-trad-en",
    language: "English",
    tone: "Traditional & Blessings",
    relationship: "Mentor / Teacher",
    text: "Just as a sacred diya banishes darkness, your guidance and wisdom have illuminated my path. On this festival of lights, I bow in deep gratitude and wish you radiant peace, good health, and eternal joy.",
    blessing: "Salutations and Happy Deepavali, Guruji!",
  },
  // 9. Mentor/Teacher - Traditional (Hindi)
  {
    id: "mentor-trad-hi",
    language: "Hindi",
    tone: "Traditional & Blessings",
    relationship: "Mentor / Teacher",
    text: "जैसे एक दीप अंधकार को मिटाकर प्रकाश फैलाता है, वैसे ही आपके अमूल्य ज्ञान ने मेरे जीवन को दिशा दी है। इस पावन दीपावली पर आपके उत्तम स्वास्थ्य और दीर्घायु की मंगल कामना करता हूँ।",
    blessing: "गुरुदेव के चरणों में सादर प्रणाम एवं शुभ दीपावली!",
  },
  // 10. General - Poetic & Soulful (English)
  {
    id: "gen-poetic-en",
    language: "English",
    tone: "Poetic & Soulful",
    relationship: "Family",
    text: "Light a lamp of compassion, ignite a spark of forgiveness, and let the fragrance of kindness perfume the night air. May your inner spirit glow with the unshakeable stillness of an eternal diya.",
    blessing: "Tamaso Ma Jyotirgamaya — From darkness unto light.",
  },
  // 11. General - Gujarati (Traditional)
  {
    id: "gen-trad-gu",
    language: "Gujarati",
    tone: "Traditional & Blessings",
    relationship: "Family",
    text: "આ દિવાળી આપના જીવનમાં સુખ, શાંતિ, સમૃદ્ધિ અને ઉત્તમ સ્વાસ્થ્ય લાવે એવી હૃદયપૂર્વકની પ્રાર્થના. માઁ લક્ષ્મીજીની કૃપા આપના પર સદાય વરસતી રહે.",
    blessing: "દિવાળી અને નૂતન વર્ષાભિનંદન!",
  },
  // 12. General - Tamil (Warm)
  {
    id: "gen-warm-ta",
    language: "Tamil",
    tone: "Warm & Heartfelt",
    relationship: "Family",
    text: "தீப ஒளித் திருநாளாம் தீபாவளிப் பண்டிகை உங்கள் வாழ்விலும் இல்லத்திலும் மகிழ்ச்சியையும் செழிப்பையும் நிறைக்கட்டும். உங்கள் அனைவருக்கும் இனிய தீபாவளி நல்வாழ்த்துகள்!",
    blessing: "இனிய தீபாவளி நல்வாழ்த்துகள்!",
  },
  // 13. Distant Relative - Royal & Formal (Hindi)
  {
    id: "relative-royal-hi",
    language: "Hindi",
    tone: "Royal & Formal",
    relationship: "Distant Relative",
    text: "प्रकाश के इस पावन महापर्व पर आपको और आपके समस्त परिवार को हार्दिक बधाई। ईश्वर से प्रार्थना है कि आपके घर-आँगन में सदैव वैभव, समृद्धि और सौहार्द का वास हो।",
    blessing: "सस्नेह शुभ दीपावली!",
  },
  // 14. Best Friend - Poetic & Soulful (Hinglish)
  {
    id: "friend-poetic-hing",
    language: "Hinglish",
    tone: "Poetic & Soulful",
    relationship: "Best Friend",
    text: "Diwali ki har ek roshni reminds me of the endless laughter and memories we have created. May this festive glow guide you towards your biggest dreams this year!",
    blessing: "Stay shining, rockstar! Shubh Deepavali!",
  },
  // 15. Colleague - Warm & Heartfelt (English)
  {
    id: "colleague-warm-en",
    language: "English",
    tone: "Warm & Heartfelt",
    relationship: "Colleague",
    text: "It's such a joy working with you day in and day out! May this Diwali recharge your spirits, bring peace to your home, and kickstart a fantastic season of breakthrough successes.",
    blessing: "Warmest festive wishes!",
  },
  // 16. Client/Customer - Traditional & Blessings (Hindi)
  {
    id: "client-trad-hi",
    language: "Hindi",
    tone: "Traditional & Blessings",
    relationship: "Client/Customer",
    text: "दीपावली के इस शुभ अवसर पर हम आपके सतत विकास और समृद्धि की मंगल कामना करते हैं। हमारे साथ जुड़े रहने के लिए आपका हार्दिक आभार।",
    blessing: "सपरिवार मंगलमय दीपावली की शुभकामनाएँ!",
  },
  // 17. Distant Relative - Warm & Heartfelt (English)
  {
    id: "relative-warm-en",
    language: "English",
    tone: "Warm & Heartfelt",
    relationship: "Distant Relative",
    text: "Though miles may separate us, the festive spirit connects our hearts across every distance. Thinking of you and sending warm wishes for a joyful, peace-filled Deepavali.",
    blessing: "Happy Diwali with fondness and prayers!",
  },
  // 18. Family - Playful & Funny (Hindi)
  {
    id: "fam-play-hi",
    language: "Hindi",
    tone: "Playful & Funny",
    relationship: "Family",
    text: "मिठाई, नमकीन और ढेर सारे दीयों का त्योहार आ गया है! आज नो-डाइट डे है, तो बिना गिल्ट के काजू कतली का लुत्फ़ उठाइए और खुशियों के पटाखे फोड़िए!",
    blessing: "मस्ती भरी शुभ दीपावली!",
  },
];

export function findCuratedGreeting(
  recipientName: string,
  language: string,
  tone: string,
  relationship: string
): { message: string; blessing: string } {
  // Try exact match on language, tone, and relationship
  let match = CURATED_GREETINGS.find(
    (g) =>
      g.language.toLowerCase() === language.toLowerCase() &&
      g.tone.toLowerCase() === tone.toLowerCase() &&
      g.relationship.toLowerCase() === relationship.toLowerCase()
  );

  // Fallback 1: match on language and relationship
  if (!match) {
    match = CURATED_GREETINGS.find(
      (g) =>
        g.language.toLowerCase() === language.toLowerCase() &&
        g.relationship.toLowerCase() === relationship.toLowerCase()
    );
  }

  // Fallback 2: match on language
  if (!match) {
    match = CURATED_GREETINGS.find(
      (g) => g.language.toLowerCase() === language.toLowerCase()
    );
  }

  // Fallback 3: default warm English
  if (!match) {
    match = CURATED_GREETINGS[0];
  }

  const prefix = recipientName.trim() ? `Dearest ${recipientName.trim()}, ` : "";
  return {
    message: match.language === "English" || match.language === "Hinglish"
      ? `${prefix}${match.text}`
      : `${recipientName.trim() ? `${recipientName.trim()} जी, ` : ""}${match.text}`,
    blessing: match.blessing || "Shubh Deepavali!",
  };
}
