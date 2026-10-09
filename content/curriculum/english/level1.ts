import type { LevelCurriculum } from "../types";

// Ported from the original app/academy/level1/{lesson1..12,quiz1..12}
// pages. A few content bugs found during the port were fixed rather than
// carried over:
// - quiz2's subtitle was copy-pasted from quiz1 ("Greetings and
//   Introductions" instead of "The Alphabet and Pronunciation").
// - quiz9's questions referenced a "grandmother visit" story that never
//   appears in lesson9's actual reading text (which is about Emma's meals
//   during the day) — rewritten to match the real lesson content.
// - lesson5's spoken text had "fonn"/"bagg" typos not present in the
//   on-screen text ("phone"/"bag") — fixed so audio matches what's shown.
export const englishLevel1: LevelCurriculum = {
  langCode: "EN",
  langLabel: "Anglais",
  langSlug: "english",
  level: 1,
  levelTitle: "Level 1 - Beginner English",
  levelSubtitle: "Master the essentials step by step.",

  lessons: [
    {
      id: 1,
      title: "Greetings and Introductions",
      subtitle: "Learn greetings and how to introduce yourself in English.",
      sections: [
        {
          heading: "Common greetings",
          body: ["Hello / Hi", "Good morning", "Good afternoon", "Good evening"],
        },
        {
          heading: "Introducing yourself",
          body: [
            "My name is...",
            "I am... years old",
            "I live in...",
            "I am a student",
            "Nice to meet you",
          ],
        },
      ],
      speakText: `Greetings are important when meeting people.

Common greetings:
Hello.
Hi.
Good morning.
Good afternoon.
Good evening.

Introducing yourself.

My name is.
I am years old.
I live in.
I am a student.
Nice to meet you.`,
      videoTopic: "How to Introduce Yourself in English",
      readingTitle: "Hello!",
      reading: [
        "My name is Sarah. I am 12 years old. I live in Kolwezi. I am a student.",
        "Every morning, I say “Good morning” to my teachers and friends. I like meeting new people. When I meet someone for the first time, I say: “Hello, my name is Sarah. Nice to meet you.”",
        "I am friendly and happy to learn English.",
      ],
      readingSpeakText: `Hello.
My name is Sarah.
I am 12 years old. I live in Kolwezi. I am a student.

Every morning, I say good morning to my teachers and friends.

I like meeting new people.

When I meet someone for the first time,
I say: Hello, my name is Sarah. Nice to meet you.

I am friendly and happy to learn English.`,
      exercises: [
        "Hello, my name is ...",
        "I am ... years old",
        "I live in ...",
        "I am a ...",
      ],
      speakingTopic: "First time in the Democratic Republic of the Congo",
    },
    {
      id: 2,
      title: "The Alphabet and Pronunciation",
      subtitle: "Learn the English alphabet and practice correct pronunciation.",
      sections: [
        {
          heading: "The English Alphabet",
          body: ["The English alphabet has 26 letters.", "A B C D E F G H I J K L M", "N O P Q R S T U V W X Y Z"],
        },
        { heading: "Vowels", body: ["A", "E", "I", "O", "U"] },
        { heading: "Consonants", body: ["All other letters are consonants."] },
        {
          heading: "Pronunciation Practice",
          body: ["A = /eɪ/", "B = /biː/", "C = /siː/", "D = /diː/", "E = /iː/"],
        },
        {
          heading: "Example",
          body: ["We use letters to spell names, words, and email addresses.", "My name is David.", "D - A - V - I - D"],
        },
      ],
      speakText: `The English alphabet has 26 letters.

A, bee, sea, dee, e, ef, jee, aitch, eye, jay, kay, el, em,

N, O, P, Q, R, S, T, U, V, W, X, Y, Z.

Vowels:
A, E, I, O, U.

All other letters are consonants.

Pronunciation practice.

A
B
C
D
E

We use letters to spell names,
words,
and email addresses.

Example:
My name is David.

D A V I D.`,
      videoTopic: "Learn and repeat the English alphabet from A to Z.",
      readingTitle: "Hello! My name is Anna.",
      reading: [
        "I am learning English at school.",
        "Today I am learning the alphabet.",
        "I practice every day and I enjoy learning new words.",
        "I can spell my name: A - N - N - A.",
      ],
      readingSpeakText: `Hello. My name is Anna.

I am learning English at school.

Today, I am learning the alphabet.

I practice every day and I enjoy learning new words.

I can spell my name.

A, N, N, A.`,
      exercises: [
        "Say the alphabet from A to Z.",
        "Spell your name in English.",
        "Spell your email address.",
        "Practice pronunciation of vowels.",
      ],
      speakingTopic: "Introduce yourself and spell your full name.",
    },
    {
      id: 3,
      title: "Numbers and Personal Information",
      subtitle: "Learn numbers and how to share personal information in English.",
      sections: [
        {
          heading: "Numbers from 1 to 10",
          body: ["1 - One", "2 - Two", "3 - Three", "4 - Four", "5 - Five", "6 - Six", "7 - Seven", "8 - Eight", "9 - Nine", "10 - Ten"],
        },
        {
          heading: "Personal Information",
          body: [
            "We use personal information to introduce ourselves.",
            "Important questions:",
            "What is your name?",
            "How old are you?",
            "Where do you live?",
            "What is your phone number?",
            "What is your email address?",
          ],
        },
        {
          heading: "Example Answers",
          body: [
            "My name is David.",
            "I am 15 years old.",
            "I live in Kinshasa.",
            "My phone number is 123456789.",
            "My email is david@gmail.com",
          ],
        },
      ],
      speakText: `Numbers from one to ten.

One.
Two.
Three.
Four.
Five.
Six.
Seven.
Eight.
Nine.
Ten.

Personal Information.

We use personal information to introduce ourselves.

Important questions.

What is your name?

How old are you?

Where do you live?

What is your phone number?

What is your email address?

Example answers.

My name is David.

I am fifteen years old.

I live in Kinshasa.

My phone number is one two three four five six seven eight nine.

My email is david@gmail.com`,
      videoTopic: "Learn numbers and practice introducing yourself.",
      readingTitle: "Hello! My name is Sarah.",
      reading: [
        "I am 14 years old.",
        "I live in Kinshasa.",
        "My phone number is 987654321.",
        "My email address is sarah@gmail.com.",
      ],
      readingSpeakText: `Hello.

My name is Sarah.

I am fourteen years old.

I live in Kinshasa.

My phone number is nine eight seven six five four three two one.

My email address is sarah@gmail.com`,
      exercises: [
        "Count from 1 to 10 in English.",
        "Write your name in English.",
        "Say your age in English.",
        "Write your phone number in English.",
      ],
      speakingTopic: "Introduce yourself using your personal information.",
    },
    {
      id: 4,
      title: "Family and Relationships",
      subtitle: "Learn family members and how to talk about relationships.",
      sections: [
        {
          heading: "Family Members",
          body: ["Father", "Mother", "Brother", "Sister", "Uncle", "Aunt", "Grandfather", "Grandmother", "Cousin", "Parents"],
        },
        {
          heading: "Relationships",
          body: [
            "Family relationships are important in everyday life.",
            "Useful sentences:",
            "This is my father.",
            "My mother is very kind.",
            "I have one brother and two sisters.",
            "I love my family.",
            "My parents help me every day.",
          ],
        },
        {
          heading: "Example",
          body: [
            "I live with my family.",
            "My father works in an office.",
            "My mother is a teacher.",
            "I have one brother and one sister.",
            "We are happy together.",
          ],
        },
      ],
      speakText: `Family members.

Father.
Mother.
Brother.
Sister.
Uncle.
Aunt.
Grandfather.
Grandmother.
Cousin.
Parents.

Relationships.

Family relationships are important in everyday life.

Useful sentences.

This is my father.

My mother is very kind.

I have one brother and two sisters.

I love my family.

My parents help me every day.

Example.

I live with my family.

My father works in an office.

My mother is a teacher.

I have one brother and one sister.

We are happy together.`,
      videoTopic: "Learn family vocabulary and relationship words.",
      readingTitle: "My name is John.",
      reading: [
        "I live with my parents and my sister.",
        "My father is a doctor.",
        "My mother is very caring.",
        "I love spending time with my family.",
      ],
      readingSpeakText: `My name is John.

I live with my parents and my sister.

My father is a doctor.

My mother is very caring.

I love spending time with my family.`,
      exercises: [
        "Name five family members in English.",
        "Describe your family in simple sentences.",
        "Say who lives in your house.",
        "Practice saying family relationships aloud.",
      ],
      speakingTopic: "Talk about your family and the people close to you.",
    },
    {
      id: 5,
      title: "Everyday Objects",
      subtitle: "Learn common objects we use every day and how to describe them.",
      sections: [
        {
          heading: "Common Everyday Objects",
          body: ["Book", "Pen", "Chair", "Table", "Phone", "Bag", "Computer", "Bottle", "Notebook", "Key"],
        },
        {
          heading: "Useful Sentences",
          body: ["This is my book.", "I write with a pen.", "The chair is blue.", "My phone is on the table.", "I carry my bag to school."],
        },
        {
          heading: "Describing Objects",
          body: [
            "We can describe objects by color, size, and use.",
            "The book is small.",
            "The bottle is full.",
            "The computer is new.",
            "The bag is heavy.",
          ],
        },
        {
          heading: "Remember",
          body: ["Everyday objects are things we use at home, at school, or at work every day."],
        },
      ],
      speakText: `Common everyday objects.

Book.
Pen.
Chair.
Table.
Phone.
Bag.
Computer.
Bottle.
Notebook.
Key.

Useful sentences.

This is my book.

I write with a pen.

The chair is blue.

My phone is on the table.

I carry my bag to school.

Describing objects.

We can describe objects by color, size, and use.

The book is small.

The bottle is full.

The computer is new.

The bag is heavy.

Remember.

Everyday objects are things we use at home, at school, or at work every day.`,
      videoTopic: "Learn common objects and their pronunciation.",
      readingTitle: "My name is Peter.",
      reading: [
        "Every day I go to school with my bag and my notebook.",
        "I use a pen to write in my book.",
        "My phone is in my bag.",
        "I sit on a chair and study every morning.",
      ],
      readingSpeakText: `My name is Peter.

Every day I go to school with my bag and my notebook.

I use a pen to write in my book. My phone is in my bag.

I sit on a chair and study every morning.`,
      exercises: [
        "Name five objects around you.",
        "Describe your school bag.",
        "Make three sentences using object names.",
        "Practice pronunciation aloud.",
      ],
      speakingTopic: "Talk about the objects you use every day.",
    },
    {
      id: 6,
      title: "Colors and Descriptions",
      subtitle: "Learn colors and how to describe people and objects.",
      sections: [
        {
          heading: "Common Colors",
          body: ["Red", "Blue", "Green", "Yellow", "Black", "White", "Orange", "Brown", "Pink", "Purple"],
        },
        {
          heading: "Describing Objects",
          body: ["The bag is red.", "The phone is black.", "The chair is blue.", "The notebook is green."],
        },
        {
          heading: "Describing People",
          body: ["She is tall.", "He is short.", "She is happy.", "He is strong.", "She is friendly."],
        },
        {
          heading: "Useful Adjectives",
          body: ["Big", "Small", "Heavy", "Light", "Beautiful", "Clean"],
        },
        {
          heading: "Remember",
          body: ["We use colors and adjectives to describe what we see around us."],
        },
      ],
      speakText: `Common colors.

Red.
Blue.
Green.
Yellow.
Black.
White.
Orange.
Brown.
Pink.
Purple.

Describing objects.

The bag is red.

The phone is black.

The chair is blue.

The notebook is green.

Describing people.

She is tall.

He is short.

She is happy.

He is strong.

She is friendly.

Useful adjectives.

Big.
Small.
Heavy.
Light.
Beautiful.
Clean.

We use colors and adjectives to describe what we see around us.`,
      videoTopic: "Learn colors and practice descriptions.",
      readingTitle: "My name is Lisa.",
      reading: [
        "I have a blue school bag.",
        "My notebook is green and my phone is black.",
        "I am happy and friendly.",
        "My little brother is short but very strong.",
      ],
      readingSpeakText: `My name is Lisa.

I have a blue school bag.

My notebook is green and my phone is black.

I am happy and friendly.

My little brother is short but very strong.`,
      exercises: [
        "Name five colors in English.",
        "Describe your phone.",
        "Describe yourself in two sentences.",
        "Use three adjectives in sentences.",
      ],
      speakingTopic: "Describe yourself and three objects around you.",
    },
    {
      id: 7,
      title: "Days, Months, and Dates",
      subtitle: "Learn how to talk about days, months, and important dates.",
      sections: [
        {
          heading: "Days of the Week",
          body: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        },
        {
          heading: "Months of the Year",
          body: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        },
        {
          heading: "Useful Sentences",
          body: ["Today is Monday.", "My birthday is in July.", "School starts in September.", "Today is June 15th.", "I go to church on Sunday."],
        },
      ],
      speakText: `Days of the week.

Monday.
Tuesday.
Wednesday.
Thursday.
Friday.
Saturday.
Sunday.

Months of the year.

January.
February.
March.
April.
May.
June.
July.
August.
September.
October.
November.
December.

Useful sentences.

Today is Monday.

My birthday is in July.

School starts in September.

Today is June fifteenth.

I go to church on Sunday.`,
      videoTopic: "Learn days of the week, months, and how to say dates.",
      readingTitle: "My name is Kevin.",
      reading: [
        "Today is Friday, June 12th. I wake up early every morning.",
        "I go to school from Monday to Friday and I rest on Saturday.",
        "My favorite month is July because it is my birthday month.",
        "My birthday is on July 25th and my family celebrates with me.",
        "Every Sunday, I go to church with my parents.",
      ],
      readingSpeakText: `My name is Kevin.

Today is Friday, June twelfth.

I wake up early every morning.

I go to school from Monday to Friday and I rest on Saturday.

My favorite month is July because it is my birthday month.

My birthday is on July twenty-fifth and my family celebrates with me.

Every Sunday, I go to church with my parents.`,
      exercises: [
        "Say all days of the week.",
        "Say all months of the year.",
        "Tell your birthday date.",
        "Say what day it is today.",
      ],
      speakingTopic: "Talk about your birthday and your weekly activities.",
    },
    {
      id: 8,
      title: "Daily Routines",
      subtitle: "Learn how to talk about everyday activities and routines.",
      sections: [
        {
          heading: "Common Daily Activities",
          body: ["Wake up", "Brush my teeth", "Take a shower", "Eat breakfast", "Go to school", "Study", "Eat lunch", "Play with friends", "Do homework", "Sleep"],
        },
        {
          heading: "Useful Sentences",
          body: [
            "I wake up at 6 o’clock.",
            "I brush my teeth every morning.",
            "I go to school at 7 a.m.",
            "I do my homework in the evening.",
            "I sleep at night.",
          ],
        },
        {
          heading: "Talking About Routine",
          body: ["Daily routine means the activities we do every day, usually in the same order."],
        },
      ],
      speakText: `Common daily activities.

Wake up.

Brush my teeth.

Take a shower.

Eat breakfast.

Go to school.

Study.

Eat lunch.

Play with friends.

Do homework.

Sleep.

Useful sentences.

I wake up at six o’clock.

I brush my teeth every morning.

I go to school at seven a.m.

I do my homework in the evening.

I sleep at night.

Talking about routine.

Daily routine means the activities we do every day, usually in the same order.`,
      videoTopic: "Learn vocabulary about everyday routines.",
      readingTitle: "My name is Daniel.",
      reading: [
        "Every day I wake up at 6 o’clock in the morning.",
        "I brush my teeth and take a shower before breakfast.",
        "At 7 a.m., I go to school and study with my classmates.",
        "In the afternoon, I play football with my friends.",
        "In the evening, I do my homework and sleep at 9 p.m.",
      ],
      readingSpeakText: `My name is Daniel.

Every day I wake up at six o’clock in the morning.

I brush my teeth and take a shower before breakfast.

At seven a.m., I go to school and study with my classmates.

In the afternoon, I play football with my friends.

In the evening, I do my homework and sleep at nine p.m.`,
      exercises: [
        "Describe your morning routine.",
        "Say what time you wake up.",
        "Make three sentences about your daily activities.",
        "Talk about what you do after school.",
      ],
      speakingTopic: "Talk about your daily routine from morning to night.",
    },
    {
      id: 9,
      title: "Food and Drinks",
      subtitle: "Learn vocabulary about common food, drinks, and meals.",
      sections: [
        { heading: "Common Foods", body: ["Rice", "Bread", "Meat", "Fish", "Eggs", "Chicken", "Banana", "Apple"] },
        { heading: "Common Drinks", body: ["Water", "Milk", "Juice", "Tea", "Coffee"] },
        {
          heading: "Useful Sentences",
          body: [
            "I drink water every day.",
            "My favorite food is rice.",
            "I eat bread for breakfast.",
            "She likes apple juice.",
            "We eat chicken for dinner.",
          ],
        },
        { heading: "Remember", body: ["Food gives us energy and drinks help our body stay healthy."] },
      ],
      speakText: `Common Foods.
Rice, Bread, Meat, Fish, Eggs, Chicken, Banana, Apple.

Common Drinks.
Water, Milk, Juice, Tea, Coffee.

Useful Sentences.
I drink water every day.
My favorite food is rice.
I eat bread for breakfast.
She likes apple juice.
We eat chicken for dinner.

Food gives us energy and drinks help our body stay healthy.`,
      videoTopic: "Learn common food and drink vocabulary.",
      readingTitle: "My name is Emma.",
      reading: [
        "Every morning I eat bread and eggs for breakfast.",
        "At school, I drink water and sometimes fruit juice.",
        "My favorite food is rice with chicken.",
        "In the evening, my family eats fish and vegetables together.",
        "I always drink water before going to sleep.",
      ],
      readingSpeakText: `My name is Emma.
Every morning I eat bread and eggs for breakfast.

At school, I drink water and sometimes fruit juice.

My favorite food is rice with chicken.

In the evening, my family eats fish and vegetables together.

I always drink water before going to sleep.`,
      exercises: [
        "Name five foods in English.",
        "Name three drinks in English.",
        "Say what you eat for breakfast.",
        "Describe your favorite meal.",
      ],
      speakingTopic: "Talk about your favorite food and what you drink every day.",
    },
    {
      id: 10,
      title: "Places in Town",
      subtitle: "Learn vocabulary about places you can find in a town or city.",
      sections: [
        {
          heading: "Common Places in Town",
          body: ["School", "Hospital", "Market", "Bank", "Restaurant", "Church", "Police Station", "Bus Station", "Library", "Park"],
        },
        {
          heading: "Useful Sentences",
          body: [
            "I go to school every morning.",
            "My mother works at the hospital.",
            "We buy food at the market.",
            "He goes to the bank on Friday.",
            "Children play in the park.",
          ],
        },
        {
          heading: "Asking About Places",
          body: ["Where is the hospital?", "How do I get to the bank?", "The market is near the church.", "The library is next to the school."],
        },
      ],
      speakText: `Common Places in Town.
School, Hospital, Market,
Bank, Restaurant, Church,
Police Station, Bus Station,
Library, Park.

Useful Sentences.
I go to school every morning.
My mother works at the hospital.
We buy food at the market.
He goes to the bank on Friday.
Children play in the park.

Asking About Places.
Where is the hospital?
How do I get to the bank?
The market is near the church.
The library is next to the school.`,
      videoTopic: "Learn vocabulary about places in town and directions.",
      readingTitle: "Last Wednesday, Michael went to the town center with his father.",
      reading: [
        "First, they stopped at the bank because his father needed to withdraw money.",
        "After leaving the bank, they walked to the market to buy fresh fruit and vegetables.",
        "While they were walking, Michael saw a large hospital near the police station.",
        "Before going home, they sat in a small restaurant and ate lunch together.",
        "Michael said he liked the town because everything was close and easy to find.",
      ],
      readingSpeakText: `Last Wednesday, Michael went to the town center with his father.

First, they stopped at the bank because his father needed to withdraw money.

After leaving the bank, they walked to the market to buy fresh fruit and vegetables.

While they were walking, Michael saw a large hospital near the police station.

Before going home, they sat in a small restaurant and ate lunch together.

Michael said he liked the town because everything was close and easy to find.`,
      exercises: [
        "Name five places in your town.",
        "Say where people buy food.",
        "Describe places near your house.",
        "Make sentences using town vocabulary.",
      ],
      speakingTopic: "Describe places you often visit in your town.",
    },
    {
      id: 11,
      title: "Hobbies and Interests",
      subtitle: "Learn how to talk about hobbies, interests, and free time activities.",
      sections: [
        {
          heading: "Common Hobbies",
          body: ["Reading books", "Playing football", "Listening to music", "Watching movies", "Drawing", "Dancing", "Singing", "Cooking", "Swimming", "Playing video games"],
        },
        {
          heading: "Useful Sentences",
          body: ["My favorite hobby is reading.", "I enjoy playing football.", "She likes listening to music.", "We watch movies on weekends.", "He loves drawing pictures."],
        },
        {
          heading: "Talking About Interests",
          body: ["What do you like doing?", "I enjoy spending time with friends.", "My hobby helps me relax.", "I practice my hobby after school."],
        },
      ],
      speakText: `Common hobbies include reading books, playing football,
listening to music, watching movies, drawing, dancing,
singing, cooking, swimming, and playing video games.

My favorite hobby is reading.
I enjoy playing football.
She likes listening to music.
We watch movies on weekends.
He loves drawing pictures.

What do you like doing?
I enjoy spending time with friends.
My hobby helps me relax.
I practice my hobby after school.`,
      videoTopic: "Learn vocabulary about hobbies and free time activities.",
      readingTitle: "On Saturday afternoon, James visited his cousin Daniel.",
      reading: [
        "When he arrived, Daniel was sitting outside and reading a book about animals.",
        "After reading, both boys decided to play football in the neighborhood park.",
        "Later, they returned home and listened to music while Daniel's sister was drawing in the living room.",
        "During dinner, James said that he enjoyed the day because spending time doing fun activities made him happy.",
        "Before leaving, Daniel told James that reading books was still his favorite hobby.",
      ],
      readingSpeakText: `On Saturday afternoon, James visited his cousin Daniel.
When he arrived, Daniel was sitting outside and reading a book about animals.
After reading, both boys decided to play football in the neighborhood park.
Later, they returned home and listened to music while Daniel's sister was drawing in the living room.
During dinner, James said that he enjoyed the day because spending time doing fun activities made him happy.
Before leaving, Daniel told James that reading books was still his favorite hobby.`,
      exercises: [
        "Name three hobbies you enjoy.",
        "Talk about what you do in your free time.",
        "Make sentences using hobby vocabulary.",
        "Describe your favorite weekend activity.",
      ],
      speakingTopic: "Talk about your favorite hobby and why you enjoy it.",
    },
    {
      id: 12,
      title: "Final Review and Real-Life Conversation",
      subtitle: "Review everything learned and practice real-life English conversation.",
      sections: [
        {
          heading: "Important Things We Learned",
          body: [
            "Greeting people politely",
            "Introducing yourself",
            "Talking about age and personal information",
            "Talking about family members",
            "Naming everyday objects",
            "Using colors and descriptions",
            "Talking about dates and months",
            "Describing daily routines",
            "Talking about food and drinks",
            "Describing places in town",
            "Talking about hobbies and interests",
          ],
        },
        {
          heading: "Example Real-Life Conversation",
          body: [
            "A: Hello! My name is David. What is your name?",
            "B: Hi David. My name is Sarah. Nice to meet you.",
            "A: Nice to meet you too. How old are you?",
            "B: I am 15 years old. I live near the city market.",
            "A: Great. What do you like doing in your free time?",
            "B: I like reading books and listening to music.",
            "A: Nice. What is your favorite food?",
            "B: I love rice and chicken.",
          ],
        },
      ],
      speakText: `Important things we learned include greeting people politely,
introducing yourself, talking about age and personal information,
talking about family members, naming everyday objects,
using colors and descriptions, talking about dates and months,
describing daily routines, talking about food and drinks,
describing places in town, and talking about hobbies and interests.

Example real life conversation.

Hello, my name is David. What is your name?
Hi David, my name is Sarah. Nice to meet you.
Nice to meet you too. How old are you?
I am fifteen years old. I live near the city market.
Great. What do you like doing in your free time?
I like reading books and listening to music.
Nice. What is your favorite food?
I love rice and chicken.`,
      videoTopic: "Review beginner English conversation and vocabulary.",
      readingTitle: "Last Sunday, Kevin traveled with his family to visit his uncle in town.",
      reading: [
        "Before leaving home, he ate bread and drank tea for breakfast.",
        "After arriving, Kevin greeted everyone politely and introduced himself to some visitors he had never met before.",
        "Later, he went to the market with his cousin and helped buy vegetables, fish, and rice for lunch.",
        "In the afternoon, they played football together in the park and listened to music while resting.",
        "When the day ended, Kevin said he had enjoyed spending time with family and doing activities he loved.",
      ],
      readingSpeakText: `Last Sunday, Kevin traveled with his family to visit his uncle in town. Before leaving home, he ate bread and drank tea for breakfast.
After arriving, Kevin greeted everyone politely and introduced himself to some visitors he had never met before.

Later, he went to the market with his cousin and helped buy vegetables, fish, and rice for lunch.

In the afternoon, they played football together in the park and listened to music while resting.

When the day ended, Kevin said he had enjoyed spending time with family and doing activities he loved.`,
      exercises: [
        "Introduce yourself in English.",
        "Talk about your family.",
        "Describe your favorite food.",
        "Describe your daily routine.",
        "Talk about your hobbies.",
      ],
      speakingTopic: "Present yourself and describe a normal day in your life.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Quiz 1",
      subtitle: "Greetings and Introductions",
      passingScore: 7,
      questions: [
        { question: "How do you greet someone?", options: ["Hello", "Chair", "Water"], answer: "Hello" },
        { question: "How do you introduce yourself?", options: ["My name is John", "Good night", "Bank"], answer: "My name is John" },
        { question: "What is the girl’s name?", options: ["John", "Sarah", "Joyce"], answer: "Sarah" },
        { question: "How old is Sarah?", options: ["20 years old", "13 years old", "12 years old"], answer: "12 years old" },
        { question: "Where does Sarah live?", options: ["Kolwezi", "Kinshasa", "Paris"], answer: "Kolwezi" },
        { question: "Choose an introduction:", options: ["My name is Sarah", "School is big", "Blue chair"], answer: "My name is Sarah" },
        { question: "What does Sarah say in the morning?", options: ["Bye", "Good morning", "Hello"], answer: "Good morning" },
        { question: "Choose a greeting word:", options: ["Hello", "Chicken", "Monday"], answer: "Hello" },
        {
          question: "What does she say when she meets someone new?",
          options: ["Nice to meet you", "Hello, my name is Sarah. Nice to meet you.", "Hello, welcome"],
          answer: "Hello, my name is Sarah. Nice to meet you.",
        },
        { question: "What do we use for introductions?", options: ["My name is...", "Turn left", "I eat rice"], answer: "My name is..." },
      ],
    },
    {
      lessonId: 2,
      title: "Quiz 2",
      subtitle: "The Alphabet and Pronunciation",
      passingScore: 7,
      questions: [
        { question: "How many letters are in the English alphabet?", options: ["24", "26", "28"], answer: "26" },
        { question: "Which of these is a vowel?", options: ["B", "E", "T"], answer: "E" },
        { question: "Which of these is a consonant?", options: ["A", "O", "D"], answer: "D" },
        { question: "How do you spell the name David?", options: ["D-A-V-I-D", "D-A-V-I-T", "D-E-V-I-D"], answer: "D-A-V-I-D" },
        { question: "What do we use letters for?", options: ["To spell names and words", "To cook food", "To play football"], answer: "To spell names and words" },
        { question: "What is the girl’s name in the text?", options: ["Sarah", "Anna", "Emma"], answer: "Anna" },
        { question: "What is Anna learning today?", options: ["The alphabet", "Numbers", "Colors"], answer: "The alphabet" },
        { question: "Where does Anna learn English?", options: ["At home", "At school", "At the market"], answer: "At school" },
        { question: "How does Anna spell her name?", options: ["A-N-N-A", "A-N-A", "A-N-N-E"], answer: "A-N-N-A" },
        { question: "What does Anna enjoy?", options: ["Learning new words", "Sleeping", "Watching television"], answer: "Learning new words" },
      ],
    },
    {
      lessonId: 3,
      title: "Quiz 3",
      subtitle: "Numbers and Personal Information",
      passingScore: 7,
      questions: [
        { question: "What is number 5 in English?", options: ["Seven", "Five", "Four"], answer: "Five" },
        { question: "What is number 8 in English?", options: ["Three", "Ten", "Eight"], answer: "Eight" },
        { question: "Which question asks for age?", options: ["What is your name?", "How old are you?", "Where is the book?"], answer: "How old are you?" },
        { question: "Which sentence is correct?", options: ["David my is name", "My name is David", "Is David me"], answer: "My name is David" },
        { question: "What do we use to contact someone online?", options: ["Television", "Email address", "Banana"], answer: "Email address" },
        { question: "What is the girl's name in the text?", options: ["Mary", "Sarah", "Anna"], answer: "Sarah" },
        { question: "How old is Sarah?", options: ["18 years old", "14 years old", "10 years old"], answer: "14 years old" },
        { question: "Where does Sarah live?", options: ["London", "Paris", "Kinshasa"], answer: "Kinshasa" },
        { question: "What is Sarah's phone number?", options: ["123456789", "987654321", "555666777"], answer: "987654321" },
        { question: "Which information is personal information?", options: ["Blue chair", "Football", "Phone number"], answer: "Phone number" },
      ],
    },
    {
      lessonId: 4,
      title: "Quiz 4",
      subtitle: "Family and Relationships",
      passingScore: 7,
      questions: [
        { question: "Which word means male parent?", options: ["Brother", "Father", "Uncle"], answer: "Father" },
        { question: "Which person is your female parent?", options: ["Mother", "Sister", "Cousin"], answer: "Mother" },
        { question: "Which sentence is correct?", options: ["My mother is kind", "Kind mother my is", "Mother is my kinded"], answer: "My mother is kind" },
        { question: "Who are your parents?", options: ["Father and Mother", "Teacher and Doctor", "Brother and Friend"], answer: "Father and Mother" },
        { question: "What relationship word means your father's brother?", options: ["Cousin", "Uncle", "Grandmother"], answer: "Uncle" },
        { question: "What is the boy’s name in the text?", options: ["David", "John", "Mark"], answer: "John" },
        { question: "Who does John live with?", options: ["His friends", "His parents and sister", "His teacher"], answer: "His parents and sister" },
        { question: "What is John's father’s job?", options: ["Doctor", "Driver", "Farmer"], answer: "Doctor" },
        { question: "How is John's mother described?", options: ["Strict", "Very caring", "Angry"], answer: "Very caring" },
        { question: "What does John enjoy doing?", options: ["Playing football alone", "Spending time with his family", "Watching television all day"], answer: "Spending time with his family" },
      ],
    },
    {
      lessonId: 5,
      title: "Quiz 5",
      subtitle: "Everyday Objects",
      passingScore: 7,
      questions: [
        { question: "Which object do we use to write?", options: ["Bottle", "Pen", "Chair"], answer: "Pen" },
        { question: "Which object can we use to call someone?", options: ["Phone", "Book", "Table"], answer: "Phone" },
        { question: "Where do students usually carry books?", options: ["Bag", "Bottle", "Key"], answer: "Bag" },
        { question: "Which sentence is correct?", options: ["This is my book", "Book my this is", "Is this book me"], answer: "This is my book" },
        { question: "What can be heavy?", options: ["Bag", "Smile", "Air"], answer: "Bag" },
        { question: "What is the boy’s name in the text?", options: ["Peter", "Daniel", "Tom"], answer: "Peter" },
        { question: "Where does Peter go every day?", options: ["School", "Hospital", "Market"], answer: "School" },
        { question: "What does Peter use to write?", options: ["Pen", "Bottle", "Computer"], answer: "Pen" },
        { question: "Where is Peter’s phone?", options: ["In his bag", "On the roof", "Under the chair"], answer: "In his bag" },
        { question: "What does Peter sit on?", options: ["Chair", "Table", "Bottle"], answer: "Chair" },
      ],
    },
    {
      lessonId: 6,
      title: "Quiz 6",
      subtitle: "Colors and Descriptions",
      passingScore: 7,
      questions: [
        { question: "Which one is a color?", options: ["Doctor", "Blue", "Table"], answer: "Blue" },
        { question: "Which sentence is correct?", options: ["Bag is red the", "The bag is red", "Red bag the is"], answer: "The bag is red" },
        { question: "Which adjective describes size?", options: ["Bottle", "Big", "Monday"], answer: "Big" },
        { question: "What color is often opposite to black?", options: ["Green", "White", "Orange"], answer: "White" },
        { question: "Which adjective describes a person?", options: ["Notebook", "Window", "Friendly"], answer: "Friendly" },
        { question: "What is the girl’s name in the text?", options: ["Sarah", "Lisa", "Anna"], answer: "Lisa" },
        { question: "What color is Lisa’s school bag?", options: ["Yellow", "Blue", "Black"], answer: "Blue" },
        { question: "What color is Lisa’s phone?", options: ["Red", "Green", "Black"], answer: "Black" },
        { question: "How is Lisa described?", options: ["Tall and silent", "Happy and friendly", "Angry and tired"], answer: "Happy and friendly" },
        { question: "How is Lisa’s brother?", options: ["Quiet and sad", "Short and strong", "Tall and weak"], answer: "Short and strong" },
      ],
    },
    {
      lessonId: 7,
      title: "Quiz 7",
      subtitle: "Days, Months, and Dates",
      passingScore: 7,
      questions: [
        { question: "Which one is a day of the week?", options: ["Teacher", "Tuesday", "Bottle"], answer: "Tuesday" },
        { question: "Which one is a month?", options: ["Friday", "July", "Window"], answer: "July" },
        { question: "How many days are in one week?", options: ["Ten", "Seven", "Five"], answer: "Seven" },
        { question: "Which sentence is correct?", options: ["Monday today is the", "Today is Monday", "Is Monday the today"], answer: "Today is Monday" },
        { question: "What question asks about a birthday?", options: ["Where is your bag?", "When is your birthday?", "What color is your phone?"], answer: "When is your birthday?" },
        { question: "What is the boy’s name in the text?", options: ["Kevin", "John", "Peter"], answer: "Kevin" },
        { question: "What day is it in the story?", options: ["Sunday", "Friday", "Tuesday"], answer: "Friday" },
        { question: "What is Kevin’s favorite month?", options: ["June", "July", "December"], answer: "July" },
        { question: "On what date is Kevin’s birthday?", options: ["July 25th", "June 12th", "August 10th"], answer: "July 25th" },
        { question: "What does Kevin do every Sunday?", options: ["He stays home", "He goes to church", "He plays football"], answer: "He goes to church" },
      ],
    },
    {
      lessonId: 8,
      title: "Quiz 8",
      subtitle: "Daily Routines",
      passingScore: 7,
      questions: [
        { question: "What do people usually do first in the morning?", options: ["Wake up", "Sleep", "Play football"], answer: "Wake up" },
        { question: "Which activity happens in the bathroom?", options: ["Brush my teeth", "Study math", "Watch television"], answer: "Brush my teeth" },
        { question: "Which sentence is correct?", options: ["I go to school", "School I to go", "Go school to I"], answer: "I go to school" },
        { question: "When do students usually do homework?", options: ["In the evening", "At midnight", "Before breakfast"], answer: "In the evening" },
        { question: "What is a daily routine?", options: ["Activities we do every day", "A birthday party", "A school building"], answer: "Activities we do every day" },
        { question: "What is the boy’s name in the text?", options: ["Peter", "Daniel", "Kevin"], answer: "Daniel" },
        { question: "What time does Daniel wake up?", options: ["6 o’clock", "9 p.m.", "12 noon"], answer: "6 o’clock" },
        { question: "What does Daniel do before breakfast?", options: ["Brushes teeth and takes a shower", "Plays football", "Does homework"], answer: "Brushes teeth and takes a shower" },
        { question: "What does Daniel do in the afternoon?", options: ["Sleeps", "Plays football with friends", "Goes to church"], answer: "Plays football with friends" },
        { question: "What time does Daniel sleep?", options: ["6 a.m.", "9 p.m.", "2 p.m."], answer: "9 p.m." },
      ],
    },
    {
      // Original quiz9 asked about a "grandmother visit" story that does
      // not exist anywhere in lesson9's reading text — rewritten to
      // actually test lesson9's content (Emma's meals).
      lessonId: 9,
      title: "Quiz 9",
      subtitle: "Food and Drinks",
      passingScore: 7,
      questions: [
        { question: "Which one is a drink?", options: ["Bread", "Juice", "Fish"], answer: "Juice" },
        { question: "What is the girl's name in the text?", options: ["Sarah", "Emma", "Lisa"], answer: "Emma" },
        { question: "What does Emma eat for breakfast?", options: ["Rice and chicken", "Bread and eggs", "Fish and vegetables"], answer: "Bread and eggs" },
        { question: "What does Emma drink at school?", options: ["Coffee", "Water and sometimes fruit juice", "Milk"], answer: "Water and sometimes fruit juice" },
        { question: "Which sentence is correct?", options: ["She drank fruit juice", "Fruit drank she juice", "Juice she fruit drink"], answer: "She drank fruit juice" },
        { question: "What is Emma's favorite food?", options: ["Rice with chicken", "Bread with tea", "Banana with milk"], answer: "Rice with chicken" },
        { question: "What does Emma's family eat in the evening?", options: ["Only bread", "Fish and vegetables", "Pizza"], answer: "Fish and vegetables" },
        { question: "Which one is a fruit?", options: ["Banana", "Notebook", "Chair"], answer: "Banana" },
        { question: "What does Emma drink before sleeping?", options: ["Coffee", "Water", "Tea"], answer: "Water" },
        { question: "What do food and drinks give us?", options: ["Energy and health", "Money", "Homework"], answer: "Energy and health" },
      ],
    },
    {
      lessonId: 10,
      title: "Quiz 10",
      subtitle: "Places in Town",
      passingScore: 7,
      questions: [
        { question: "Where do people usually buy food?", options: ["Market", "Library", "Hospital"], answer: "Market" },
        { question: "Which place helps sick people?", options: ["Bank", "Hospital", "Restaurant"], answer: "Hospital" },
        { question: "Which sentence is correct?", options: ["The market is near the church", "Near church market the is", "Church the near market is"], answer: "The market is near the church" },
        { question: "Where can children play?", options: ["Police station", "Park", "Bank"], answer: "Park" },
        { question: "Where do people keep money?", options: ["Restaurant", "School", "Bank"], answer: "Bank" },
        { question: "Who went to town with Michael?", options: ["His father", "His teacher", "His sister"], answer: "His father" },
        { question: "Why did Michael’s father stop at the bank?", options: ["To withdraw money", "To buy food", "To see a doctor"], answer: "To withdraw money" },
        { question: "What did they buy at the market?", options: ["Books and pens", "Fruit and vegetables", "Shoes and clothes"], answer: "Fruit and vegetables" },
        { question: "What did Michael see near the police station?", options: ["A hospital", "A school", "A park"], answer: "A hospital" },
        { question: "How did Michael feel about the town?", options: ["He liked it because everything was easy to find", "He was afraid of it", "He wanted to leave quickly"], answer: "He liked it because everything was easy to find" },
      ],
    },
    {
      lessonId: 11,
      title: "Quiz 11",
      subtitle: "Hobbies and Interests",
      passingScore: 7,
      questions: [
        { question: "Which one is a hobby?", options: ["Hospital", "Drawing", "Kitchen"], answer: "Drawing" },
        { question: "Which sentence is correct?", options: ["I enjoy playing football", "Playing football enjoy I", "Football I playing enjoy"], answer: "I enjoy playing football" },
        { question: "What do hobbies often do for people?", options: ["Help them relax", "Make food grow", "Change the weather"], answer: "Help them relax" },
        { question: "Which one is a free time activity?", options: ["Swimming", "Police station", "Notebook"], answer: "Swimming" },
        { question: "What question asks about interests?", options: ["What do you like doing?", "Where is the market?", "How old are you?"], answer: "What do you like doing?" },
        { question: "Who did James visit on Saturday?", options: ["His cousin Daniel", "His teacher", "His uncle"], answer: "His cousin Daniel" },
        { question: "What was Daniel doing when James arrived?", options: ["Playing football", "Reading a book", "Cooking dinner"], answer: "Reading a book" },
        { question: "Where did the boys play football?", options: ["At school", "In the neighborhood park", "At the restaurant"], answer: "In the neighborhood park" },
        { question: "What was Daniel’s sister doing?", options: ["Drawing", "Swimming", "Watching television"], answer: "Drawing" },
        { question: "What is Daniel’s favorite hobby?", options: ["Reading books", "Listening to music", "Playing video games"], answer: "Reading books" },
      ],
    },
    {
      lessonId: 12,
      title: "Quiz 12",
      subtitle: "Final Review and Real-Life Conversation",
      passingScore: 7,
      questions: [
        { question: "How do you politely greet someone?", options: ["Hello", "Banana", "Window"], answer: "Hello" },
        { question: "Which sentence introduces yourself correctly?", options: ["My name is Daniel", "Daniel my name", "Name Daniel is me"], answer: "My name is Daniel" },
        { question: "Which one is a hobby?", options: ["Reading books", "Hospital", "Bottle"], answer: "Reading books" },
        { question: "Where do people buy vegetables?", options: ["Airport", "Market", "Library"], answer: "Market" },
        { question: "Which one is a drink?", options: ["Rice", "Tea", "Chicken"], answer: "Tea" },
        { question: "Who traveled with Kevin?", options: ["His family", "His teacher", "His classmates"], answer: "His family" },
        { question: "What did Kevin eat before leaving home?", options: ["Fish and rice", "Bread and tea", "Chicken and juice"], answer: "Bread and tea" },
        { question: "Where did Kevin go with his cousin?", options: ["The market", "The hospital", "The library"], answer: "The market" },
        { question: "What did they do in the afternoon?", options: ["Played football and listened to music", "Went to school", "Watched television"], answer: "Played football and listened to music" },
        { question: "What did Kevin say at the end of the day?", options: ["He enjoyed spending time with family", "He was angry all day", "He wanted to leave early"], answer: "He enjoyed spending time with family" },
      ],
    },
  ],

  finalQuiz: {
    title: "Final Quiz - Level 1",
    subtitle: "This quiz covers all Level 1 lessons.",
    passingScore: 15,
    questions: [
      { question: "How do you greet someone in the morning?", options: ["Good morning", "Goodbye", "Chicken"], answer: "Good morning" },
      { question: "Choose the correct introduction.", options: ["My name is Alex", "Alex name my is", "Name Alex me"], answer: "My name is Alex" },
      { question: "Which letter comes after G?", options: ["H", "J", "F"], answer: "H" },
      { question: "How do you write the number 15?", options: ["Fifty", "Fifteen", "Five"], answer: "Fifteen" },
      { question: "Who is your father’s daughter?", options: ["Your sister", "Your teacher", "Your uncle"], answer: "Your sister" },
      { question: "Which one is an everyday object?", options: ["Bottle", "Hospital", "Teacher"], answer: "Bottle" },
      { question: "Which one is a color?", options: ["Blue", "Thursday", "Notebook"], answer: "Blue" },
      { question: "Which month comes after April?", options: ["May", "January", "July"], answer: "May" },
      { question: "What do you usually do after waking up?", options: ["Brush your teeth", "Go to sleep", "Eat dinner"], answer: "Brush your teeth" },
      { question: "Which one is a drink?", options: ["Tea", "Rice", "Chicken"], answer: "Tea" },
      { question: "Where do people keep money?", options: ["School", "Bank", "Restaurant"], answer: "Bank" },
      { question: "Which one is a hobby?", options: ["Swimming", "Hospital", "Window"], answer: "Swimming" },
      { question: "Choose the correct sentence.", options: ["I like reading books", "Books reading I like", "Like books I reading"], answer: "I like reading books" },
      { question: "Where do people go when they are sick?", options: ["Hospital", "Library", "Market"], answer: "Hospital" },
      { question: "What day comes before Friday?", options: ["Thursday", "Sunday", "Monday"], answer: "Thursday" },
      { question: "Read: Sarah eats bread and drinks milk. What does Sarah drink?", options: ["Tea", "Milk", "Coffee"], answer: "Milk" },
      { question: "Read: Kevin plays football every Saturday. What is Kevin’s hobby?", options: ["Reading", "Football", "Cooking"], answer: "Football" },
      { question: "Choose the correct answer: I ___ to school every day.", options: ["go", "goes", "going"], answer: "go" },
      { question: "If someone says 'Nice to meet you', what can you answer?", options: ["Nice to meet you too", "Blue notebook", "I am sleeping"], answer: "Nice to meet you too" },
      {
        question: "Which student is ready for Level 2?",
        options: [
          "A student who understands and uses basic English correctly",
          "A student who answers randomly",
          "A student who skips every lesson",
        ],
        answer: "A student who understands and uses basic English correctly",
      },
    ],
  },
};
