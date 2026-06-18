import { Fragment, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

const ASSETS = {
  startButton: "/assets/1.png",
  loginButton: "/assets/2.png",
  registerButton: "/assets/3.png",

  homeIcon: "/assets/7.png",
  you: "/assets/8.png",
  home: "/assets/9.png",
  news: "/assets/10.png",
  learn: "/assets/11.png",
  progress: "/assets/12.png",
  partnership: "/assets/13.png",
  party: "/assets/14.png",
  faq: "/assets/15.png",

  cat: "/assets/16.png",
  sat: "/assets/17.png",
  admission: "/assets/18.png",
  ielts: "/assets/19.png",

  catGraduate: "/assets/kitty-2.png",
  mortarboard: "/assets/mortarboard.png",
  hiking: "/assets/hiking.png",
  gps: "/assets/gps.png",
};

const COZE_BOT_LINK =
  "https://www.coze.com/store/agent/7652286276007886901?bot_id=true";

const TELEGRAM_LINK = "https://t.me/mentoria_organization";

const TEXT = {
  ru: {
    startText:
      "Mentoria — программа, которая помогает школьникам готовиться к поступлению за рубеж, выбирать направление, учиться к SAT, IELTS, Admission и отслеживать свой прогресс.",
    login: "Войти",
    register: "Зарегистрироваться",
    continue: "Продолжить",
    back: "Назад",
    adminLogin: "Войти как админ",
    beginner: "Начинающий",
    middle: "Средний",
    advanced: "Продвинутый",
    expert: "Эксперт",
    askTelegram: "Есть вопросы? Напиши в Telegram-канал Mentoria:",
    completeLesson: "Complete lesson",
  },

  en: {
    startText:
      "Mentoria helps students prepare for studying abroad, choose their direction, study SAT, IELTS and Admission, and track their progress.",
    login: "Login",
    register: "Register",
    continue: "Continue",
    back: "Back",
    adminLogin: "Login as admin",
    beginner: "Beginner",
    middle: "Middle",
    advanced: "Advanced",
    expert: "Expert",
    askTelegram: "Have questions? Ask Mentoria on Telegram:",
    completeLesson: "Complete lesson",
  },

  kz: {
    startText:
      "Mentoria оқушыларға шетелге оқуға түсуге дайындалуға, бағыт таңдауға, SAT, IELTS, Admission оқуға және прогресті бақылауға көмектеседі.",
    login: "Кіру",
    register: "Тіркелу",
    continue: "Жалғастыру",
    back: "Артқа",
    adminLogin: "Админ ретінде кіру",
    beginner: "Бастаушы",
    middle: "Орта",
    advanced: "Жоғары",
    expert: "Сарапшы",
    askTelegram: "Сұрақ бар ма? Mentoria Telegram арнасына жазыңыз:",
    completeLesson: "Сабақты аяқтау",
  },
};

const DEFAULT_NEWS = {
  mentoria: [
    {
      title: "Mentoria Hackathon",
      image: "/assets/news/mentoria-hackathon.png",
      text: "Вас ждет масштабный хакатон Mentoria Hackathon, и регистрация на него уже официально открыта. Это отличная возможность заявить о себе, погрузиться в мир разработки и технологий, найти единомышленников и воплотить свои самые смелые идеи в реальность. Участников ждет серьезная борьба, ведь общий призовой фонд проекта составляет один миллион тенге.",
      date: "13.06.2026",
      deadline: "13.06.2026",
      audience: "7–12 класс",
      format: "Онлайн",
      place: "Online",
    },
    {
      title: "YOUTH SPEAKING",
      image: "/assets/news/youth-speaking.png",
      text: "13 июня в Алматы пройдёт Youth Speaking — speaking & debate experience для подростков и студентов. Участники попробуют публичные выступления, научатся быстро формулировать мысли, выступят без подготовки и поучаствуют в дебатах.",
      date: "13.06.2026",
      deadline: "13.06.2026",
      audience: "Подростки и студенты",
      format: "Public speaking & Debate",
      place: "Алматы",
    },
    {
      title: "KAIS CASE COMPETITION 2026",
      image: "/assets/news/kais-case.png",
      text: "KAIS Case Competition — кейс-баттл для школьников 7–10 классов. Участники попробуют себя в роли бизнес-аналитиков, будут работать в команде и представят решение перед жюри.",
      date: "20.06.2026",
      deadline: "20.06.2026",
      audience: "7–10 класс",
      format: "Case competition",
      place: "Алматы, ул. Торайгырова 43",
    },
    {
      title: "SAT BATTLE 2026",
      image: "/assets/news/sat-battle.png",
      text: "KAU School приглашает школьников принять участие в SAT Battle — ярком интеллектуальном соревновании по математике, логике и Reading в формате международных академических заданий. Это отличная возможность проверить свои силы среди сверстников из других школ и почувствовать атмосферу настоящего академического вызова.",
      date: "23.05.2026",
      deadline: "23.05.2026",
      audience: "7–8 класс",
      format: "Academic competition",
      place: "KAU School, Алматы",
    },
  ],

  myExtra: [
    {
      title: "PLURAL+ Youth Video Festival",
      image: "/assets/news/plural.png",
      text: "Открыт приём заявок на международный молодёжный видеофестиваль PLURAL+. Молодые авторы от 9 до 25 лет могут представить короткие фильмы о миграции, культурном разнообразии, инклюзии и борьбе с дискриминацией. Лучшие работы покажут на международных площадках и мероприятиях ООН.",
      date: "30.06.2026",
      deadline: "30.06.2026",
      audience: "9–25 лет",
      format: "Video festival",
      place: "Online",
    },
    {
      title: "AI INSIDE OUT",
      image: "/assets/news/ai-inside-out.png",
      text: "AI INSIDE OUT — офлайн-воркшоп по искусственному интеллекту для школьников 7–10 классов в Алматы. Участники узнают, как работает AI на практике, попробуют роль AI-разработчика, разберут основы AI programming и создадут AI-art.",
      date: "04.06.2026",
      deadline: "04.06.2026",
      audience: "7–10 класс",
      format: "AI workshop",
      place: "KAU School, Алматы",
    },
    {
      title: "NGFP Young Voices Awards",
      image: "/assets/news/ngfp-awards.png",
      text: "Открыт прием заявок на международную премию NGFP Young Voices Awards. Конкурс создан для поддержки активных молодых людей, которые реализуют социальные, экологические, исследовательские или технологические проекты, меняющие к лучшему будущее своих сообществ и всего мира. Участники могут представить инициативы, связанные с одной из 17 Целей устойчивого развития ООН.",
      date: "26.06.2026",
      deadline: "26.06.2026",
      audience: "12–17 лет",
      format: "Online project competition",
      prize: "1000 USD для победителя, 500 USD для призёров",
      place: "Online",
    },
    {
      title: "NU STeP Logo Challenge",
      image: "/assets/news/nu-step.png",
      text: "Для творческих людей, дизайнеров и художников появилась возможность проявить себя и выиграть крупный денежный приз. DC Lab совместно с Назарбаев Университетом объявила конкурс NU STeP LOGO CHALLENGE. Astana Business Campus меняет название и начинает новую главу под брендом NU STeP — NU Science & Technology Park. Организаторы ищут уникальный логотип для центра инноваций, науки, технологий и предпринимательства.",
      date: "21.06.2026",
      deadline: "21.06.2026 23:59",
      audience: "Дизайнеры, художники",
      format: "Logo challenge",
      prize: "500 000 ₸",
      place: "Online",
    },
  ],

  jasam: [
    {
      title: "Jasam Update",
      image: "",
      text: "Здесь будут новости от Jasam: проекты, конкурсы, возможности и новые образовательные события.",
      date: "soon",
      deadline: "soon",
      audience: "Students",
      format: "Update",
      place: "Online",
    },
  ],
};

const DEFAULT_LESSONS = [
  {
    id: "essay-reading-1",
    topic: "Essay",
    section: "Reading & Writing",
    title: "Essay Practice: Main Idea, Vocabulary, Evidence",
    description:
      "Мини-урок с 10 вопросами по SAT-style reading: main purpose, vocabulary in context, evidence and transitions.",
    questions: [
      {
        passage:
          "Hip hop artist Natanii Means belongs to the Oglala Lakota, Umoⁿhoⁿ (Omaha), and Diné Nations; his music, accordingly, channels the historical and present-day realities of Native American life. It would be somewhat narrow, though, to understand Means’s work solely on the basis of musical expression. Complementing the recognition that his albums have garnered, Means runs the “Music Is Medicine Workshop.” Music is naturally central to this initiative for young adults, but so are sound design, cinema, social advocacy, and storytelling generally—all of which contribute to the performances of the participants.",
        question:
          "Which choice best states the main purpose of the text as a whole?",
        choices: [
          "To establish Means’s identity as a member of multiple Native American communities",
          "To connect specific albums by Means to the founding of the “Music Is Medicine Workshop”",
          "To demonstrate how a typical “Music Is Medicine Workshop” moves from preliminary stages to a final project",
          "To describe how Means has combined music with other forms of creative activity",
        ],
        answer: 3,
      },
      {
        passage:
          "The following text is from George Bernard Shaw’s 1919 play Heartbreak House.\n\nMRS HUSHABYE: And so your poor father had to go into business. Hasn't he succeeded in it?\n\nELLIE: He always used to say he could succeed if he only had some capital. He fought his way along, to keep a roof over our heads and bring us up well; but it was always a struggle: always the same difficulty of not having capital enough. I don't know how to describe it to you.\n\nMRS HUSHABYE: Poor Ellie!",
        question:
          "As used in the text, what does the word “keep” most nearly mean?",
        choices: ["Lock", "Maintain", "Clutch", "Separate"],
        answer: 1,
      },
      {
        passage:
          "Many students think that a strong college essay must focus on a dramatic event. However, admissions officers often value reflection more than drama. A simple experience can become meaningful if the writer clearly explains what changed in their thinking.",
        question: "Which choice best states the main idea of the passage?",
        choices: [
          "College essays should always describe dramatic events.",
          "Admissions officers dislike personal stories.",
          "Reflection can make an ordinary experience meaningful.",
          "Students should avoid writing about themselves.",
        ],
        answer: 2,
      },
      {
        passage:
          "Lina revised her essay several times. At first, the essay listed many achievements, but it did not explain why those achievements mattered. After revision, she connected each activity to a personal value: curiosity, discipline, and service.",
        question: "What is the main purpose of the second sentence?",
        choices: [
          "To show the weakness of Lina’s first draft",
          "To explain why Lina stopped writing essays",
          "To prove that achievements are not important",
          "To introduce a completely unrelated topic",
        ],
        answer: 0,
      },
      {
        passage:
          "The student’s argument was concise: every sentence supported the central claim, and no example was included merely to sound impressive.",
        question: "As used in the text, what does “concise” most nearly mean?",
        choices: [
          "Brief and clear",
          "Emotional and personal",
          "Long and detailed",
          "Confusing and abstract",
        ],
        answer: 0,
      },
      {
        passage:
          "Some applicants describe leadership only as holding an official title. In reality, leadership can also appear in quieter forms: helping a teammate, organizing a small project, or taking responsibility when no one else does.",
        question: "Which choice best describes the function of the second sentence?",
        choices: [
          "It gives a broader definition of leadership.",
          "It argues that leadership is impossible to prove.",
          "It lists reasons to avoid leadership roles.",
          "It criticizes all official titles.",
        ],
        answer: 0,
      },
      {
        passage:
          "The workshop did not promise instant improvement. Instead, it gave students a structure: write, receive feedback, revise, and reflect.",
        question:
          "Which transition best shows the relationship between the two sentences?",
        choices: ["For example", "Instead", "Similarly", "As a result"],
        answer: 1,
      },
      {
        passage:
          "Mira’s first paragraph introduced her interest in environmental science. The strongest evidence came later, when she described how she tested water quality in her neighborhood and shared the results with local residents.",
        question:
          "Which detail best supports the claim that Mira showed real interest in environmental science?",
        choices: [
          "She wrote a first paragraph.",
          "She tested water quality and shared the results.",
          "She lived in a neighborhood.",
          "She used the word environmental.",
        ],
        answer: 1,
      },
      {
        passage:
          "A personal statement should not simply repeat a résumé. It should reveal how the applicant thinks, what they value, and why their goals matter.",
        question:
          "Which choice best states the author’s view of a personal statement?",
        choices: [
          "It should only list awards.",
          "It should be identical to a résumé.",
          "It should show the applicant’s thinking and values.",
          "It should avoid goals.",
        ],
        answer: 2,
      },
      {
        passage:
          "The conclusion of an essay should not introduce a completely new topic. Rather, it should return to the main idea and leave the reader with a clear final impression.",
        question: "What is the best summary of the passage?",
        choices: [
          "A conclusion should add many new examples.",
          "A conclusion should restate the essay’s central meaning clearly.",
          "A conclusion should be the longest paragraph.",
          "A conclusion should avoid the main idea.",
        ],
        answer: 1,
      },
    ],
  },

  {
    id: "sat-mini-1",
    topic: "SAT",
    section: "Reading & Writing",
    title: "SAT Mini Lesson: Words and Transitions",
    description:
      "Короткий SAT-урок: vocabulary in context, transitions and main purpose.",
    questions: [
      {
        passage:
          "The scientist’s explanation was accessible: even students without advanced training could understand the main idea.",
        question: "As used in the text, what does “accessible” most nearly mean?",
        choices: [
          "Easy to understand",
          "Difficult to find",
          "Very expensive",
          "Physically distant",
        ],
        answer: 0,
      },
      {
        passage:
          "The city wanted to reduce traffic. ______, it expanded public transportation and built new bike lanes.",
        question: "Which transition best completes the text?",
        choices: ["However", "Therefore", "Nevertheless", "For instance"],
        answer: 1,
      },
      {
        passage:
          "The text first introduces a problem and then explains one possible solution.",
        question: "What is the structure of the text?",
        choices: [
          "Cause and effect",
          "Problem and solution",
          "Chronological order",
          "Comparison only",
        ],
        answer: 1,
      },
      {
        passage:
          "Although the experiment was small, its results were promising and encouraged further research.",
        question: "What does the sentence suggest about the experiment?",
        choices: [
          "It was unsuccessful.",
          "It was large and complete.",
          "It had positive early results.",
          "It ended all future research.",
        ],
        answer: 2,
      },
    ],
  },

  {
    id: "ielts-mini-1",
    topic: "IELTS",
    section: "Writing",
    title: "IELTS Mini Lesson: Writing Task 2",
    description:
      "Короткий IELTS-урок по структуре essay, topic sentence and examples.",
    questions: [
      {
        passage:
          "A strong body paragraph usually begins with a clear topic sentence, then develops the idea with explanation and example.",
        question: "What should usually come first in a body paragraph?",
        choices: ["Random example", "Topic sentence", "Conclusion", "Question"],
        answer: 1,
      },
      {
        passage:
          "Some people believe online education is more flexible than traditional education because students can study at any time.",
        question: "What is the main reason given for online education?",
        choices: [
          "It is cheaper",
          "It is more flexible",
          "It is always easier",
          "It has no problems",
        ],
        answer: 1,
      },
      {
        passage:
          "In conclusion, while technology can create distractions, it also gives students access to useful learning tools.",
        question: "What does this conclusion do?",
        choices: [
          "It gives a balanced final opinion.",
          "It introduces an unrelated topic.",
          "It gives no position.",
          "It only discusses disadvantages.",
        ],
        answer: 0,
      },
    ],
  },

  {
    id: "admission-mini-1",
    topic: "Admission",
    section: "Personal Statement",
    title: "Admission Mini Lesson: Personal Statement",
    description:
      "Короткий урок по personal statement: motivation, story, values and university fit.",
    questions: [
      {
        passage:
          "A strong personal statement does not only explain what the student achieved; it explains why those achievements matter to the student’s future goals.",
        question: "What should a strong personal statement explain?",
        choices: [
          "Only awards",
          "Only grades",
          "Why achievements matter",
          "Nothing personal",
        ],
        answer: 2,
      },
      {
        passage:
          "Instead of writing 'I am hardworking,' the applicant described how she spent three months improving her robotics prototype after repeated failures.",
        question: "Why is the second approach stronger?",
        choices: [
          "It gives evidence through a specific example.",
          "It avoids describing effort.",
          "It is shorter.",
          "It removes personal details.",
        ],
        answer: 0,
      },
      {
        passage:
          "University fit means showing why a specific program, professor, course, lab, or community connects to the applicant’s goals.",
        question: "Which detail best shows university fit?",
        choices: [
          "I want to study abroad.",
          "Your robotics lab connects to my project on assistive technology.",
          "Your university is famous.",
          "I like big campuses.",
        ],
        answer: 1,
      },
    ],
  },
];

const DEFAULT_EVENTS = [
  {
    title: "Hackathon",
    date: "27.07.2026",
    place: "Online / Astana",
    format: "Team project",
    forWho: "Students who want to build a portfolio project.",
    gives:
      "A project case, teamwork experience, presentation practice and a portfolio achievement.",
    rules:
      "Create a small digital or social project, prepare a short pitch and present the result.",
  },
  {
    title: "Quiz",
    date: "02.08.2026",
    place: "Mentoria Space",
    format: "Individual or team game",
    forWho: "Students preparing for admission, SAT, IELTS and interviews.",
    gives:
      "Fast thinking, confidence, university knowledge and learning motivation.",
    rules:
      "Answer questions about universities, English, logic, SAT basics and global knowledge.",
  },
  {
    title: "MUN",
    date: "10.08.2026",
    place: "School conference hall",
    format: "Model United Nations",
    forWho: "Students who want public speaking and debate experience.",
    gives:
      "Debate skills, diplomacy, research practice and strong extracurricular profile.",
    rules:
      "Represent a country, prepare a position, speak, debate and write a resolution.",
  },
];

function makeLocalId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return String(Date.now());
}

function readLocal(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeProfile(profile) {
  return {
    ...profile,
    role: profile?.role || "user",
    avatar_url: profile?.avatar_url || "",
    phone: profile?.phone || "",
    ielts_lessons: Number(profile?.ielts_lessons || 0),
    sat_lessons: Number(profile?.sat_lessons || 0),
    admission_lessons: Number(profile?.admission_lessons || 0),
    essays: Number(profile?.essays || 0),
    completed_lessons: Array.isArray(profile?.completed_lessons)
      ? profile.completed_lessons
      : [],
  };
}

function getUserPoints(profile) {
  return (
    Number(profile?.ielts_lessons || 0) +
    Number(profile?.sat_lessons || 0) +
    Number(profile?.admission_lessons || 0) +
    Number(profile?.essays || 0)
  );
}

function getLevelIndex(points) {
  if (points >= 8) return 3;
  if (points >= 5) return 2;
  if (points >= 2) return 1;
  return 0;
}

function getLevelLabel(points, lang) {
  const labels = [
    TEXT[lang].beginner,
    TEXT[lang].middle,
    TEXT[lang].advanced,
    TEXT[lang].expert,
  ];

  return labels[getLevelIndex(points)];
}

function App() {
  const [screen, setScreen] = useState("start");
  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lang, setLang] = useState("ru");

  const [profile, setProfile] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const [customNews, setCustomNews] = useState(() =>
    readLocal("mentoria_custom_news", [])
  );

  const [customLessons, setCustomLessons] = useState(() =>
    readLocal("mentoria_custom_lessons", [])
  );

  const [customEvents, setCustomEvents] = useState(() =>
    readLocal("mentoria_custom_events", [])
  );

  const t = TEXT[lang];

  useEffect(() => {
    const savedProfile = localStorage.getItem("mentoria_profile");

    if (savedProfile) {
      const parsedProfile = normalizeProfile(JSON.parse(savedProfile));
      setProfile(parsedProfile);
      loadRegistrations(parsedProfile.id);
      loadLeaderboard(parsedProfile);
    }
  }, []);

  async function loadRegistrations(profileId) {
    if (!profileId) return;

    try {
      const { data, error } = await supabase
        .from("event_registrations")
        .select("*")
        .eq("profile_id", profileId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setRegistrations(data || []);
    } catch (error) {
      console.log("loadRegistrations error:", error);

      const localRegistrations = readLocal("mentoria_registrations", []);

      const userRegistrations = localRegistrations.filter(
        (item) => item.profile_id === profileId
      );

      setRegistrations(userRegistrations);
    }
  }

  async function loadLeaderboard(currentProfile = profile) {
    try {
      const { data, error } = await supabase
        .from("progress_entries")
        .select("*")
        .order("ielts_lessons", { ascending: false })
        .order("sat_lessons", { ascending: false })
        .order("essays", { ascending: false });

      if (error) throw error;

      setLeaderboard(data || []);
    } catch (error) {
      console.log("loadLeaderboard error:", error);

      if (currentProfile) {
        setLeaderboard([
          {
            id: currentProfile.id,
            nickname: currentProfile.username,
            ielts_lessons: currentProfile.ielts_lessons || 0,
            sat_lessons: currentProfile.sat_lessons || 0,
            essays: currentProfile.essays || 0,
          },
        ]);
      }
    }
  }

  async function handleAuth(formData) {
    const authMode = formData.get("auth_mode");
    const username = formData.get("username");
    const password = formData.get("password");
    const phone = formData.get("phone");

    if (!username || !password) {
      alert("Заполни username и password");
      return;
    }

    if (password.length < 6) {
      alert("Password должен быть минимум 6 символов");
      return;
    }

    if (authMode === "admin") {
      if (password !== "mentoria-admin") {
        alert("Неверный admin password");
        return;
      }

      const adminProfile = normalizeProfile({
        id: "admin-local",
        username,
        phone: "",
        role: "admin",
      });

      setProfile(adminProfile);
      saveLocal("mentoria_profile", adminProfile);
      setScreen("app");
      setActivePage("admin");
      return;
    }

    if (authMode === "register" && !phone) {
      alert("Для регистрации нужен номер телефона");
      return;
    }

    if (authMode === "login") {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", username)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          alert("Такой username не найден. Сначала зарегистрируйся.");
          return;
        }

        const normalized = normalizeProfile(data);

        setProfile(normalized);
        saveLocal("mentoria_profile", normalized);

        await loadRegistrations(normalized.id);
        await loadLeaderboard(normalized);

        setScreen("app");
        setActivePage("home");
        return;
      } catch (error) {
        console.log("Supabase login error:", error);

        const localProfile = readLocal("mentoria_profile", null);

        if (localProfile && localProfile.username === username) {
          const normalized = normalizeProfile(localProfile);

          setProfile(normalized);
          await loadRegistrations(normalized.id);
          await loadLeaderboard(normalized);

          setScreen("app");
          setActivePage("home");
          return;
        }

        alert(
          "Supabase сейчас не подключается. Для теста нажми «Зарегистрироваться»."
        );
        return;
      }
    }

    if (authMode === "register") {
      const localFallbackProfile = normalizeProfile({
        id: makeLocalId(),
        username,
        phone,
        avatar_url: "",
        role: "user",
        completed_lessons: [],
        created_at: new Date().toISOString(),
      });

      try {
        const { data, error } = await supabase
          .from("profiles")
          .insert({
            username,
            phone,
            avatar_url: "",
            completed_lessons: [],
          })
          .select()
          .single();

        if (error) throw error;

        const newProfile = normalizeProfile(data);

        setProfile(newProfile);
        saveLocal("mentoria_profile", newProfile);

        const { error: progressError } = await supabase
          .from("progress_entries")
          .insert({
            profile_id: newProfile.id,
            nickname: newProfile.username,
            ielts_lessons: 0,
            sat_lessons: 0,
            essays: 0,
          });

        if (progressError) {
          console.log("progress insert error:", progressError);
        }

        await loadLeaderboard(newProfile);

        setScreen("app");
        setActivePage("home");
        return;
      } catch (error) {
        console.log("Supabase register error:", error);

        saveLocal("mentoria_profile", localFallbackProfile);

        setProfile(localFallbackProfile);

        setLeaderboard([
          {
            id: localFallbackProfile.id,
            nickname: localFallbackProfile.username,
            ielts_lessons: 0,
            sat_lessons: 0,
            essays: 0,
          },
        ]);

        setScreen("app");
        setActivePage("home");

        alert(
          "Supabase не подключился, поэтому профиль временно сохранён в браузере. Сайт откроется для теста."
        );
      }
    }
  }

  async function updateProfile(updatedProfile) {
    if (!profile) return;

    const localUpdatedProfile = normalizeProfile({
      ...profile,
      ...updatedProfile,
    });

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          username: updatedProfile.username,
          phone: updatedProfile.phone,
          avatar_url: updatedProfile.avatar_url,
        })
        .eq("id", profile.id)
        .select()
        .single();

      if (error) throw error;

      const normalized = normalizeProfile({
        ...localUpdatedProfile,
        ...data,
      });

      setProfile(normalized);
      saveLocal("mentoria_profile", normalized);
      await loadLeaderboard(normalized);
    } catch (error) {
      console.log("update profile error:", error);

      setProfile(localUpdatedProfile);
      saveLocal("mentoria_profile", localUpdatedProfile);

      alert("Supabase не обновился, но данные временно сохранены в браузере.");
    }
  }

  async function completeLesson(topic, lessonTitle) {
    if (!profile) return;

    const fieldMap = {
      SAT: "sat_lessons",
      IELTS: "ielts_lessons",
      Admission: "admission_lessons",
      Essay: "essays",
    };

    const field = fieldMap[topic];

    if (!field) return;

    const oldCompleted = Array.isArray(profile.completed_lessons)
      ? profile.completed_lessons
      : [];

    const alreadyCompleted = oldCompleted.some(
      (lesson) => lesson.title === lessonTitle
    );

    const completedItem = {
      id: makeLocalId(),
      title: lessonTitle,
      topic,
      completed_at: new Date().toISOString(),
    };

    const updatedProfile = normalizeProfile({
      ...profile,
      [field]: Number(profile[field] || 0) + (alreadyCompleted ? 0 : 1),
      completed_lessons: alreadyCompleted
        ? oldCompleted
        : [completedItem, ...oldCompleted],
    });

    setProfile(updatedProfile);
    saveLocal("mentoria_profile", updatedProfile);

    setLeaderboard([
      {
        id: updatedProfile.id,
        nickname: updatedProfile.username,
        ielts_lessons: updatedProfile.ielts_lessons,
        sat_lessons: updatedProfile.sat_lessons,
        essays: updatedProfile.essays,
      },
    ]);

    try {
      await supabase
        .from("profiles")
        .update({
          ielts_lessons: updatedProfile.ielts_lessons,
          sat_lessons: updatedProfile.sat_lessons,
          admission_lessons: updatedProfile.admission_lessons,
          essays: updatedProfile.essays,
          completed_lessons: updatedProfile.completed_lessons,
        })
        .eq("id", profile.id);

      await supabase
        .from("progress_entries")
        .update({
          nickname: updatedProfile.username,
          ielts_lessons: updatedProfile.ielts_lessons,
          sat_lessons: updatedProfile.sat_lessons,
          essays: updatedProfile.essays,
        })
        .eq("profile_id", profile.id);
    } catch (error) {
      console.log("complete lesson supabase error:", error);
    }

    alert("Lesson completed. It is now saved in your profile.");
  }

  function addRegistration(newRegistration) {
    setRegistrations((prev) => [newRegistration, ...prev]);

    const oldRegistrations = readLocal("mentoria_registrations", []);

    saveLocal("mentoria_registrations", [
      newRegistration,
      ...oldRegistrations,
    ]);
  }

  function addCustomNews(newsItem) {
    const next = [newsItem, ...customNews];
    setCustomNews(next);
    saveLocal("mentoria_custom_news", next);
  }

  function addCustomLesson(lesson) {
    const next = [lesson, ...customLessons];
    setCustomLessons(next);
    saveLocal("mentoria_custom_lessons", next);
  }

  function addCustomEvent(event) {
    const next = [event, ...customEvents];
    setCustomEvents(next);
    saveLocal("mentoria_custom_events", next);
  }

  if (screen === "start") {
    return (
      <StartScreen
        onStart={() => setScreen("auth")}
        lang={lang}
        setLang={setLang}
        t={t}
      />
    );
  }

  if (screen === "auth") {
    return <AuthScreen onSubmit={handleAuth} t={t} />;
  }

  const allLessons = [...customLessons, ...DEFAULT_LESSONS];
  const allEvents = [...customEvents, ...DEFAULT_EVENTS];
  const progressPoints = getUserPoints(profile);

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        profile={profile}
        lang={lang}
      />

      <main className={sidebarOpen ? "main-content" : "main-content closed"}>
        <LanguageMini lang={lang} setLang={setLang} />

        <TopRoadmap progressPoints={progressPoints} lang={lang} />

        {activePage === "you" && <YouPage />}

        {activePage === "home" && (
          <HomePage
            profile={profile}
            registrations={registrations}
            onUpdateProfile={updateProfile}
          />
        )}

        {activePage === "news" && <NewsPage customNews={customNews} />}

        {activePage === "learn" && (
          <LearnPage
            lessons={allLessons}
            onCompleteLesson={completeLesson}
            t={t}
          />
        )}

        {activePage === "progress" && (
          <ProgressPage
            profile={profile}
            leaderboard={leaderboard}
            lang={lang}
          />
        )}

        {activePage === "partnership" && <PartnershipPage />}

        {activePage === "party" && (
          <PartyPage
            profile={profile}
            events={allEvents}
            onRegistered={addRegistration}
          />
        )}

        {activePage === "faq" && <FaqPage />}

        {activePage === "admin" && (
          <AdminPage
            onAddNews={addCustomNews}
            onAddLesson={addCustomLesson}
            onAddEvent={addCustomEvent}
          />
        )}
      </main>
    </div>
  );
}

function StartScreen({ onStart, lang, setLang, t }) {
  return (
    <section className="start-screen">
      <LanguageMini lang={lang} setLang={setLang} />

      <div className="start-roadmap-wrap">
        <RoadmapStrip progressPoints={0} lang={lang} />
      </div>

      <button className="image-button start-image-button" onClick={onStart}>
        <img src={ASSETS.startButton} alt="Start Mentoria" />
      </button>

      <div className="mentor-description">
        <h2>MENTORIA</h2>
        <p>{t.startText}</p>
      </div>
    </section>
  );
}

function LanguageMini({ lang, setLang }) {
  return (
    <div className="language-mini">
      <button
        className={lang === "en" ? "active-lang" : ""}
        onClick={() => setLang("en")}
      >
        EN
      </button>

      <button
        className={lang === "ru" ? "active-lang" : ""}
        onClick={() => setLang("ru")}
      >
        RU
      </button>

      <button
        className={lang === "kz" ? "active-lang" : ""}
        onClick={() => setLang("kz")}
      >
        KZ
      </button>
    </div>
  );
}

function AuthScreen({ onSubmit, t }) {
  const [authMode, setAuthMode] = useState(null);

  function submitForm(event) {
    event.preventDefault();

    if (!authMode) {
      alert("Сначала выбери: Войти или Зарегистрироваться");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append("auth_mode", authMode);
    onSubmit(formData);
  }

  if (!authMode) {
    return (
      <section className="auth-screen">
        <button
          className="small-admin-link"
          onClick={() => setAuthMode("admin")}
        >
          {t.adminLogin}
        </button>

        <div className="auth-panel auth-choice-panel">
          <div className="auth-top-buttons">
            <button
              type="button"
              className="image-button auth-image-button"
              onClick={() => setAuthMode("login")}
            >
              <img src={ASSETS.loginButton} alt="Войти" />
            </button>

            <button
              type="button"
              className="image-button auth-image-button"
              onClick={() => setAuthMode("register")}
            >
              <img src={ASSETS.registerButton} alt="Зарегистрироваться" />
            </button>
          </div>

          <img className="graduate-cat" src={ASSETS.catGraduate} alt="Cat" />
        </div>
      </section>
    );
  }

  return (
    <section className="auth-screen">
      <form className="auth-panel auth-form-panel" onSubmit={submitForm}>
        <div className="auth-fields">
          <h2>
            {authMode === "login"
              ? t.login
              : authMode === "admin"
              ? "Admin"
              : t.register}
          </h2>

          <label>
            Username
            <input name="username" placeholder="Например: maddie" />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder={
                authMode === "admin"
                  ? "Admin password"
                  : "Минимум 6 символов"
              }
            />
          </label>

          {authMode === "register" && (
            <label>
              Phone
              <input name="phone" placeholder="+7..." />
            </label>
          )}

          <button className="submit-auth" type="submit">
            {t.continue}
          </button>

          <button
            type="button"
            className="back-auth-button"
            onClick={() => setAuthMode(null)}
          >
            {t.back}
          </button>
        </div>

        <img className="graduate-cat" src={ASSETS.catGraduate} alt="Cat" />
      </form>
    </section>
  );
}

function Sidebar({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
  profile,
  lang,
}) {
  const menu = [
    { id: "home", img: ASSETS.home },
    { id: "news", img: ASSETS.news },
    { id: "learn", img: ASSETS.learn },
    { id: "progress", img: ASSETS.progress },
    { id: "partnership", img: ASSETS.partnership },
    { id: "party", img: ASSETS.party },
    { id: "faq", img: ASSETS.faq },
  ];

  const points = getUserPoints(profile);

  return (
    <aside className={sidebarOpen ? "sidebar" : "sidebar sidebar-closed"}>
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "←" : "→"}
      </button>

      <button
        className={
          activePage === "you"
            ? "sidebar-you active-side-button"
            : "sidebar-you"
        }
        onClick={() => setActivePage("you")}
      >
        <img src={ASSETS.you} alt="You" />
      </button>

      <div className="sidebar-menu">
        {menu.map((item) => (
          <button
            key={item.id}
            className={activePage === item.id ? "active-side-button" : ""}
            onClick={() => setActivePage(item.id)}
          >
            <img src={item.img} alt={item.id} />
          </button>
        ))}

        {profile?.role === "admin" && (
          <button
            className={
              activePage === "admin"
                ? "admin-side-text active-side-button"
                : "admin-side-text"
            }
            onClick={() => setActivePage("admin")}
          >
            ADMIN
          </button>
        )}
      </div>

      <div className="sidebar-bottom-text">
        <p>
          <strong>Menti:</strong> {profile?.username || "guest"}
        </p>
        <p>
          <strong>level:</strong> {getLevelLabel(points, lang)}
        </p>
      </div>
    </aside>
  );
}

function RoadmapStrip({ progressPoints = 0, lang = "ru" }) {
  const labels = [
    TEXT[lang].beginner,
    TEXT[lang].middle,
    TEXT[lang].advanced,
    TEXT[lang].expert,
  ];

  const activeLevel = getLevelIndex(progressPoints);

  return (
    <div className="roadmap-strip">
      <div className="roadmap-strip-row">
        {labels.map((label, index) => (
          <Fragment key={label}>
            <div className="roadmap-stop">
              <div
                className={
                  index <= activeLevel
                    ? "roadmap-pin-box active-roadmap-pin"
                    : "roadmap-pin-box"
                }
              >
                <img src={ASSETS.gps} alt={label} />
              </div>
              <span className="roadmap-level-text">{label}</span>
            </div>

            {index < labels.length - 1 && (
              <div className="roadmap-link">
                <div className="roadmap-link-line"></div>

                {index === activeLevel && (
                  <div className="roadmap-hiking-box">
                    <img src={ASSETS.hiking} alt="hiking" />
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}

        <div className="roadmap-link">
          <div className="roadmap-link-line"></div>

          {activeLevel === 3 && (
            <div className="roadmap-hiking-box">
              <img src={ASSETS.hiking} alt="hiking" />
            </div>
          )}
        </div>

        <div className="roadmap-stop roadmap-finish">
          <div className="roadmap-cap-box">
            <img src={ASSETS.mortarboard} alt="finish" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TopRoadmap({ progressPoints, lang }) {
  return (
    <div className="top-roadmap">
      <div className="top-icon-box">
        <img src={ASSETS.homeIcon} alt="Home" className="top-icon-img" />
      </div>

      <RoadmapStrip progressPoints={progressPoints} lang={lang} />

      <div className="top-icon-box">
        <img
          src={ASSETS.mortarboard}
          alt="Graduation cap"
          className="top-icon-img cap-img"
        />
      </div>
    </div>
  );
}

function YouPage() {
  return (
    <section className="you-page">
      <h1>YOU</h1>
      <NewOperation />
    </section>
  );
}

function HomePage({ profile, registrations, onUpdateProfile }) {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(profile?.username || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");

  const completedLessons = Array.isArray(profile?.completed_lessons)
    ? profile.completed_lessons
    : [];

  useEffect(() => {
    setUsername(profile?.username || "");
    setPhone(profile?.phone || "");
    setAvatarUrl(profile?.avatar_url || "");
  }, [profile]);

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setAvatarUrl(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function saveProfile(event) {
    event.preventDefault();

    if (!username || !phone) {
      alert("Заполни username и phone");
      return;
    }

    onUpdateProfile({
      username,
      phone,
      avatar_url: avatarUrl,
    });

    setEditing(false);
  }

  return (
    <section className="home-layout">
      <div className="home-title">HOME</div>

      <div className="home-grid">
        <div className="profile-box">
          <div className="profile-header-row">
            <h3>* LOGIN *</h3>

            <button
              className="edit-profile-button"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Close" : "Edit"}
            </button>
          </div>

          <div className="profile-photo">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="profile-photo-img" />
            ) : (
              <div className="profile-avatar">👤</div>
            )}
          </div>

          {!editing ? (
            <>
              <p>* nickname *</p>
              <strong>{profile?.username || "username"}</strong>

              <p>* password *</p>
              <strong>••••••</strong>

              <p>* phone *</p>
              <strong>{profile?.phone || "not filled"}</strong>
            </>
          ) : (
            <form className="edit-profile-form" onSubmit={saveProfile}>
              <label>
                Nickname
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>

              <label>
                Phone
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </label>

              <label>
                Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>

              <button type="submit">Save</button>
            </form>
          )}
        </div>

        <div className="friends-box">
          <h3>FRIENDS</h3>
          <ol>
            <li>Amina</li>
            <li>Aliya</li>
            <li>Danial</li>
            <li>Arman</li>
            <li>Jasmin</li>
          </ol>
        </div>

        <div className="actions-box">
          <h3>LAST ACTIONS</h3>

          {registrations.length === 0 && completedLessons.length === 0 ? (
            <p>No actions yet.</p>
          ) : (
            <ul>
              {completedLessons.map((lesson) => (
                <li key={lesson.id}>
                  Completed <b>{lesson.title}</b>
                </li>
              ))}

              {registrations.map((item) => (
                <li key={item.id}>
                  Registered for <b>{item.event_title}</b>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function NewOperation() {
  return (
    <section className="new-operation">
      <div className="new-operation-title">NEW OPERATION</div>

      <div className="operation-cards">
        <div className="operation-big-card">
          <h2>Mentoria Roadmap</h2>
          <p>
            Build your personal admission path: tests, essays, projects,
            deadlines and portfolio steps.
          </p>
        </div>

        <div className="operation-small-wrapper">
          <div className="operation-small-card blue-card">
            <h3>Study Track</h3>
            <p>SAT / IELTS / Admission lessons</p>
          </div>

          <div className="operation-small-card grape-card">
            <h3>Portfolio Track</h3>
            <p>Events, competitions, hackathons and MUN</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsPage({ customNews }) {
  const groupedCustom = {
    mentoria: customNews.filter((item) => item.group === "mentoria"),
    myExtra: customNews.filter((item) => item.group === "myExtra"),
    jasam: customNews.filter((item) => item.group === "jasam"),
  };

  return (
    <section className="news-page">
      <h1>NEWS</h1>

      <div className="news-columns">
        <NewsColumn
          title="Mentoria Update"
          items={[...groupedCustom.mentoria, ...DEFAULT_NEWS.mentoria]}
        />

        <NewsColumn
          title="My Extra"
          items={[...groupedCustom.myExtra, ...DEFAULT_NEWS.myExtra]}
        />

        <NewsColumn
          title="Jasam"
          items={[...groupedCustom.jasam, ...DEFAULT_NEWS.jasam]}
        />
      </div>
    </section>
  );
}

function NewsColumn({ title, items }) {
  return (
    <div className="news-column">
      <h2>{title}</h2>

      {items.map((item) => (
        <article className="news-small-card" key={item.id || item.title}>
          {item.image && (
            <div className="news-image-box">
              <img
                src={item.image}
                alt={item.title}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          <h3>{item.title}</h3>

          <p>{item.text}</p>

          <div className="news-meta">
            {item.deadline && <span>Deadline: {item.deadline}</span>}
            {item.audience && <span>Для кого: {item.audience}</span>}
            {item.format && <span>Формат: {item.format}</span>}
            {item.prize && <span>Приз: {item.prize}</span>}
            {item.place && <span>Place: {item.place}</span>}
          </div>
        </article>
      ))}
    </div>
  );
}

function LearnPage({ lessons, onCompleteLesson, t }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const topics = [
    { id: "SAT", img: ASSETS.sat },
    { id: "IELTS", img: ASSETS.ielts },
    { id: "Admission", img: ASSETS.admission },
    { id: "Essay", img: null },
  ];

  function startLesson(lesson) {
    setActiveLesson(lesson);
    setAnswers({});
    setChecked(false);
  }

  function countScore() {
    if (!activeLesson?.questions) return 0;

    return activeLesson.questions.reduce((score, question, index) => {
      return Number(answers[index]) === question.answer ? score + 1 : score;
    }, 0);
  }

  function finishQuiz() {
    if (!activeLesson?.questions) return;

    if (Object.keys(answers).length < activeLesson.questions.length) {
      alert("Ответь на все вопросы перед проверкой.");
      return;
    }

    setChecked(true);
  }

  if (activeLesson) {
    const score = countScore();

    return (
      <section className="learn-page">
        <button className="learn-back" onClick={() => setActiveLesson(null)}>
          ← Back to lessons
        </button>

        <h1>{activeLesson.title}</h1>

        <div className="quiz-wrapper">
          {activeLesson.questions.map((item, index) => (
            <article className="quiz-card" key={index}>
              <div className="quiz-number">Question {index + 1}</div>

              <p className="quiz-passage">{item.passage}</p>

              <h3>{item.question}</h3>

              <div className="quiz-choices">
                {item.choices.map((choice, choiceIndex) => {
                  const isSelected = Number(answers[index]) === choiceIndex;
                  const isCorrect = checked && choiceIndex === item.answer;
                  const isWrong =
                    checked && isSelected && choiceIndex !== item.answer;

                  return (
                    <label
                      key={choice}
                      className={
                        isCorrect
                          ? "quiz-choice correct-choice"
                          : isWrong
                          ? "quiz-choice wrong-choice"
                          : "quiz-choice"
                      }
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={choiceIndex}
                        checked={isSelected}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [index]: choiceIndex,
                          }))
                        }
                      />
                      <span>{choice}</span>
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        {!checked ? (
          <button className="check-quiz-button" onClick={finishQuiz}>
            Check answers
          </button>
        ) : (
          <div className="quiz-result-box">
            <h2>
              Result: {score} / {activeLesson.questions.length}
            </h2>

            <button
              onClick={() => {
                onCompleteLesson(activeLesson.topic, activeLesson.title);
                setActiveLesson(null);
                setSelectedTopic(null);
              }}
            >
              Complete lesson
            </button>
          </div>
        )}
      </section>
    );
  }

  if (selectedTopic) {
    const topicLessons = lessons.filter(
      (lesson) => lesson.topic === selectedTopic
    );

    return (
      <section className="learn-page">
        <button className="learn-back" onClick={() => setSelectedTopic(null)}>
          ← Back
        </button>

        <h1>{selectedTopic}</h1>

        <div className="lesson-grid">
          {topicLessons.map((lesson) => (
            <article className="lesson-card" key={lesson.id}>
              <span>{lesson.section}</span>
              <h2>{lesson.title}</h2>
              <p>{lesson.description}</p>

              <div className="lesson-buttons">
                {lesson.questions ? (
                  <button onClick={() => startLesson(lesson)}>
                    Пройти урок
                  </button>
                ) : (
                  <button onClick={() => window.open(lesson.url, "_blank")}>
                    Open lesson
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="learn-telegram-box">
          <p>{t.askTelegram}</p>
          <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
            @mentoria_organization
          </a>

          <button onClick={() => window.open(COZE_BOT_LINK, "_blank")}>
            Open AI mentor bot
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="learn-page">
      <h1>LEARN</h1>

      <div className="learn-cloud">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={`learn-item learn-item-${topic.id.toLowerCase()}`}
            onClick={() => setSelectedTopic(topic.id)}
          >
            {topic.img ? (
              <img src={topic.img} alt={topic.id} />
            ) : (
              <span className="essay-bubble">ESSAY</span>
            )}
          </button>
        ))}

        <div className="learn-item learn-item-cat">
          <img src={ASSETS.cat} alt="Cat" />
        </div>
      </div>

      <p className="learn-note">
        {t.askTelegram}
        <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
          @mentoria_organization
        </a>
      </p>
    </section>
  );
}

function ProgressPage({ profile, leaderboard, lang }) {
  const currentUser = profile?.username || "you";

  const visibleLeaderboard =
    leaderboard.length > 0
      ? leaderboard
      : [
          {
            id: "demo",
            nickname: currentUser,
            ielts_lessons: profile?.ielts_lessons || 0,
            sat_lessons: profile?.sat_lessons || 0,
            essays: profile?.essays || 0,
          },
        ];

  const points = getUserPoints(profile);

  return (
    <section className="progress-page">
      <h1>PROGRESS</h1>

      <div className="progress-layout">
        <div className="pyramid-card">
          <div className="real-pyramid">
            <div className="pyramid-slice pyramid-top">
              <div>
                <b>TOP</b>
                <span>3 IELTS + 3 SAT + 2 essays</span>
              </div>
            </div>

            <div className="pyramid-slice pyramid-middle">
              <div>
                <b>MIDDLE</b>
                <span>2 IELTS + 2 SAT + 1 essay</span>
              </div>
            </div>

            <div className="pyramid-slice pyramid-bottom">
              <div>
                <b>START</b>
                <span>1 lesson completed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="leaderboard">
          <h2>BOARD</h2>

          <ol>
            {visibleLeaderboard.map((user) => (
              <li key={user.id}>
                <b>{user.nickname}</b>
                <span>
                  IELTS: {user.ielts_lessons} / SAT: {user.sat_lessons} /
                  Essays: {user.essays}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="progress-bottom-roadmap">
        <RoadmapStrip progressPoints={points} lang={lang} />
      </div>
    </section>
  );
}

function PartnershipPage() {
  const partners = [
    {
      name: "BAHANDI",
      image: "/assets/partners/bahandi.png",
      type: "Strategic Partner",
      text: "Организация Mentoria официально объявляет о начале стратегического партнерства с компанией BAHANDI. Это сотрудничество объединяет наши усилия для создания новых возможностей, направленных на поддержку молодых талантов и развитие инновационных проектов. Объединив экспертизу Mentoria в сфере менторства и сильные стороны BAHANDI, мы сможем предложить участникам наших мероприятий еще больше полезных ресурсов, качественной поддержки и уникального опыта. Мы уверены, что эта коллаборация станет началом больших позитивных изменений и поможет многим заявить о себе. Следите за обновлениями на официальных страницах, чтобы не пропустить совместные инициативы и проекты, которые мы готовим для вас уже сейчас!",
    },
    {
      name: "Startup Course",
      image: "/assets/partners/startup-course.png",
      type: "Education Partner",
      text: "Описание партнёрства скоро будет добавлено.",
    },
    {
      name: "Pink Coded",
      image: "/assets/partners/pink-coded.png",
      type: "Community Partner",
      text: "Описание партнёрства скоро будет добавлено.",
    },
  ];

  return (
    <section className="partnership-page">
      <h1>PARTNERSHIP</h1>

      <div className="partnership-hero">
        <p>
          Здесь собраны партнёры Mentoria — организации, образовательные проекты
          и сообщества, которые помогают создавать больше возможностей для
          школьников, студентов и молодых талантов.
        </p>
      </div>

      <div className="partners-grid">
        {partners.map((partner) => (
          <article className="partner-card" key={partner.name}>
            <div className="partner-logo-box">
              <img src={partner.image} alt={partner.name} />
            </div>

            <div className="partner-content">
              <span>{partner.type}</span>
              <h2>{partner.name}</h2>
              <p>{partner.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PartyPage({ profile, events, onRegistered }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <section className="party-page">
      <h1>PARTY</h1>

      <div className="party-intro">
        <p>
          Party — это раздел мероприятий Mentoria: хакатоны, квизы, MUN,
          конкурсы, командные задания и активности для портфолио.
        </p>
      </div>

      <p className="party-subtitle">YOU CAN PARTY FOR...</p>

      <div className="party-cards">
        {events.map((event) => (
          <article key={event.id || event.title} className="party-card">
            <h2>{event.title}</h2>
            <p className="party-date">{event.date}</p>

            <p>
              <b>Format:</b> {event.format}
            </p>

            <p>
              <b>For:</b> {event.forWho}
            </p>

            <p>
              <b>Portfolio:</b> {event.gives}
            </p>

            <p>
              <b>Rules:</b> {event.rules}
            </p>

            <span>Place: {event.place}</span>

            <button onClick={() => setSelectedEvent(event)}>Register</button>
          </article>
        ))}
      </div>

      {selectedEvent && (
        <EventRegistrationForm
          event={selectedEvent}
          profile={profile}
          onRegistered={onRegistered}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}

function EventRegistrationForm({ event, profile, onRegistered, onClose }) {
  async function submitEvent(eventSubmit) {
    eventSubmit.preventDefault();

    const formData = new FormData(eventSubmit.currentTarget);

    const payload = {
      profile_id: profile?.id,
      event_title: event.title,
      full_name: formData.get("full_name"),
      team_name: formData.get("team_name"),
      team_size: Number(formData.get("team_size")),
      phone: formData.get("phone"),
      created_at: new Date().toISOString(),
    };

    if (!payload.full_name || !payload.phone) {
      alert("Заполни имя и номер телефона");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("event_registrations")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      onRegistered(data);
      alert("Ты зарегистрировалась на " + event.title);
      onClose();
    } catch (error) {
      console.log("event registration error:", error);

      const localRegistration = {
        ...payload,
        id: makeLocalId(),
      };

      onRegistered(localRegistration);
      alert(
        "Supabase не подключился, но регистрация временно сохранена в браузере."
      );
      onClose();
    }
  }

  return (
    <div className="modal-backdrop">
      <form className="event-form" onSubmit={submitEvent}>
        <button type="button" className="close-modal" onClick={onClose}>
          ×
        </button>

        <h2>Register for {event.title}</h2>

        <label>
          Name
          <input name="full_name" placeholder="Your name" />
        </label>

        <label>
          Team name
          <input name="team_name" placeholder="Team name" />
        </label>

        <label>
          Team size
          <input name="team_size" type="number" min="1" placeholder="1" />
        </label>

        <label>
          Phone
          <input name="phone" placeholder="+7..." />
        </label>

        <button className="submit-event" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

function AdminPage({ onAddNews, onAddLesson, onAddEvent }) {
  function submitNews(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onAddNews({
      id: makeLocalId(),
      group: formData.get("group"),
      title: formData.get("title"),
      text: formData.get("text"),
      date: formData.get("date"),
      place: formData.get("place"),
      image: formData.get("image"),
      deadline: formData.get("deadline"),
      audience: formData.get("audience"),
      format: formData.get("format"),
      prize: formData.get("prize"),
    });

    event.currentTarget.reset();
    alert("News added");
  }

  function submitLesson(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onAddLesson({
      id: makeLocalId(),
      topic: formData.get("topic"),
      section: formData.get("section"),
      title: formData.get("title"),
      description: formData.get("description"),
      url: formData.get("url"),
    });

    event.currentTarget.reset();
    alert("Lesson added");
  }

  function submitParty(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onAddEvent({
      id: makeLocalId(),
      title: formData.get("title"),
      date: formData.get("date"),
      place: formData.get("place"),
      format: formData.get("format"),
      forWho: formData.get("forWho"),
      gives: formData.get("gives"),
      rules: formData.get("rules"),
    });

    event.currentTarget.reset();
    alert("Party event added");
  }

  return (
    <section className="admin-page">
      <h1>ADMIN</h1>

      <div className="admin-grid">
        <form className="admin-card" onSubmit={submitNews}>
          <h2>Add News</h2>

          <label>
            Column
            <select name="group">
              <option value="mentoria">Mentoria</option>
              <option value="myExtra">My Extra</option>
              <option value="jasam">Jasam</option>
            </select>
          </label>

          <input name="title" placeholder="Title" />
          <textarea name="text" placeholder="Text" />
          <input name="image" placeholder="/assets/news/example.png" />
          <input name="date" placeholder="Date" />
          <input name="deadline" placeholder="Deadline" />
          <input name="audience" placeholder="Audience" />
          <input name="format" placeholder="Format" />
          <input name="prize" placeholder="Prize" />
          <input name="place" placeholder="Place" />

          <button>Add news</button>
        </form>

        <form className="admin-card" onSubmit={submitLesson}>
          <h2>Add Lesson</h2>

          <label>
            Topic
            <select name="topic">
              <option value="SAT">SAT</option>
              <option value="IELTS">IELTS</option>
              <option value="Admission">Admission</option>
              <option value="Essay">Essay</option>
            </select>
          </label>

          <input name="section" placeholder="Section" />
          <input name="title" placeholder="Lesson title" />
          <textarea name="description" placeholder="Description" />
          <input name="url" placeholder="YouTube / site link" />

          <button>Add lesson</button>
        </form>

        <form className="admin-card" onSubmit={submitParty}>
          <h2>Add Party Event</h2>

          <input name="title" placeholder="Title" />
          <input name="date" placeholder="Date" />
          <input name="place" placeholder="Place" />
          <input name="format" placeholder="Format" />
          <input name="forWho" placeholder="For who" />
          <textarea name="gives" placeholder="What it gives" />
          <textarea name="rules" placeholder="Rules" />

          <button>Add event</button>
        </form>
      </div>
    </section>
  );
}

function FaqPage() {
  const questions = [
    {
      q: "Что такое Mentoria?",
      a: "Mentoria — это платформа, которая помогает школьникам готовиться к поступлению за рубеж: SAT, IELTS, Admission, прогресс, события и личный roadmap.",
    },
    {
      q: "Как начать путь?",
      a: "Нужно зарегистрироваться, заполнить username, password и телефон, после этого откроется личная главная страница.",
    },
    {
      q: "Где учиться SAT и IELTS?",
      a: "Во вкладке Learn будут материалы по SAT, IELTS и Admission. Сейчас кнопки открывают отдельные разделы уроков.",
    },
    {
      q: "Как работает Progress?",
      a: "Progress показывает пирамиду достижений и board с пользователями. После завершения уроков уровень пользователя повышается.",
    },
    {
      q: "Как зарегистрироваться на Hackathon, Quiz или MUN?",
      a: "Во вкладке Party нужно нажать на карточку события и заполнить форму регистрации.",
    },
  ];

  return (
    <section className="faq-page">
      <h1>FAQ</h1>

      <div className="faq-list">
        {questions.map((item) => (
          <FaqItem key={item.q} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <button onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <b>{open ? "−" : "+"}</b>
      </button>

      {open && <p>{answer}</p>}
    </div>
  );
}

export default App;