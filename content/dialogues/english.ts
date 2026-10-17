import type { RawDialogue } from "./types";

// Quiz conversations (English). Lines alternate speaker A, B, A, B…
// Each question: [question, correct answer, wrong, wrong].
const data: Record<string, RawDialogue> = {
  // ---------------- Level 1 ----------------
  "1-1": {
    lines: [
      "Good morning! My name is Tom. What is your name?",
      "Good morning, Tom. I am Anna. Nice to meet you.",
      "Nice to meet you too. Are you a student?",
      "Yes, I am a student. I live in Kolwezi. And you?",
      "I am a teacher. I live in Lubumbashi.",
      "Great! See you tomorrow, Anna.",
    ],
    q: [
      ["What is speaker B's name?", "Anna", "Tom", "Emma"],
      ["What is Anna's job?", "She is a student", "She is a teacher", "She is a doctor"],
      ["Where does Tom live?", "In Lubumbashi", "In Kolwezi", "In Kinshasa"],
    ],
  },
  "1-2": {
    lines: [
      "Hello. Can you spell your name, please?",
      "Yes. It is S, A, R, A, H. Sarah.",
      "Thank you. And your family name?",
      "It is B, R, O, W, N. Brown.",
      "Perfect. Sarah Brown. Now, what is your email address?",
      "It is sarah dot brown at mail dot com.",
    ],
    q: [
      ["How does Sarah spell her first name?", "S-A-R-A-H", "S-A-R-R-A", "Z-A-R-A-H"],
      ["What is Sarah's family name?", "Brown", "Black", "Green"],
      ["What does speaker A ask for at the end?", "Her email address", "Her phone number", "Her age"],
    ],
  },
  "1-3": {
    lines: [
      "Hi! How old are you?",
      "I am fourteen years old. And you?",
      "I am fifteen. What is your phone number?",
      "It is zero eight one, two three four, five six seven.",
      "Thank you. I will call you on Saturday.",
      "Great! Call me in the morning.",
    ],
    q: [
      ["How old is speaker B?", "Fourteen", "Fifteen", "Sixteen"],
      ["How old is speaker A?", "Fifteen", "Fourteen", "Thirteen"],
      ["When will speaker A call?", "On Saturday", "On Monday", "On Sunday"],
    ],
  },
  "1-4": {
    lines: [
      "Who is the man in this photo?",
      "He is my father. His name is David.",
      "And who is the woman next to him?",
      "She is my mother. I also have two sisters and one brother.",
      "How old is your brother?",
      "He is ten. My sisters are twelve and seventeen.",
    ],
    q: [
      ["Who is David?", "The speaker's father", "The speaker's brother", "The speaker's uncle"],
      ["How many sisters does the speaker have?", "Two", "One", "Three"],
      ["How old is the brother?", "Ten", "Twelve", "Seventeen"],
    ],
  },
  "1-5": {
    lines: [
      "Excuse me, where is my bag?",
      "It is on the table, next to the phone.",
      "Thank you. And my keys?",
      "Your keys are in the blue box, under the chair.",
      "Oh yes, I see them. And my notebook?",
      "It is on the bed. You always forget it!",
    ],
    q: [
      ["Where is the bag?", "On the table", "Under the chair", "On the bed"],
      ["Where are the keys?", "In the blue box", "On the table", "In the bag"],
      ["Where is the notebook?", "On the bed", "On the table", "Under the chair"],
    ],
  },
  "1-6": {
    lines: [
      "Hello! I want to buy a jacket.",
      "Of course. What color do you like?",
      "I like green. But not a dark green, a light green.",
      "We have this light green jacket. It is big, and it is very soft.",
      "It is nice. Do you have it in black too?",
      "Yes, we do. The black one is cheaper.",
    ],
    q: [
      ["What does the customer want to buy?", "A jacket", "A bag", "Shoes"],
      ["What color does the customer prefer first?", "Light green", "Dark green", "Red"],
      ["Which jacket is cheaper?", "The black one", "The green one", "The blue one"],
    ],
  },
  "1-7": {
    lines: [
      "When is your birthday?",
      "It is on the twelfth of March. And yours?",
      "Mine is on the third of July.",
      "What day is the twelfth of March this year?",
      "It is a Friday. We can have a party!",
      "Good idea! I will invite all our friends.",
    ],
    q: [
      ["When is speaker B's birthday?", "March twelfth", "July third", "May twelfth"],
      ["When is speaker A's birthday?", "July third", "March twelfth", "June third"],
      ["What day is the party?", "Friday", "Saturday", "Sunday"],
    ],
  },
  "1-8": {
    lines: [
      "What time do you wake up every day?",
      "I wake up at six. Then I wash and have breakfast.",
      "What time do you go to school?",
      "I leave home at seven and I start class at eight.",
      "And in the evening?",
      "I do my homework, I eat dinner and I go to bed at nine.",
    ],
    q: [
      ["What time does the speaker wake up?", "At six", "At seven", "At eight"],
      ["What time does class start?", "At eight", "At seven", "At nine"],
      ["What does the speaker do before bed?", "Homework and dinner", "Watch television", "Play football"],
    ],
  },
  "1-9": {
    lines: [
      "Good afternoon. What would you like to eat?",
      "I would like rice with chicken, please.",
      "And to drink?",
      "A glass of water. And my friend would like orange juice.",
      "Anything for dessert?",
      "Yes, one banana for me, please. That is all.",
    ],
    q: [
      ["What does the customer order to eat?", "Rice with chicken", "Fish and bread", "Soup"],
      ["What does the friend drink?", "Orange juice", "Water", "Milk"],
      ["What is the dessert?", "A banana", "A cake", "Ice cream"],
    ],
  },
  "1-10": {
    lines: [
      "Excuse me, where is the bank, please?",
      "Go straight, then turn left at the market.",
      "Is it far?",
      "No, it is five minutes on foot. It is next to the pharmacy.",
      "And is there a post office near here?",
      "Yes, the post office is opposite the bank.",
    ],
    q: [
      ["What is speaker A looking for first?", "The bank", "The market", "The school"],
      ["Where must speaker A turn left?", "At the market", "At the pharmacy", "At the post office"],
      ["Where is the post office?", "Opposite the bank", "Next to the market", "Behind the pharmacy"],
    ],
  },
  "1-11": {
    lines: [
      "What do you like to do in your free time?",
      "I love playing football with my friends. And you?",
      "I prefer reading books and listening to music.",
      "Do you like to swim?",
      "Not really, but I like to dance on Sundays.",
      "Then let us dance together next Sunday!",
    ],
    q: [
      ["What does the first speaker love?", "Playing football", "Reading", "Swimming"],
      ["What does the second speaker prefer?", "Reading and music", "Football", "Cooking"],
      ["What do they plan to do on Sunday?", "Dance together", "Play football", "Go swimming"],
    ],
  },
  "1-12": {
    lines: [
      "Hello! Is this your first day at the school?",
      "Yes. My name is Peter. I am twelve years old.",
      "Welcome, Peter! I am Grace. Where do you live?",
      "I live near the market, in a green house.",
      "My class starts at eight. Do you like English?",
      "Yes, it is my favorite subject. Let us sit together!",
    ],
    q: [
      ["Whose first day is it?", "Peter's", "Grace's", "The teacher's"],
      ["Where does Peter live?", "Near the market", "Near the bank", "Near the school"],
      ["What is Peter's favorite subject?", "English", "Math", "Music"],
    ],
  },
  "1-final": {
    lines: [
      "Hi, I am Julie. I am new in this neighborhood.",
      "Welcome, Julie! I am Marc. Where are you from?",
      "I am from Lubumbashi. I am sixteen years old. And you?",
      "I am seventeen. I live with my mother, my father and two brothers.",
      "Do you have any hobbies? I love basketball on Saturdays.",
      "I like drawing and cooking. Tomorrow I want to cook rice and fish.",
      "That sounds great! Can I have your phone number?",
      "Of course. It is zero nine nine, one one one, two two two.",
    ],
    q: [
      ["Where is Julie from?", "Lubumbashi", "Kolwezi", "Kinshasa"],
      ["How old is Marc?", "Seventeen", "Sixteen", "Fifteen"],
      ["What does Marc love on Saturdays?", "Basketball", "Cooking", "Drawing"],
      ["What does Julie want to cook tomorrow?", "Rice and fish", "Chicken and bread", "Soup"],
    ],
  },

  // ---------------- Level 2 ----------------
  "2-1": {
    lines: [
      "Did you finish the report that I asked for?",
      "Not yet. I have been working on it since this morning.",
      "If you had told me earlier, I would have helped you.",
      "I know, but I thought I could finish it alone.",
      "Well, send it to me when it is ready, and I will check the grammar.",
      "Thanks. I will send it before lunch.",
    ],
    q: [
      ["Has speaker B finished the report?", "No, not yet", "Yes, she has", "She has not started"],
      ["What would speaker A have done earlier?", "Helped her", "Written it himself", "Cancelled it"],
      ["What will speaker A check?", "The grammar", "The numbers", "The pictures"],
    ],
  },
  "2-2": {
    lines: [
      "What did you do last weekend?",
      "I visited my grandparents. We cooked together and watched old films.",
      "That sounds lovely. I stayed home and finished a book.",
      "What are you going to do next weekend?",
      "I am going to travel to Likasi to see a football match.",
      "Then I will probably come with you, if there is a ticket for me.",
    ],
    q: [
      ["What did the first speaker do last weekend?", "Visited grandparents", "Finished a book", "Went to a match"],
      ["What did the second speaker do?", "Stayed home and read", "Traveled", "Cooked for friends"],
      ["Where will the match be?", "In Likasi", "In Kolwezi", "In Kinshasa"],
    ],
  },
  "2-3": {
    lines: [
      "Hi, I do not think we have met. I am Daniel.",
      "Nice to meet you, Daniel. I am Rose. How do you know the host?",
      "We studied together at university. And you?",
      "I work with her at the clinic. What do you do?",
      "I am an engineer. I design water systems for villages.",
      "That is really interesting. Tell me more about it!",
    ],
    q: [
      ["How does Daniel know the host?", "They studied together", "They are neighbors", "They work together"],
      ["Where does Rose work?", "At a clinic", "At a school", "At a bank"],
      ["What does Daniel do?", "He designs water systems", "He builds houses", "He teaches English"],
    ],
  },
  "2-4": {
    lines: [
      "Could you look at this email before I send it to the manager?",
      "Of course. The first sentence is a bit long. Try to shorten it.",
      "Should I start with 'Dear Sir' or with his name?",
      "Use his name, Mr. Lewis. And end with 'Kind regards'.",
      "What about the subject line?",
      "Make it clear: 'Request for a meeting on Thursday'.",
    ],
    q: [
      ["What is the email for?", "Asking for a meeting", "Complaining about a price", "Saying thank you"],
      ["How should the email begin?", "With the manager's name", "With 'Hello friend'", "With no greeting"],
      ["On which day is the meeting?", "Thursday", "Tuesday", "Friday"],
    ],
  },
  "2-5": {
    lines: [
      "Attention please. The train to Lubumbashi is delayed by forty minutes.",
      "Did you hear that? Our train will leave at ten past three.",
      "So we have time for a coffee. Which platform is it?",
      "The announcement said platform four.",
      "Let us wait in the cafe, then. I am hungry anyway.",
      "Good idea. We will go to the platform at three.",
    ],
    q: [
      ["How late is the train?", "Forty minutes", "Ten minutes", "One hour"],
      ["Which platform does the train leave from?", "Platform four", "Platform two", "Platform five"],
      ["What do they decide to do?", "Wait in the cafe", "Take a taxi", "Go home"],
    ],
  },
  "2-6": {
    lines: [
      "Have you read the article about the new library in the city?",
      "Yes. It says the library will open in September and will have free internet.",
      "I like that students can borrow tablets there too.",
      "The writer also says it will stay open until ten every night.",
      "I think I will study there. It is quieter than my house.",
      "Me too. I hope there are enough places to sit!",
    ],
    q: [
      ["When will the library open?", "In September", "In January", "In June"],
      ["What can students borrow?", "Tablets", "Laptops", "Phones"],
      ["Until what time will it stay open?", "Ten at night", "Six in the evening", "Midnight"],
    ],
  },
  "2-7": {
    lines: [
      "How did you feel about the film last night?",
      "Honestly, I was disappointed. The story was predictable.",
      "Really? I found it exciting, and the music was wonderful.",
      "In my opinion, the actors were not convincing.",
      "I disagree. The main actress was fantastic, and the ending surprised me.",
      "Well, we have different tastes. Next time you choose the film.",
    ],
    q: [
      ["How did the first speaker feel about the film?", "Disappointed", "Delighted", "Bored by the music"],
      ["What did the second speaker like most?", "The music and the actress", "The price", "The cinema"],
      ["What do they agree on at the end?", "The other chooses next time", "To watch it again", "To read the book"],
    ],
  },
  "2-8": {
    lines: [
      "Listen carefully: the word is 'thought', not 'taught'.",
      "Thought. Is that better?",
      "Almost. Put your tongue between your teeth for the 'th' sound.",
      "Thought... thought. I can feel the difference.",
      "Good. Now repeat the sentence: 'I thought about the three thick books'.",
      "I thought about the three thick books. Was that correct?",
    ],
    q: [
      ["Which word does the teacher correct?", "Thought", "Taught", "Three"],
      ["Where should the student put the tongue?", "Between the teeth", "Behind the lips", "Under the mouth"],
      ["What must the student repeat?", "A full sentence", "The alphabet", "A number"],
    ],
  },
  "2-9": {
    lines: [
      "Excuse me, this soup is cold. I ordered it hot.",
      "I am very sorry, madam. I will bring you a new one right away.",
      "Thank you. And could we have the bill, please?",
      "Certainly. Would you like to pay by card or in cash?",
      "By card. Is the service included?",
      "Yes, it is included. Thank you for your patience.",
    ],
    q: [
      ["What is the problem?", "The soup is cold", "The meal is too salty", "The table is dirty"],
      ["What will the waiter do?", "Bring a new soup", "Offer a discount", "Call the manager"],
      ["How will the customer pay?", "By card", "In cash", "By phone"],
    ],
  },
  "2-10": {
    lines: [
      "Good morning, Mr. Okafor. Thank you for coming to our office.",
      "Thank you for having me. I would like to present our company's new product.",
      "Please begin. We have thirty minutes before the next meeting.",
      "It is a solar lamp. It lasts ten hours and costs very little.",
      "How soon can you deliver two hundred lamps?",
      "In three weeks. I will send you a written offer tomorrow.",
    ],
    q: [
      ["What is the product?", "A solar lamp", "A phone", "A water pump"],
      ["How many lamps does the client want?", "Two hundred", "One hundred", "Twelve"],
      ["When will Mr. Okafor send the offer?", "Tomorrow", "Next month", "Today"],
    ],
  },
  "2-11": {
    lines: [
      "I believe working from home is better. You save time and money.",
      "I see your point, but I disagree. At home it is hard to concentrate.",
      "That depends on the person. I am more productive without noise.",
      "But teams communicate better when they meet every day.",
      "We could combine both: three days at the office, two days at home.",
      "That is a fair compromise. I could accept that.",
    ],
    q: [
      ["What does the first speaker prefer?", "Working from home", "Working at the office", "Not working"],
      ["Why does the second speaker disagree?", "It is hard to concentrate at home", "It costs too much", "There is no internet"],
      ["What compromise do they find?", "Three days office, two days home", "Five days at home", "Five days at the office"],
    ],
  },
  "2-12": {
    lines: [
      "Tomorrow I have a job interview. Can you help me practice?",
      "Sure. First question: why do you want to work for this company?",
      "Because it helps young people learn skills, and I like teaching.",
      "Good. Now, what is your biggest strength?",
      "I am patient, and I work well in a team.",
      "Excellent. Stay calm, smile, and speak slowly tomorrow.",
    ],
    q: [
      ["What is speaker A preparing for?", "A job interview", "An exam", "A trip"],
      ["Why does speaker A want to work for the company?", "It helps young people learn", "It pays the most", "It is close to home"],
      ["What advice does the friend give at the end?", "Stay calm and speak slowly", "Arrive late", "Talk very fast"],
    ],
  },
  "2-final": {
    lines: [
      "Are you free this weekend? I would like to plan a trip.",
      "Yes, I am free on Saturday. Where do you want to go?",
      "I was thinking about the lake. We could leave early in the morning.",
      "How far is it? Last time I traveled for three hours and I was exhausted.",
      "It is only ninety minutes by bus. We can take sandwiches and juice.",
      "In my opinion, we should also bring a hat. It was very hot last year.",
      "Good point. Shall we invite Maria and John?",
      "Yes, but let us ask them tonight. The bus leaves at seven.",
    ],
    q: [
      ["Where do they want to go?", "To the lake", "To the mountain", "To the market"],
      ["How long is the bus ride?", "Ninety minutes", "Three hours", "Thirty minutes"],
      ["What should they bring in addition to food?", "A hat", "An umbrella", "A camera"],
      ["What time does the bus leave?", "Seven", "Six", "Eight"],
    ],
  },

  // ---------------- Level 3 ----------------
  "3-1": {
    lines: [
      "If we sign the contract today, when could you start the delivery?",
      "If you confirm the order by noon, we could start on Monday.",
      "And if the shipment were delayed, would you offer compensation?",
      "Yes. If it were delayed by more than a week, we would give a five percent discount.",
      "That is acceptable. Unless there are other conditions, we will sign.",
      "I will send the final version this afternoon.",
    ],
    q: [
      ["When could delivery start if the order is confirmed by noon?", "On Monday", "On Friday", "Next month"],
      ["What is offered for a delay of more than a week?", "A five percent discount", "A full refund", "A free product"],
      ["When will the final version be sent?", "This afternoon", "Tomorrow morning", "Next week"],
    ],
  },
  "3-2": {
    lines: [
      "You must submit the compliance form before the end of the month.",
      "Do I have to attach the financial statements as well?",
      "Yes, you should include them. You do not need to send the old invoices.",
      "May I send it electronically, or must it be signed on paper?",
      "You can send it electronically, but the director must sign it first.",
      "Understood. I should be able to finish by Thursday.",
    ],
    q: [
      ["When is the form due?", "End of the month", "Next week", "Tomorrow"],
      ["What is not required?", "The old invoices", "The financial statements", "A signature"],
      ["Who must sign the form?", "The director", "The accountant", "The client"],
    ],
  },
  "3-3": {
    lines: [
      "Our price is thirty thousand dollars for the whole package.",
      "That is higher than our budget. We could offer twenty-four thousand.",
      "I cannot go that low, but I could include free training for your staff.",
      "That is interesting. What if we pay half now and half in sixty days?",
      "I could agree to that, with a two percent fee on the second payment.",
      "Then we have a deal at twenty-eight thousand. Let us write it down.",
    ],
    q: [
      ["What was the first price?", "Thirty thousand dollars", "Twenty-four thousand", "Twenty-eight thousand"],
      ["What extra does the seller offer?", "Free training", "Free delivery", "A second product"],
      ["What is the final price?", "Twenty-eight thousand dollars", "Thirty thousand dollars", "Twenty-four thousand dollars"],
    ],
  },
  "3-4": {
    lines: [
      "Let us rehearse your presentation. You have ten minutes. Begin when you are ready.",
      "Good morning, everyone. Today I will show you our sales results for the year.",
      "A strong opening. Remember to pause after each key figure.",
      "Should I use the graph on the second slide first?",
      "Yes, then move to the table. Keep your slides simple and look at the audience.",
      "Understood. I will also prepare answers for questions about costs.",
    ],
    q: [
      ["How long is the presentation?", "Ten minutes", "Thirty minutes", "One hour"],
      ["What is the topic?", "The year's sales results", "A new employee", "The office move"],
      ["What does the coach advise?", "Keep slides simple and look at the audience", "Read every word", "Avoid graphs"],
    ],
  },
  "3-5": {
    lines: [
      "Thank you all for coming. The first point on the agenda is the budget.",
      "I propose we increase the training budget by ten percent.",
      "Is everybody in favor? Please raise your hand.",
      "Seven in favor, one against. The proposal is adopted.",
      "I will take the minutes and circulate them tomorrow morning.",
      "Please also add the next meeting date: the fifteenth at nine o'clock.",
    ],
    q: [
      ["What is the first point on the agenda?", "The budget", "Hiring", "The new office"],
      ["What is the result of the vote?", "Seven for, one against", "Five for, three against", "All against"],
      ["When is the next meeting?", "The fifteenth at nine", "The fifth at nine", "The fifteenth at ten"],
    ],
  },
  "3-6": {
    lines: [
      "I am writing the quarterly report. How should I structure it?",
      "Start with an executive summary of half a page, with the main results.",
      "Then the analysis, with tables, and finally your recommendations.",
      "Should the proposal for the new warehouse be inside the report?",
      "No, make it a separate document. Include costs, a timeline and the risks.",
      "Good. I will send both documents to you by Friday.",
    ],
    q: [
      ["How should the report begin?", "With an executive summary", "With the recommendations", "With the tables"],
      ["What should be a separate document?", "The warehouse proposal", "The summary", "The tables"],
      ["When will the documents be sent?", "By Friday", "By Monday", "Today"],
    ],
  },
  "3-7": {
    lines: [
      "Hello, can you hear me? Your screen is frozen on my side.",
      "I can hear you, but the image is slow. Let me turn off my camera.",
      "Better. Can you share your presentation now?",
      "Yes, sharing now. Can you see the first slide?",
      "Yes, clearly. Please mute your microphone while I ask a question.",
      "Sorry, I was typing. Please go ahead.",
    ],
    q: [
      ["What is the problem at the start?", "The image is frozen or slow", "No one can hear", "The call is cancelled"],
      ["What does the speaker turn off?", "The camera", "The microphone", "The screen"],
      ["Why is the speaker asked to mute?", "A question will be asked", "There is an echo", "The meeting is over"],
    ],
  },
  "3-8": {
    lines: [
      "Hello, I am Amina from a logistics company. Is this your first conference?",
      "No, it is my third. I am Peter, I work in renewable energy.",
      "Interesting. We often transport solar panels. We might work together.",
      "I would love that. Do you have a business card?",
      "Of course. Let us have coffee tomorrow and discuss it in detail.",
      "Perfect. I will email you tonight to confirm the time.",
    ],
    q: [
      ["What does Amina's company do?", "Logistics", "Banking", "Education"],
      ["Which conference is this for Peter?", "His third", "His first", "His second"],
      ["What will Amina do tonight?", "Email Peter", "Call Peter", "Write a report"],
    ],
  },
  "3-9": {
    lines: [
      "The shipment is five days late and the client is very unhappy.",
      "What caused the delay?",
      "A problem at customs. The documents were incomplete.",
      "We need two solutions: first, fix the documents today; second, send a small part by air.",
      "Air freight is expensive. How much would it cost?",
      "About two thousand dollars. I think it is worth it to keep the client.",
    ],
    q: [
      ["How late is the shipment?", "Five days", "Two days", "One month"],
      ["What caused the delay?", "Incomplete documents at customs", "A strike", "Bad weather"],
      ["How much would air freight cost?", "About two thousand dollars", "About five hundred dollars", "About twenty thousand dollars"],
    ],
  },
  "3-10": {
    lines: [
      "My partner invited me to dinner, but I do not know how to behave.",
      "In their culture, it is polite to arrive a little late, never exactly on time.",
      "And should I bring a gift?",
      "A small gift is appreciated, like fruit or sweets. Avoid giving something expensive.",
      "Is it rude to refuse food?",
      "Yes, it is better to try a little of everything and say thank you.",
    ],
    q: [
      ["When should the guest arrive?", "A little late", "Very early", "Exactly on time"],
      ["What gift is appreciated?", "Fruit or sweets", "Money", "An expensive watch"],
      ["What is the advice about food?", "Try a little of everything", "Refuse politely", "Eat before going"],
    ],
  },
  "3-11": {
    lines: [
      "Two members of my team are in conflict and it affects the whole group.",
      "First, talk to each of them separately and listen without judging.",
      "Then bring them together and focus on solutions, not on blame.",
      "What if they cannot agree?",
      "Set clear goals, divide responsibilities, and review progress every week.",
      "Thank you. I will schedule the meeting for Wednesday.",
    ],
    q: [
      ["What is the problem?", "Two team members are in conflict", "Sales are down", "A manager resigned"],
      ["What should the manager do first?", "Talk to each person separately", "Fire one of them", "Ignore it"],
      ["When will the meeting be?", "On Wednesday", "On Monday", "On Friday"],
    ],
  },
  "3-12": {
    lines: [
      "Thank you for meeting us. We would like to renew our contract for two more years.",
      "We are pleased to hear that. May I suggest a few updates to the terms?",
      "Certainly. Our priorities are faster delivery and a monthly report.",
      "We can guarantee delivery in ten days, and I will send you a report every month.",
      "In return, we would accept a small increase in the price.",
      "That is fair. Let us finalize the details and sign next week.",
    ],
    q: [
      ["What does the client want to do?", "Renew the contract for two years", "Cancel the contract", "Buy a new product"],
      ["What is the guaranteed delivery time?", "Ten days", "Two days", "One month"],
      ["What will the client accept in return?", "A small price increase", "A longer delay", "Less service"],
    ],
  },
  "3-final": {
    lines: [
      "Good morning. Let us review the results of the last quarter.",
      "Sales rose by twelve percent, mainly thanks to the new customers in the north.",
      "If we keep this rhythm, could we reach our annual target?",
      "Yes, provided that we hire two more people for customer service.",
      "What are the main risks for the next quarter?",
      "Higher transport costs and a possible delay with our main supplier.",
      "Then I propose we contact a second supplier and prepare a contingency plan.",
      "Agreed. I will present the plan to the board on the twentieth.",
    ],
    q: [
      ["By how much did sales rise?", "Twelve percent", "Two percent", "Twenty percent"],
      ["What is needed to reach the annual target?", "Two more people in customer service", "A new office", "A lower price"],
      ["What risk is mentioned?", "Higher transport costs", "A new competitor", "A strike"],
      ["When will the plan be presented to the board?", "On the twentieth", "On the tenth", "Next year"],
    ],
  },
};

export default data;
