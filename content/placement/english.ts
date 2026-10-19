import type { PlacementContent } from "./types";

const content: PlacementContent = {
  levels: {
    1: [
      ["She ___ a teacher.", "is", "are", "am"],
      ["I ___ from Congo.", "am", "is", "are"],
      ["How many days are there in a week?", "Seven", "Five", "Twelve"],
      ["Choose the correct sentence.", "He has two brothers.", "He have two brothers.", "He haves two brothers."],
      ["What do you say when you meet someone in the morning?", "Good morning", "Good night", "Goodbye"],
      ["This is ___ apple.", "an", "a", "any"],
    ],
    2: [
      ["Yesterday I ___ to the market.", "went", "go", "gone"],
      ["My sister is ___ than me.", "taller", "tallest", "more tall"],
      ["We ___ watching TV when the phone rang.", "were", "was", "are"],
      ["If it rains tomorrow, we ___ at home.", "will stay", "stayed", "staying"],
      ["I haven't seen him ___ Monday.", "since", "for", "from"],
      ["She asked me ___ I lived.", "where", "what", "who"],
    ],
    3: [
      ["If I ___ more time, I would learn Chinese.", "had", "have", "will have"],
      ["The report ___ by the manager before the meeting.", "was reviewed", "was reviewing", "reviews"],
      ["Hardly ___ the office when it began to rain.", "had she left", "she had left", "did she left"],
      ["He suggested ___ the project until next month.", "postponing", "to postpone", "postpone"],
      ["By next year, they ___ the bridge.", "will have built", "will build", "have built"],
      ["Her argument was so ___ that nobody could disagree.", "compelling", "compelled", "compel"],
    ],
  },
  reading: {
    title: "A Saturday at the market",
    paragraphs: [
      "Every Saturday, Grace and her brother Daniel go to the central market in Lubumbashi. They leave home at seven o'clock because the best vegetables are sold early. Grace carries a large basket, and Daniel holds the list that their mother wrote.",
      "At the market, Grace buys tomatoes, onions and fish, while Daniel looks for a new pair of sandals. The seller wants twelve dollars, but Daniel thinks the price is too high. After a friendly discussion, he pays nine dollars and the seller adds a small gift. On the way back, the children are tired but happy, and they promise to return next week.",
    ],
    q: [
      ["Why do Grace and Daniel leave home early?", "The best vegetables are sold early.", "The market closes at eight.", "Their mother is waiting at the market."],
      ["What does Daniel want to buy?", "A pair of sandals", "Fish", "A basket"],
      ["How much does Daniel finally pay?", "Nine dollars", "Twelve dollars", "Three dollars"],
      ["How do the children feel on the way back?", "Tired but happy", "Angry", "Bored and sad"],
    ],
  },
  readAloud:
    "My name is Paul and I work in a small hospital. Every morning I take the bus at half past six. In the evening I like to cook dinner for my family.",
  listening: {
    lines: [
      "Hello, I would like to book a table for Friday evening.",
      "Of course. For how many people?",
      "Five people, at around eight o'clock. One of my friends is vegetarian.",
      "No problem. We have two vegetarian dishes. Can I have your name, please?",
      "Yes, it is Okoye. O, K, O, Y, E.",
      "Thank you. Your table is booked for Friday at eight, for five people.",
    ],
    q: [
      ["For which day is the table booked?", "Friday", "Saturday", "Thursday"],
      ["How many people will come?", "Five", "Four", "Six"],
      ["What does the caller say about one of the friends?", "The friend is vegetarian.", "The friend arrives late.", "The friend cannot come."],
      ["At what time is the booking?", "At eight", "At seven", "At nine"],
    ],
  },
};

export default content;
