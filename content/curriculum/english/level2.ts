import type { LevelCurriculum } from "../types";

// New content authored for Phase 4 of the site restructuring plan. The
// original app/academy/level2/page.tsx only had a lesson-title list with
// no actual lesson/quiz pages behind it (every button was a dead link) —
// those 12 titles are reused here as the chapter plan, now with real
// lessons and quizzes written against the same engine as Level 1.
export const englishLevel2: LevelCurriculum = {
  langCode: "EN",
  langLabel: "Anglais",
  langSlug: "english",
  level: 2,
  levelTitle: "Level 2 - Intermediate English",
  levelSubtitle: "Build fluency with grammar, conversation, and real-world English.",

  lessons: [
    {
      id: 1,
      title: "Intermediate Grammar Review",
      subtitle: "Review sentence structure and the building blocks of a correct English sentence.",
      sections: [
        {
          heading: "Parts of a Sentence",
          body: [
            "Every sentence needs a subject and a verb.",
            "Subject = who or what the sentence is about.",
            "Verb = the action or state.",
            "Object = who or what receives the action.",
            "Example: Sarah (subject) reads (verb) a book (object).",
          ],
        },
        {
          heading: "Subject-Verb Agreement",
          body: [
            "A singular subject takes a singular verb.",
            "She works at a hospital.",
            "A plural subject takes a plural verb.",
            "They work at a hospital.",
            "I and you always use the plural form of the verb: I work, you work.",
          ],
        },
        {
          heading: "Common Mistakes",
          body: [
            "Wrong: He go to school every day.",
            "Correct: He goes to school every day.",
            "Wrong: The children plays outside.",
            "Correct: The children play outside.",
          ],
        },
      ],
      speakText: `Every sentence needs a subject and a verb.

Subject means who or what the sentence is about. Verb means the action or state. Object means who or what receives the action.

Example: Sarah reads a book.

Subject-verb agreement.

A singular subject takes a singular verb: She works at a hospital.

A plural subject takes a plural verb: They work at a hospital.

I and you always use the plural form of the verb.

Common mistakes.

Wrong: He go to school every day.
Correct: He goes to school every day.

Wrong: The children plays outside.
Correct: The children play outside.`,
      videoTopic: "Review sentence structure and subject-verb agreement with examples.",
      readingTitle: "My name is Grace.",
      reading: [
        "I am studying English at an intermediate level now.",
        "Every day, I practice building correct sentences.",
        "My teacher says a good sentence always has a clear subject and a matching verb.",
        "Last week, I made many mistakes, but this week I check my grammar carefully before I speak.",
        "I am proud of my progress.",
      ],
      readingSpeakText: `My name is Grace.

I am studying English at an intermediate level now.

Every day, I practice building correct sentences.

My teacher says a good sentence always has a clear subject and a matching verb.

Last week, I made many mistakes, but this week I check my grammar carefully before I speak.

I am proud of my progress.`,
      exercises: [
        "Identify the subject and verb in three sentences from a newspaper.",
        "Correct this sentence: The students is ready.",
        "Write two sentences using 'I' and two using 'she'.",
        "Explain why 'He go' is incorrect.",
      ],
      speakingTopic: "Explain in your own words what a subject and a verb are.",
    },
    {
      id: 2,
      title: "Past and Future Tenses",
      subtitle: "Learn to talk about things that already happened and things that will happen.",
      sections: [
        {
          heading: "Past Simple",
          body: [
            "Used for finished actions in the past.",
            "Regular verbs add -ed: I worked, she walked, we played.",
            "Irregular verbs change form: go → went, eat → ate, see → saw.",
            "Yesterday, I visited my grandmother.",
          ],
        },
        {
          heading: "Past Continuous",
          body: [
            "Used for an action in progress at a specific time in the past.",
            "Form: was/were + verb-ing.",
            "At 8 p.m. yesterday, I was studying English.",
            "While she was cooking, the phone rang.",
          ],
        },
        {
          heading: "Future with 'going to' and 'will'",
          body: [
            "'Going to' is used for plans already decided.",
            "I am going to visit Paris next year.",
            "'Will' is used for quick decisions or predictions.",
            "I think it will rain tomorrow.",
            "I will help you with your homework.",
          ],
        },
      ],
      speakText: `Past simple is used for finished actions in the past.

Regular verbs add e d: I worked, she walked, we played.

Irregular verbs change form: go becomes went, eat becomes ate, see becomes saw.

Yesterday, I visited my grandmother.

Past continuous is used for an action in progress at a specific time in the past.

At eight p.m. yesterday, I was studying English.

While she was cooking, the phone rang.

Future with going to and will.

Going to is used for plans already decided: I am going to visit Paris next year.

Will is used for quick decisions or predictions: I think it will rain tomorrow. I will help you with your homework.`,
      videoTopic: "Compare past simple, past continuous, and the two future forms.",
      readingTitle: "Last year, Thomas traveled to Lubumbashi for the first time.",
      reading: [
        "While he was waiting for the bus, he met an old friend from school.",
        "They talked for almost an hour and remembered their childhood together.",
        "Thomas said he is going to visit Lubumbashi again next summer.",
        "He also said he will invite his friend to come with him this time.",
      ],
      readingSpeakText: `Last year, Thomas traveled to Lubumbashi for the first time.

While he was waiting for the bus, he met an old friend from school.

They talked for almost an hour and remembered their childhood together.

Thomas said he is going to visit Lubumbashi again next summer.

He also said he will invite his friend to come with him this time.`,
      exercises: [
        "Write three sentences about what you did yesterday using the past simple.",
        "Write one sentence using the past continuous.",
        "Write one sentence about your plans for next year using 'going to'.",
        "Make a quick prediction about the weather using 'will'.",
      ],
      speakingTopic: "Talk about something you did last weekend and something you will do next weekend.",
    },
    {
      id: 3,
      title: "Conversation Practice",
      subtitle: "Practice asking questions and keeping a conversation going naturally.",
      sections: [
        {
          heading: "Question Forms",
          body: [
            "Yes/No questions: Do you like coffee? Is she a teacher?",
            "Wh-questions: What, Where, When, Who, Why, How.",
            "What do you do for work?",
            "Where are you from?",
            "How was your weekend?",
          ],
        },
        {
          heading: "Keeping a Conversation Going",
          body: [
            "Show interest: Really? That's interesting! Tell me more.",
            "Ask a follow-up question instead of just answering.",
            "A: I went to the market this morning. B: Oh nice, what did you buy?",
          ],
        },
        {
          heading: "Agreeing and Disagreeing Politely",
          body: [
            "I agree with you.",
            "That's a good point, but I think...",
            "I'm not sure I agree. In my opinion...",
            "You might be right, however...",
          ],
        },
      ],
      speakText: `Question forms.

Yes or no questions: Do you like coffee? Is she a teacher?

Wh questions use What, Where, When, Who, Why, How.

What do you do for work? Where are you from? How was your weekend?

Keeping a conversation going.

Show interest: Really? That's interesting! Tell me more.

Ask a follow up question instead of just answering.

Agreeing and disagreeing politely.

I agree with you.

That's a good point, but I think...

I'm not sure I agree. In my opinion...`,
      videoTopic: "Practice natural follow-up questions in a real conversation.",
      readingTitle: "Last Friday, Paul met a new colleague named Clara at work.",
      reading: [
        "He asked her, “Where are you from?” and she said she was from Goma.",
        "Paul then asked a follow-up question: “How long have you lived here?”",
        "Clara said she agreed that the city was very friendly, but she added that the traffic could be difficult.",
        "Paul said that was a good point, and they both laughed.",
      ],
      readingSpeakText: `Last Friday, Paul met a new colleague named Clara at work.

He asked her, where are you from? And she said she was from Goma.

Paul then asked a follow up question: how long have you lived here?

Clara said she agreed that the city was very friendly, but she added that the traffic could be difficult.

Paul said that was a good point, and they both laughed.`,
      exercises: [
        "Write three Wh-questions you could ask a new colleague.",
        "Practice a short dialogue where you agree, then politely disagree.",
        "Write a follow-up question for: 'I watched a movie last night.'",
        "Role-play introducing yourself and asking two questions.",
      ],
      speakingTopic: "Have a short conversation with a partner using at least two follow-up questions.",
    },
    {
      id: 4,
      title: "Writing Skills",
      subtitle: "Learn to organize ideas into clear paragraphs using connecting words.",
      sections: [
        {
          heading: "Paragraph Structure",
          body: [
            "A paragraph has one main idea.",
            "Topic sentence: introduces the main idea.",
            "Supporting sentences: give details and examples.",
            "Concluding sentence: closes the idea.",
          ],
        },
        {
          heading: "Connecting Words",
          body: [
            "Addition: and, also, in addition.",
            "Contrast: but, however, although.",
            "Cause and effect: because, so, therefore.",
            "Sequence: first, then, after that, finally.",
          ],
        },
        {
          heading: "Example Paragraph",
          body: [
            "I love learning English because it opens many opportunities. First, I can communicate with more people. Also, I can understand movies and songs better. However, learning a new language takes time and patience. Therefore, I practice every single day.",
          ],
        },
      ],
      speakText: `A paragraph has one main idea.

Topic sentence introduces the main idea. Supporting sentences give details and examples. Concluding sentence closes the idea.

Connecting words.

Addition: and, also, in addition.
Contrast: but, however, although.
Cause and effect: because, so, therefore.
Sequence: first, then, after that, finally.

Example paragraph.

I love learning English because it opens many opportunities. First, I can communicate with more people. Also, I can understand movies and songs better. However, learning a new language takes time and patience. Therefore, I practice every single day.`,
      videoTopic: "See how connecting words link ideas together in a paragraph.",
      readingTitle: "Why I Enjoy Reading",
      reading: [
        "I enjoy reading because it helps me relax after a long day.",
        "First, I choose a quiet place in my house.",
        "Then, I read for about thirty minutes.",
        "Although I sometimes fall asleep, I always learn something new.",
        "Therefore, reading has become one of my favorite habits.",
      ],
      readingSpeakText: `Why I enjoy reading.

I enjoy reading because it helps me relax after a long day.

First, I choose a quiet place in my house. Then, I read for about thirty minutes.

Although I sometimes fall asleep, I always learn something new.

Therefore, reading has become one of my favorite habits.`,
      exercises: [
        "Write a topic sentence about your favorite hobby.",
        "Add two supporting sentences with details.",
        "Use 'because' and 'however' in two different sentences.",
        "Write a short paragraph (4-5 sentences) about your typical day.",
      ],
      speakingTopic: "Describe your favorite hobby using a clear topic sentence and supporting details.",
    },
    {
      id: 5,
      title: "Listening Skills",
      subtitle: "Learn strategies to understand spoken English more easily.",
      sections: [
        {
          heading: "Listening Strategies",
          body: [
            "Listen for key words, not every single word.",
            "Pay attention to the main topic first.",
            "Use context to guess the meaning of new words.",
            "It's okay to ask someone to repeat: 'Could you say that again, please?'",
          ],
        },
        {
          heading: "Useful Phrases for Listening",
          body: [
            "I didn't catch that.",
            "Could you speak more slowly, please?",
            "Sorry, what did you say?",
            "So, if I understand correctly, you mean...",
          ],
        },
        {
          heading: "Following Directions",
          body: [
            "Turn left / Turn right.",
            "Go straight ahead.",
            "It's on your left / right.",
            "Take the second street on the right.",
          ],
        },
      ],
      speakText: `Listening strategies.

Listen for key words, not every single word. Pay attention to the main topic first. Use context to guess the meaning of new words.

It's okay to ask someone to repeat: could you say that again, please?

Useful phrases for listening.

I didn't catch that. Could you speak more slowly, please? Sorry, what did you say? So, if I understand correctly, you mean...

Following directions.

Turn left. Turn right. Go straight ahead. It's on your left. Take the second street on the right.`,
      videoTopic: "Practice following spoken directions around a town.",
      readingTitle: "Marie asked a stranger for directions to the post office.",
      reading: [
        "The man said, “Go straight ahead, then turn left at the market.”",
        "Marie did not understand everything, so she said, “Sorry, could you say that again, please?”",
        "The man repeated slowly: “Go straight, turn left at the market, and the post office is on your right.”",
        "Marie thanked him and found the post office easily.",
      ],
      readingSpeakText: `Marie asked a stranger for directions to the post office.

The man said, go straight ahead, then turn left at the market.

Marie did not understand everything, so she said, sorry, could you say that again, please?

The man repeated slowly: go straight, turn left at the market, and the post office is on your right.

Marie thanked him and found the post office easily.`,
      exercises: [
        "Write three phrases you can use when you don't understand someone.",
        "Give directions from your house to the nearest market.",
        "Practice listening to someone speak and summarizing what they said.",
        "Write what 'if I understand correctly' is used for.",
      ],
      speakingTopic: "Give a partner directions from the school to your home.",
    },
    {
      id: 6,
      title: "Reading Comprehension",
      subtitle: "Learn techniques to understand longer texts more effectively.",
      sections: [
        {
          heading: "Skimming and Scanning",
          body: [
            "Skimming: reading quickly to understand the general idea.",
            "Scanning: looking quickly for specific information, like a date or a name.",
            "Read the title and first sentence of each paragraph before reading in detail.",
          ],
        },
        {
          heading: "Using Context Clues",
          body: [
            "You don't need to understand every word to understand a text.",
            "Use the words around an unknown word to guess its meaning.",
            "Example: 'The weather was frigid, so everyone wore heavy coats.' Frigid probably means very cold.",
          ],
        },
      ],
      speakText: `Skimming means reading quickly to understand the general idea.

Scanning means looking quickly for specific information, like a date or a name.

Read the title and first sentence of each paragraph before reading in detail.

Using context clues.

You don't need to understand every word to understand a text. Use the words around an unknown word to guess its meaning.

Example: the weather was frigid, so everyone wore heavy coats. Frigid probably means very cold.`,
      videoTopic: "Practice skimming a short article to find its main idea.",
      readingTitle: "The Market of Kolwezi",
      reading: [
        "Every Saturday, hundreds of people gather at the central market of Kolwezi.",
        "Vendors sell everything from fresh vegetables to handmade clothes.",
        "The atmosphere is lively, with music playing and vendors calling out their prices.",
        "Many families come early in the morning before it becomes too crowded.",
        "By midday, the market is full of color, noise, and the smell of fresh food.",
      ],
      readingSpeakText: `The market of Kolwezi.

Every Saturday, hundreds of people gather at the central market of Kolwezi.

Vendors sell everything from fresh vegetables to handmade clothes.

The atmosphere is lively, with music playing and vendors calling out their prices.

Many families come early in the morning before it becomes too crowded.

By midday, the market is full of color, noise, and the smell of fresh food.`,
      exercises: [
        "Skim the reading text in 10 seconds and say what it is about.",
        "Scan the text and find what day the market happens.",
        "Guess the meaning of 'lively' from the context.",
        "Write two sentences describing a market you know.",
      ],
      speakingTopic: "Describe a market or busy place you have visited.",
    },
    {
      id: 7,
      title: "Vocabulary Expansion",
      subtitle: "Grow your vocabulary with synonyms, antonyms, and word families.",
      sections: [
        {
          heading: "Synonyms (similar meaning)",
          body: ["Happy = glad, joyful", "Big = large, huge", "Smart = intelligent, clever", "Fast = quick, rapid"],
        },
        {
          heading: "Antonyms (opposite meaning)",
          body: ["Hot ↔ Cold", "Easy ↔ Difficult", "Early ↔ Late", "Begin ↔ End"],
        },
        {
          heading: "Word Families",
          body: [
            "Succeed (verb) → success (noun) → successful (adjective) → successfully (adverb).",
            "Decide (verb) → decision (noun) → decisive (adjective).",
          ],
        },
        {
          heading: "Collocations (words that go together)",
          body: ["Make a decision (not 'do a decision')", "Take a photo", "Do homework", "Have breakfast"],
        },
      ],
      speakText: `Synonyms, words with similar meaning.

Happy means glad or joyful. Big means large or huge. Smart means intelligent or clever. Fast means quick or rapid.

Antonyms, words with opposite meaning.

Hot and cold. Easy and difficult. Early and late. Begin and end.

Word families.

Succeed, success, successful, successfully.

Decide, decision, decisive.

Collocations are words that go together.

Make a decision. Take a photo. Do homework. Have breakfast.`,
      videoTopic: "Build vocabulary through synonyms, antonyms, and common word pairs.",
      readingTitle: "Building a Bigger Vocabulary",
      reading: [
        "Learning new words every day is one of the best ways to improve your English quickly.",
        "Instead of memorizing single words, try to learn them in groups, such as synonyms or word families.",
        "For example, if you learn 'decide', also learn 'decision' and 'decisive'.",
        "This way, one new word actually teaches you three or four.",
      ],
      readingSpeakText: `Building a bigger vocabulary.

Learning new words every day is one of the best ways to improve your English quickly.

Instead of memorizing single words, try to learn them in groups, such as synonyms or word families.

For example, if you learn decide, also learn decision and decisive.

This way, one new word actually teaches you three or four.`,
      exercises: [
        "Find a synonym for 'happy' and 'fast'.",
        "Find an antonym for 'begin' and 'easy'.",
        "Write the noun and adjective forms of 'succeed'.",
        "Use 'make a decision' and 'take a photo' in two sentences.",
      ],
      speakingTopic: "Describe your day using at least three new vocabulary words from this lesson.",
    },
    {
      id: 8,
      title: "Pronunciation Mastery",
      subtitle: "Improve stress, intonation, and commonly confused sounds.",
      sections: [
        {
          heading: "Word Stress",
          body: [
            "English words have one stressed (louder) syllable.",
            "PHOtograph, phoTOgrapher, photoGRAPHic — the stress moves!",
            "Stressing the wrong syllable can confuse the listener.",
          ],
        },
        {
          heading: "Intonation",
          body: [
            "Yes/No questions usually rise at the end: Are you coming? ↗",
            "Wh-questions usually fall at the end: Where are you going? ↘",
            "Rising intonation can show surprise or a question; falling intonation sounds more certain.",
          ],
        },
        {
          heading: "Commonly Confused Sounds",
          body: [
            "/i/ vs /iː/: ship vs sheep.",
            "/ð/ vs /d/: this vs dis (th is a soft sound, tongue between the teeth).",
            "/r/ vs /l/: right vs light.",
          ],
        },
      ],
      speakText: `Word stress.

English words have one stressed, louder, syllable.

Photograph, photographer, photographic. The stress moves!

Stressing the wrong syllable can confuse the listener.

Intonation.

Yes or no questions usually rise at the end: are you coming?

Wh questions usually fall at the end: where are you going?

Commonly confused sounds.

Ship versus sheep. This versus dis. Right versus light.`,
      videoTopic: "Hear the difference between rising and falling intonation.",
      readingTitle: "Why Pronunciation Matters",
      reading: [
        "Good grammar is important, but clear pronunciation helps people understand you immediately.",
        "Many learners focus only on individual sounds and forget about word stress.",
        "A word with the wrong stress can sound like a completely different word.",
        "Practicing a little every day, even five minutes, makes a big difference over time.",
      ],
      readingSpeakText: `Why pronunciation matters.

Good grammar is important, but clear pronunciation helps people understand you immediately.

Many learners focus only on individual sounds and forget about word stress.

A word with the wrong stress can sound like a completely different word.

Practicing a little every day, even five minutes, makes a big difference over time.`,
      exercises: [
        "Practice saying 'photograph', 'photographer', and 'photographic' aloud.",
        "Say a Yes/No question with rising intonation.",
        "Say a Wh-question with falling intonation.",
        "Practice the words 'ship/sheep' and 'right/light' aloud.",
      ],
      speakingTopic: "Read the reading text aloud, paying attention to word stress.",
    },
    {
      id: 9,
      title: "Situational English",
      subtitle: "Learn useful phrases for everyday real-life situations.",
      sections: [
        {
          heading: "At a Restaurant",
          body: [
            "Could I see the menu, please?",
            "I'd like the chicken, please.",
            "Could we have the bill, please?",
            "Is service included?",
          ],
        },
        {
          heading: "At the Airport",
          body: [
            "Where is the check-in counter?",
            "I'd like a window seat, please.",
            "What time does the flight board?",
            "Where is the baggage claim?",
          ],
        },
        {
          heading: "At a Job Interview",
          body: [
            "Tell me about yourself.",
            "What are your strengths?",
            "Why do you want to work here?",
            "I am a hard-working and reliable person.",
          ],
        },
      ],
      speakText: `At a restaurant.

Could I see the menu, please? I'd like the chicken, please. Could we have the bill, please? Is service included?

At the airport.

Where is the check-in counter? I'd like a window seat, please. What time does the flight board? Where is the baggage claim?

At a job interview.

Tell me about yourself. What are your strengths? Why do you want to work here? I am a hard-working and reliable person.`,
      videoTopic: "Practice real dialogues at a restaurant, airport, and job interview.",
      readingTitle: "Anna's Job Interview",
      reading: [
        "Anna arrived early for her job interview and greeted the manager politely.",
        "When the manager asked, “Tell me about yourself”, Anna spoke confidently about her studies and experience.",
        "She explained that her main strength was being hard-working and reliable.",
        "At the end, Anna asked a question of her own: “What does a typical day look like in this role?”",
        "The manager was impressed by her preparation.",
      ],
      readingSpeakText: `Anna's job interview.

Anna arrived early for her job interview and greeted the manager politely.

When the manager asked, tell me about yourself, Anna spoke confidently about her studies and experience.

She explained that her main strength was being hard working and reliable.

At the end, Anna asked a question of her own: what does a typical day look like in this role?

The manager was impressed by her preparation.`,
      exercises: [
        "Write a short restaurant dialogue ordering food.",
        "Write two questions you could ask at an airport check-in counter.",
        "Answer the interview question 'What are your strengths?' about yourself.",
        "Practice the full interview dialogue aloud with a partner.",
      ],
      speakingTopic: "Role-play a job interview with a partner, asking and answering common questions.",
    },
    {
      id: 10,
      title: "Business English Basics",
      subtitle: "Learn professional vocabulary for emails and meetings.",
      sections: [
        {
          heading: "Writing a Professional Email",
          body: [
            "Dear Mr. Kasongo, (greeting)",
            "I am writing to inquire about... (purpose)",
            "Please let me know if you need further information. (closing)",
            "Best regards, (sign-off)",
          ],
        },
        {
          heading: "Useful Meeting Phrases",
          body: [
            "Let's get started.",
            "Could you clarify that point?",
            "I'd like to add something.",
            "Let's move on to the next item.",
            "To summarize, we agreed that...",
          ],
        },
        {
          heading: "Professional Vocabulary",
          body: ["Deadline: the date something must be finished.", "Colleague: a person you work with.", "Client: a customer or company you provide a service to.", "Report: a written summary of information."],
        },
      ],
      speakText: `Writing a professional email.

Dear Mr. Kasongo. I am writing to inquire about... Please let me know if you need further information. Best regards.

Useful meeting phrases.

Let's get started. Could you clarify that point? I'd like to add something. Let's move on to the next item. To summarize, we agreed that...

Professional vocabulary.

Deadline means the date something must be finished. Colleague means a person you work with. Client means a customer or company you provide a service to. Report means a written summary of information.`,
      videoTopic: "See how a professional email and a meeting conversation are structured.",
      readingTitle: "David's First Week at a New Job",
      reading: [
        "During his first meeting, David heard his manager say, “Let's get started.”",
        "He listened carefully and, when he didn't understand a point, he said, “Could you clarify that, please?”",
        "Later that day, David wrote his first professional email to a client, starting with “Dear Mrs. Tshisekedi” and ending with “Best regards.”",
        "His colleague told him the email was clear and well written.",
      ],
      readingSpeakText: `David's first week at a new job.

During his first meeting, David heard his manager say, let's get started.

He listened carefully and, when he didn't understand a point, he said, could you clarify that, please?

Later that day, David wrote his first professional email to a client, starting with Dear Mrs. Tshisekedi and ending with Best regards.

His colleague told him the email was clear and well written.`,
      exercises: [
        "Write a short professional email asking about a job opening.",
        "Write two phrases you could use to speak up in a meeting.",
        "Use 'deadline', 'colleague', and 'client' each in one sentence.",
        "Practice saying 'Could you clarify that point?' aloud.",
      ],
      speakingTopic: "Explain what makes an email sound professional.",
    },
    {
      id: 11,
      title: "Debates and Arguments",
      subtitle: "Learn to express and defend your opinion respectfully.",
      sections: [
        {
          heading: "Giving Your Opinion",
          body: [
            "In my opinion, ...",
            "I personally believe that ...",
            "From my point of view, ...",
            "As far as I'm concerned, ...",
          ],
        },
        {
          heading: "Agreeing and Disagreeing Formally",
          body: [
            "I completely agree with that point.",
            "I see your point, but I have a different view.",
            "I'm afraid I have to disagree.",
            "That's true, however, we should also consider...",
          ],
        },
        {
          heading: "Supporting an Argument",
          body: [
            "For example, ...",
            "This is supported by the fact that ...",
            "Research shows that ...",
            "In conclusion, I believe that ...",
          ],
        },
      ],
      speakText: `Giving your opinion.

In my opinion... I personally believe that... From my point of view... As far as I'm concerned...

Agreeing and disagreeing formally.

I completely agree with that point. I see your point, but I have a different view. I'm afraid I have to disagree. That's true, however, we should also consider...

Supporting an argument.

For example... This is supported by the fact that... Research shows that... In conclusion, I believe that...`,
      videoTopic: "Watch a short, respectful debate using opinion and argument phrases.",
      readingTitle: "A Classroom Debate",
      reading: [
        "In class, the students debated whether phones should be allowed in school.",
        "Joseph said, “In my opinion, phones help us learn because we can look up information quickly.”",
        "Grace replied, “I see your point, but I have a different view. Phones can be very distracting during lessons.”",
        "The teacher said both arguments were well supported and encouraged the class to keep discussing respectfully.",
      ],
      readingSpeakText: `A classroom debate.

In class, the students debated whether phones should be allowed in school.

Joseph said, in my opinion, phones help us learn because we can look up information quickly.

Grace replied, I see your point, but I have a different view. Phones can be very distracting during lessons.

The teacher said both arguments were well supported and encouraged the class to keep discussing respectfully.`,
      exercises: [
        "Give your opinion about studying English using 'In my opinion...'.",
        "Practice disagreeing politely with a partner's opinion.",
        "Write one argument supported by 'For example...'.",
        "Write a short conclusion using 'In conclusion, I believe that...'.",
      ],
      speakingTopic: "Debate a simple topic (such as city life vs. village life) with a partner.",
    },
    {
      id: 12,
      title: "Final Review and Real-Life Conversation",
      subtitle: "Review everything learned in Level 2 and practice a longer real-life conversation.",
      sections: [
        {
          heading: "Important Things We Learned",
          body: [
            "Reviewing sentence structure and subject-verb agreement",
            "Using past and future tenses correctly",
            "Keeping a conversation going with follow-up questions",
            "Writing organized paragraphs with connecting words",
            "Listening strategies and asking for clarification",
            "Skimming and scanning for reading comprehension",
            "Expanding vocabulary with synonyms and word families",
            "Improving pronunciation, stress, and intonation",
            "Using English in restaurants, airports, and interviews",
            "Writing professional emails and speaking in meetings",
            "Giving opinions and debating respectfully",
          ],
        },
        {
          heading: "Example Real-Life Conversation",
          body: [
            "A: Hi, I heard you started a new job. How is it going?",
            "B: It's going well, thank you! I was nervous at first, but my colleagues are very friendly.",
            "A: That's great to hear. What do you do exactly?",
            "B: I write reports and answer client emails. It's challenging, but I'm learning a lot.",
            "A: In my opinion, that's a very useful skill to have.",
            "B: I agree. I will keep improving my English for work too.",
          ],
        },
      ],
      speakText: `Important things we learned in Level 2 include reviewing sentence structure, using past and future tenses, keeping conversations going, writing organized paragraphs, listening strategies, reading comprehension, vocabulary expansion, pronunciation, situational English, business English, and debating respectfully.

Example real life conversation.

Hi, I heard you started a new job. How is it going?
It's going well, thank you! I was nervous at first, but my colleagues are very friendly.
That's great to hear. What do you do exactly?
I write reports and answer client emails. It's challenging, but I'm learning a lot.
In my opinion, that's a very useful skill to have.
I agree. I will keep improving my English for work too.`,
      videoTopic: "Review all Level 2 topics through one extended conversation.",
      readingTitle: "One Year of Progress",
      reading: [
        "A year ago, Patrick could barely introduce himself in English.",
        "After finishing Level 1 and Level 2, he can now hold a full conversation about his job, his opinions, and his daily life.",
        "He writes professional emails at work and feels confident in meetings.",
        "Patrick says the key to his progress was practicing a little every single day.",
        "He is now excited to start Level 3 and continue improving.",
      ],
      readingSpeakText: `One year of progress.

A year ago, Patrick could barely introduce himself in English.

After finishing Level 1 and Level 2, he can now hold a full conversation about his job, his opinions, and his daily life.

He writes professional emails at work and feels confident in meetings.

Patrick says the key to his progress was practicing a little every single day.

He is now excited to start Level 3 and continue improving.`,
      exercises: [
        "Introduce yourself using at least two Level 2 grammar points.",
        "Write a short paragraph about your progress learning English.",
        "Practice the example conversation aloud with a partner.",
        "Give your opinion about the usefulness of learning English for work.",
      ],
      speakingTopic: "Have a full conversation about your studies, your opinions, and your future plans.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Quiz 1",
      subtitle: "Intermediate Grammar Review",
      passingScore: 7,
      questions: [
        { question: "What does every sentence need?", options: ["A subject and a verb", "Only an adjective", "Only a question mark"], answer: "A subject and a verb" },
        { question: "In 'Sarah reads a book', what is the object?", options: ["Sarah", "reads", "a book"], answer: "a book" },
        { question: "Choose the correct sentence.", options: ["He go to school", "He goes to school", "He going school"], answer: "He goes to school" },
        { question: "Choose the correct sentence.", options: ["The children plays outside", "The children play outside", "The children playing outside"], answer: "The children play outside" },
        { question: "Which verb form matches 'I' and 'you'?", options: ["The singular form", "The plural form", "No verb is needed"], answer: "The plural form" },
        { question: "What is Grace studying?", options: ["English at an intermediate level", "Mathematics", "History"], answer: "English at an intermediate level" },
        { question: "What does Grace do every day?", options: ["She practices building correct sentences", "She sleeps all day", "She avoids grammar"], answer: "She practices building correct sentences" },
        { question: "What does Grace's teacher say a good sentence needs?", options: ["A clear subject and a matching verb", "Only long words", "No punctuation"], answer: "A clear subject and a matching verb" },
        { question: "How does Grace feel about her progress?", options: ["Proud", "Angry", "Bored"], answer: "Proud" },
        { question: "What changed between last week and this week for Grace?", options: ["She stopped studying", "She now checks her grammar carefully", "She moved to another school"], answer: "She now checks her grammar carefully" },
      ],
    },
    {
      lessonId: 2,
      title: "Quiz 2",
      subtitle: "Past and Future Tenses",
      passingScore: 7,
      questions: [
        { question: "Which tense describes a finished action in the past?", options: ["Past simple", "Future simple", "Present continuous"], answer: "Past simple" },
        { question: "What is the past simple form of 'go'?", options: ["goed", "went", "going"], answer: "went" },
        { question: "Which sentence uses the past continuous correctly?", options: ["I was studying at 8 p.m.", "I study at 8 p.m. yesterday", "I will studying at 8 p.m."], answer: "I was studying at 8 p.m." },
        { question: "Which form do we use for a plan already decided?", options: ["going to", "did", "was"], answer: "going to" },
        { question: "Which form do we use for a quick decision or prediction?", options: ["will", "went", "was going"], answer: "will" },
        { question: "Where did Thomas travel last year?", options: ["Lubumbashi", "Paris", "Kinshasa"], answer: "Lubumbashi" },
        { question: "Who did Thomas meet while waiting for the bus?", options: ["A stranger", "An old friend from school", "His teacher"], answer: "An old friend from school" },
        { question: "What are Thomas and his friend going to do next summer?", options: ["Visit Lubumbashi again", "Move to another city", "Stop being friends"], answer: "Visit Lubumbashi again" },
        { question: "Which sentence is correct for a future plan?", options: ["I am going to visit Paris next year", "I go visit Paris next year", "I visited Paris next year"], answer: "I am going to visit Paris next year" },
        { question: "Which sentence correctly uses 'will' for a prediction?", options: ["I think it will rain tomorrow", "I think it raining tomorrow", "I think it rained tomorrow"], answer: "I think it will rain tomorrow" },
      ],
    },
    {
      lessonId: 3,
      title: "Quiz 3",
      subtitle: "Conversation Practice",
      passingScore: 7,
      questions: [
        { question: "Which is a Yes/No question?", options: ["Do you like coffee?", "What do you do?", "Where are you from?"], answer: "Do you like coffee?" },
        { question: "Which is a Wh-question?", options: ["Is she a teacher?", "Where are you from?", "Do you agree?"], answer: "Where are you from?" },
        { question: "What is a good way to keep a conversation going?", options: ["Ask a follow-up question", "Stay silent", "Change the subject immediately"], answer: "Ask a follow-up question" },
        { question: "Which phrase politely disagrees?", options: ["I'm not sure I agree", "I agree completely", "That's exactly right"], answer: "I'm not sure I agree" },
        { question: "Which phrase shows interest in a conversation?", options: ["Tell me more", "I don't care", "Stop talking"], answer: "Tell me more" },
        { question: "Who did Paul meet at work?", options: ["Clara", "Grace", "Anna"], answer: "Clara" },
        { question: "Where is Clara from?", options: ["Goma", "Kinshasa", "Lubumbashi"], answer: "Goma" },
        { question: "What follow-up question did Paul ask?", options: ["How long have you lived here?", "What is your name?", "Do you like coffee?"], answer: "How long have you lived here?" },
        { question: "What did Clara say about the city?", options: ["It was friendly but the traffic could be difficult", "It was boring", "She hated it"], answer: "It was friendly but the traffic could be difficult" },
        { question: "How did Paul respond to Clara's comment about traffic?", options: ["He said that was a good point", "He disagreed angrily", "He left the conversation"], answer: "He said that was a good point" },
      ],
    },
    {
      lessonId: 4,
      title: "Quiz 4",
      subtitle: "Writing Skills",
      passingScore: 7,
      questions: [
        { question: "What does a topic sentence do?", options: ["Introduces the main idea", "Ends the paragraph", "Lists random facts"], answer: "Introduces the main idea" },
        { question: "Which word shows contrast?", options: ["however", "also", "first"], answer: "however" },
        { question: "Which word shows cause and effect?", options: ["because", "and", "then"], answer: "because" },
        { question: "Which word shows sequence?", options: ["first", "but", "although"], answer: "first" },
        { question: "What does a concluding sentence do?", options: ["Closes the idea", "Starts the paragraph", "Asks a question"], answer: "Closes the idea" },
        { question: "Why does the writer enjoy reading?", options: ["It helps her relax after a long day", "It makes her tired", "She has no other hobby"], answer: "It helps her relax after a long day" },
        { question: "How long does she usually read?", options: ["About thirty minutes", "Two hours", "Five minutes"], answer: "About thirty minutes" },
        { question: "What connecting word is used before 'she sometimes falls asleep'?", options: ["Although", "Because", "First"], answer: "Although" },
        { question: "What has reading become for her?", options: ["One of her favorite habits", "A waste of time", "Her job"], answer: "One of her favorite habits" },
        { question: "Which sentence correctly uses 'therefore'?", options: ["I practice every day, therefore I am improving", "Therefore I like, apples", "I therefore am a student"], answer: "I practice every day, therefore I am improving" },
      ],
    },
    {
      lessonId: 5,
      title: "Quiz 5",
      subtitle: "Listening Skills",
      passingScore: 7,
      questions: [
        { question: "What should you listen for first?", options: ["Key words and the main topic", "Every single word", "Only the last word"], answer: "Key words and the main topic" },
        { question: "What can you do if you don't understand?", options: ["Ask the person to repeat", "Pretend you understood", "Walk away"], answer: "Ask the person to repeat" },
        { question: "Which phrase asks someone to slow down?", options: ["Could you speak more slowly, please?", "Stop talking", "I know everything"], answer: "Could you speak more slowly, please?" },
        { question: "Which phrase checks your understanding?", options: ["So, if I understand correctly, you mean...", "I don't care what you mean", "Never mind"], answer: "So, if I understand correctly, you mean..." },
        { question: "Which phrase gives a direction?", options: ["Turn left", "I agree", "Nice to meet you"], answer: "Turn left" },
        { question: "What did Marie ask the stranger for?", options: ["Directions to the post office", "The time", "Money"], answer: "Directions to the post office" },
        { question: "What did Marie say when she didn't understand?", options: ["Sorry, could you say that again, please?", "I don't want to know", "Goodbye"], answer: "Sorry, could you say that again, please?" },
        { question: "Where is the post office according to the man?", options: ["On the right, after turning left at the market", "Behind the school", "Next to Marie's house"], answer: "On the right, after turning left at the market" },
        { question: "How did the man respond to Marie's request?", options: ["He repeated the directions slowly", "He refused to help", "He walked away"], answer: "He repeated the directions slowly" },
        { question: "What did Marie do after getting directions?", options: ["She found the post office easily", "She got lost", "She went home instead"], answer: "She found the post office easily" },
      ],
    },
    {
      lessonId: 6,
      title: "Quiz 6",
      subtitle: "Reading Comprehension",
      passingScore: 7,
      questions: [
        { question: "What is skimming?", options: ["Reading quickly for the general idea", "Reading every word slowly", "Not reading at all"], answer: "Reading quickly for the general idea" },
        { question: "What is scanning?", options: ["Looking quickly for specific information", "Memorizing a text", "Translating a text"], answer: "Looking quickly for specific information" },
        { question: "What can help you guess an unknown word's meaning?", options: ["Context clues", "A random guess with no text", "Ignoring the sentence"], answer: "Context clues" },
        { question: "In 'the weather was frigid, so everyone wore heavy coats', what does frigid likely mean?", options: ["Very cold", "Very hot", "Very colorful"], answer: "Very cold" },
        { question: "What should you read first to find the main idea quickly?", options: ["The title and first sentence of each paragraph", "Only the last word", "The page number"], answer: "The title and first sentence of each paragraph" },
        { question: "Where does the market take place?", options: ["Kolwezi", "Goma", "Lubumbashi"], answer: "Kolwezi" },
        { question: "On which day does the market happen?", options: ["Saturday", "Monday", "Sunday"], answer: "Saturday" },
        { question: "What do vendors sell at the market?", options: ["Vegetables and handmade clothes", "Only shoes", "Only books"], answer: "Vegetables and handmade clothes" },
        { question: "What is the atmosphere like at the market?", options: ["Lively, with music and calling vendors", "Silent and empty", "Dangerous"], answer: "Lively, with music and calling vendors" },
        { question: "When do many families come to the market?", options: ["Early in the morning", "Late at night", "Never"], answer: "Early in the morning" },
      ],
    },
    {
      lessonId: 7,
      title: "Quiz 7",
      subtitle: "Vocabulary Expansion",
      passingScore: 7,
      questions: [
        { question: "Which word is a synonym for 'happy'?", options: ["glad", "cold", "slow"], answer: "glad" },
        { question: "Which word is an antonym for 'easy'?", options: ["difficult", "simple", "quick"], answer: "difficult" },
        { question: "What is the noun form of 'succeed'?", options: ["success", "successfully", "succeeding"], answer: "success" },
        { question: "Which is the correct collocation?", options: ["make a decision", "do a decision", "take a decision"], answer: "make a decision" },
        { question: "Which is the correct collocation?", options: ["do homework", "make homework", "take homework"], answer: "do homework" },
        { question: "Why should you learn words in groups?", options: ["One new word teaches you three or four", "It is faster to forget them", "It is required by law"], answer: "One new word teaches you three or four" },
        { question: "What is an example of a word family given in the text?", options: ["decide, decision, decisive", "red, blue, green", "one, two, three"], answer: "decide, decision, decisive" },
        { question: "What is the fastest way to improve vocabulary according to the text?", options: ["Learning new words every day", "Never reviewing old words", "Avoiding new words"], answer: "Learning new words every day" },
        { question: "Which word is a synonym for 'big'?", options: ["huge", "tiny", "late"], answer: "huge" },
        { question: "Which word is an antonym for 'begin'?", options: ["end", "start", "open"], answer: "end" },
      ],
    },
    {
      lessonId: 8,
      title: "Quiz 8",
      subtitle: "Pronunciation Mastery",
      passingScore: 7,
      questions: [
        { question: "What is word stress?", options: ["The syllable said louder in a word", "A type of punctuation", "A grammar rule"], answer: "The syllable said louder in a word" },
        { question: "What usually happens to intonation in a Yes/No question?", options: ["It rises at the end", "It always falls", "It stays flat"], answer: "It rises at the end" },
        { question: "What usually happens to intonation in a Wh-question?", options: ["It falls at the end", "It rises sharply", "It disappears"], answer: "It falls at the end" },
        { question: "Which pair of words are commonly confused sounds?", options: ["ship / sheep", "cat / dog", "happy / sad"], answer: "ship / sheep" },
        { question: "What can happen if you stress the wrong syllable?", options: ["It can confuse the listener", "Nothing changes", "The word becomes a different language"], answer: "It can confuse the listener" },
        { question: "According to the text, what is also very important besides grammar?", options: ["Clear pronunciation", "Spelling only", "Vocabulary size only"], answer: "Clear pronunciation" },
        { question: "What do many learners forget about?", options: ["Word stress", "Verb tenses", "Punctuation"], answer: "Word stress" },
        { question: "What can a wrong stress make a word sound like?", options: ["A completely different word", "A louder word", "A shorter word"], answer: "A completely different word" },
        { question: "How much daily practice does the text suggest can help?", options: ["Even five minutes", "Five hours", "No practice at all"], answer: "Even five minutes" },
        { question: "Which pair shows a sound difference between 'r' and 'l'?", options: ["right / light", "ship / sheep", "this / dis"], answer: "right / light" },
      ],
    },
    {
      lessonId: 9,
      title: "Quiz 9",
      subtitle: "Situational English",
      passingScore: 7,
      questions: [
        { question: "Which phrase is used at a restaurant?", options: ["Could I see the menu, please?", "Where is the check-in counter?", "Tell me about yourself"], answer: "Could I see the menu, please?" },
        { question: "Which phrase is used at an airport?", options: ["I'd like a window seat, please", "Could we have the bill, please?", "What are your strengths?"], answer: "I'd like a window seat, please" },
        { question: "Which phrase is common in a job interview?", options: ["Tell me about yourself", "Is service included?", "Where is the baggage claim?"], answer: "Tell me about yourself" },
        { question: "What does Anna do at the start of her interview?", options: ["She greets the manager politely", "She arrives late", "She refuses to answer questions"], answer: "She greets the manager politely" },
        { question: "What does Anna say is her main strength?", options: ["Being hard-working and reliable", "Being the fastest typist", "Being very quiet"], answer: "Being hard-working and reliable" },
        { question: "What question does Anna ask the manager?", options: ["What does a typical day look like in this role?", "How much is the salary?", "Can I leave early?"], answer: "What does a typical day look like in this role?" },
        { question: "How did the manager feel about Anna?", options: ["Impressed by her preparation", "Annoyed", "Confused"], answer: "Impressed by her preparation" },
        { question: "Which phrase would you use to order food?", options: ["I'd like the chicken, please", "Where is the baggage claim?", "What are your strengths?"], answer: "I'd like the chicken, please" },
        { question: "Which phrase asks about a flight?", options: ["What time does the flight board?", "Could we have the bill?", "Tell me about yourself"], answer: "What time does the flight board?" },
        { question: "Which sentence describes a positive personal quality for an interview?", options: ["I am a hard-working and reliable person", "I am always late", "I don't like working"], answer: "I am a hard-working and reliable person" },
      ],
    },
    {
      lessonId: 10,
      title: "Quiz 10",
      subtitle: "Business English Basics",
      passingScore: 7,
      questions: [
        { question: "Which phrase is a professional email greeting?", options: ["Dear Mr. Kasongo,", "Hey!", "Yo!"], answer: "Dear Mr. Kasongo," },
        { question: "Which phrase is a professional email sign-off?", options: ["Best regards,", "Bye bye,", "See ya,"], answer: "Best regards," },
        { question: "Which phrase is used to start a meeting?", options: ["Let's get started", "Let's stop forever", "I'm leaving now"], answer: "Let's get started" },
        { question: "Which phrase asks for clarification in a meeting?", options: ["Could you clarify that point?", "I don't care", "That's wrong"], answer: "Could you clarify that point?" },
        { question: "What does 'deadline' mean?", options: ["The date something must be finished", "A type of email", "A meeting room"], answer: "The date something must be finished" },
        { question: "What did David hear his manager say to start the meeting?", options: ["Let's get started", "Goodbye everyone", "No meeting today"], answer: "Let's get started" },
        { question: "What did David say when he didn't understand a point?", options: ["Could you clarify that, please?", "I don't understand anything, ever", "Nothing, he stayed silent"], answer: "Could you clarify that, please?" },
        { question: "Who did David write his first professional email to?", options: ["A client", "His mother", "A stranger online"], answer: "A client" },
        { question: "How did David end his email?", options: ["Best regards", "Bye", "See you"], answer: "Best regards" },
        { question: "What did his colleague think of the email?", options: ["It was clear and well written", "It was confusing", "It was too short"], answer: "It was clear and well written" },
      ],
    },
    {
      lessonId: 11,
      title: "Quiz 11",
      subtitle: "Debates and Arguments",
      passingScore: 7,
      questions: [
        { question: "Which phrase gives an opinion?", options: ["In my opinion,...", "Let's get started", "Where is the bank?"], answer: "In my opinion,..." },
        { question: "Which phrase disagrees politely?", options: ["I'm afraid I have to disagree", "You are completely wrong", "I don't care what you think"], answer: "I'm afraid I have to disagree" },
        { question: "Which phrase supports an argument with an example?", options: ["For example,...", "Goodbye,...", "Maybe,..."], answer: "For example,..." },
        { question: "Which phrase is used to conclude an argument?", options: ["In conclusion, I believe that...", "Let's get started", "Could you repeat that?"], answer: "In conclusion, I believe that..." },
        { question: "What were the students debating about?", options: ["Whether phones should be allowed in school", "What to eat for lunch", "Which sport is best"], answer: "Whether phones should be allowed in school" },
        { question: "What was Joseph's opinion?", options: ["Phones help students learn", "Phones should be banned forever", "Phones are too expensive"], answer: "Phones help students learn" },
        { question: "What was Grace's opinion?", options: ["Phones can be very distracting", "Phones are always helpful", "She had no opinion"], answer: "Phones can be very distracting" },
        { question: "How did Grace disagree with Joseph?", options: ["Politely, saying 'I see your point, but...'", "By shouting", "By leaving the room"], answer: "Politely, saying 'I see your point, but...'" },
        { question: "What did the teacher think of the debate?", options: ["Both arguments were well supported", "Both students were wrong", "The debate was pointless"], answer: "Both arguments were well supported" },
        { question: "What did the teacher encourage the class to do?", options: ["Keep discussing respectfully", "Stop talking about it", "Agree immediately"], answer: "Keep discussing respectfully" },
      ],
    },
    {
      lessonId: 12,
      title: "Quiz 12",
      subtitle: "Final Review and Real-Life Conversation",
      passingScore: 7,
      questions: [
        { question: "What grammar topic was reviewed in Lesson 1?", options: ["Sentence structure and subject-verb agreement", "Colors", "Numbers"], answer: "Sentence structure and subject-verb agreement" },
        { question: "What tenses were taught in Lesson 2?", options: ["Past and future tenses", "Only present tense", "No tenses"], answer: "Past and future tenses" },
        { question: "What skill does asking follow-up questions help with?", options: ["Keeping a conversation going", "Ending a conversation quickly", "Avoiding people"], answer: "Keeping a conversation going" },
        { question: "What could Patrick barely do a year ago?", options: ["Introduce himself in English", "Cook", "Drive"], answer: "Introduce himself in English" },
        { question: "What can Patrick do now?", options: ["Hold a full conversation about his job and opinions", "Still nothing in English", "Only count to ten"], answer: "Hold a full conversation about his job and opinions" },
        { question: "What does Patrick say was the key to his progress?", options: ["Practicing a little every single day", "Studying once a year", "Giving up often"], answer: "Practicing a little every single day" },
        { question: "What is Patrick excited to start next?", options: ["Level 3", "Level 1 again", "A different subject"], answer: "Level 3" },
        { question: "In the example conversation, what does speaker B write at work?", options: ["Reports and client emails", "Songs", "Nothing"], answer: "Reports and client emails" },
        { question: "How did speaker B feel at first in the new job?", options: ["Nervous", "Bored", "Angry"], answer: "Nervous" },
        { question: "What does speaker B say they will keep doing?", options: ["Improving their English for work", "Avoiding English", "Quitting the job"], answer: "Improving their English for work" },
      ],
    },
  ],

  finalQuiz: {
    title: "Final Quiz - Level 2",
    subtitle: "This quiz covers all Level 2 lessons.",
    passingScore: 15,
    questions: [
      { question: "Choose the correct sentence.", options: ["She work every day", "She works every day", "She working every day"], answer: "She works every day" },
      { question: "What is the past simple of 'eat'?", options: ["eated", "ate", "eating"], answer: "ate" },
      { question: "Which form expresses a decided plan?", options: ["going to", "did", "was"], answer: "going to" },
      { question: "Which is a good follow-up question after 'I went to the market'?", options: ["What did you buy?", "Goodbye", "I don't care"], answer: "What did you buy?" },
      { question: "Which word shows contrast in writing?", options: ["however", "and", "then"], answer: "however" },
      { question: "What should you do if you don't understand someone speaking?", options: ["Ask them to repeat or speak slowly", "Pretend you understood", "Walk away silently"], answer: "Ask them to repeat or speak slowly" },
      { question: "What is scanning used for?", options: ["Finding specific information quickly", "Memorizing every word", "Writing an email"], answer: "Finding specific information quickly" },
      { question: "Which is a synonym for 'happy'?", options: ["glad", "cold", "late"], answer: "glad" },
      { question: "Which pair shows commonly confused sounds?", options: ["ship / sheep", "red / blue", "one / two"], answer: "ship / sheep" },
      { question: "Which phrase is used to order food at a restaurant?", options: ["I'd like the chicken, please", "Where is the bank?", "Let's get started"], answer: "I'd like the chicken, please" },
      { question: "Which is a professional email sign-off?", options: ["Best regards,", "Bye bye,", "See ya,"], answer: "Best regards," },
      { question: "Which phrase politely disagrees in a debate?", options: ["I'm afraid I have to disagree", "You are wrong", "I don't care"], answer: "I'm afraid I have to disagree" },
      { question: "Which word correctly completes: 'I practice every day, ___ I am improving.'", options: ["therefore", "but", "or"], answer: "therefore" },
      { question: "Which collocation is correct?", options: ["make a decision", "do a decision", "take a decision"], answer: "make a decision" },
      { question: "What usually happens to intonation in a Wh-question?", options: ["It falls at the end", "It rises sharply", "It disappears"], answer: "It falls at the end" },
      { question: "What did Thomas plan to do next summer?", options: ["Visit Lubumbashi again", "Move abroad", "Stop traveling"], answer: "Visit Lubumbashi again" },
      { question: "What did Anna say was her main strength in her interview?", options: ["Being hard-working and reliable", "Being the youngest candidate", "Knowing many languages"], answer: "Being hard-working and reliable" },
      { question: "What did David's colleague think of his email?", options: ["It was clear and well written", "It was too long", "It was rude"], answer: "It was clear and well written" },
      { question: "What did the teacher think of the classroom debate?", options: ["Both arguments were well supported", "The debate should stop", "Only one student was right"], answer: "Both arguments were well supported" },
      { question: "According to Patrick, what helped him improve the most?", options: ["Practicing a little every single day", "Studying only once", "Avoiding English"], answer: "Practicing a little every single day" },
    ],
  },
};
