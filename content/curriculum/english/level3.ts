import type { LevelCurriculum } from "../types";

// New content authored for Phase 4 of the site restructuring plan. The
// original app/academy/level3/page.tsx was a one-line placeholder
// ("Welcome to Level 3 courses") with no lessons at all.
export const englishLevel3: LevelCurriculum = {
  langCode: "EN",
  langLabel: "Anglais",
  langSlug: "english",
  level: 3,
  levelTitle: "Level 3 - Business English",
  levelSubtitle: "Professional communication, presentations, and workplace English.",

  lessons: [
    {
      id: 1,
      title: "Conditionals for Business",
      subtitle: "Use conditional sentences to talk about possibilities and consequences at work.",
      sections: [
        {
          heading: "First Conditional (real possibility)",
          body: [
            "If + present simple, will + verb.",
            "If we finish the report early, we will send it today.",
            "If the client calls, I will answer immediately.",
          ],
        },
        {
          heading: "Second Conditional (unlikely or hypothetical)",
          body: [
            "If + past simple, would + verb.",
            "If I had more time, I would review the proposal again.",
            "If she were the manager, she would change the schedule.",
          ],
        },
        {
          heading: "Business Uses",
          body: [
            "Conditionals are common in negotiations and planning.",
            "If you reduce the price, we will sign the contract.",
            "If the market grows, we would consider expanding.",
          ],
        },
      ],
      speakText: `First conditional, for real possibility.

If we finish the report early, we will send it today. If the client calls, I will answer immediately.

Second conditional, for unlikely or hypothetical situations.

If I had more time, I would review the proposal again. If she were the manager, she would change the schedule.

Business uses.

Conditionals are common in negotiations and planning. If you reduce the price, we will sign the contract.`,
      videoTopic: "Compare first and second conditional sentences in a business negotiation.",
      readingTitle: "A Negotiation at Brightened Mind Corporation",
      reading: [
        "During the meeting, the supplier said, “If you order more units, we will offer a discount.”",
        "The manager replied, “If we had a bigger budget this quarter, we would order double the amount right now.”",
        "Both sides continued discussing until they reached an agreement that worked for everyone.",
        "By the end of the meeting, they had signed a new contract.",
      ],
      readingSpeakText: `A negotiation at Brightened Mind Corporation.

During the meeting, the supplier said, if you order more units, we will offer a discount.

The manager replied, if we had a bigger budget this quarter, we would order double the amount right now.

Both sides continued discussing until they reached an agreement that worked for everyone.

By the end of the meeting, they had signed a new contract.`,
      exercises: [
        "Write a first conditional sentence about a work deadline.",
        "Write a second conditional sentence about a hypothetical promotion.",
        "Rewrite 'We will expand if the market grows' using a different order.",
        "Explain the difference between the first and second conditional.",
      ],
      speakingTopic: "Describe a decision at work using both a first and a second conditional sentence.",
    },
    {
      id: 2,
      title: "Modal Verbs for Business",
      subtitle: "Use modal verbs to express obligation, advice, and possibility professionally.",
      sections: [
        {
          heading: "Obligation and Necessity",
          body: [
            "Must / have to: a strong obligation.",
            "All staff must submit the report by Friday.",
            "You have to sign the agreement before starting.",
          ],
        },
        {
          heading: "Advice and Suggestion",
          body: [
            "Should / ought to: giving advice.",
            "You should double-check the figures before sending.",
            "We ought to inform the client about the delay.",
          ],
        },
        {
          heading: "Possibility",
          body: [
            "Might / could / may: something is possible but not certain.",
            "The deadline might change next week.",
            "We could consider a different supplier.",
          ],
        },
      ],
      speakText: `Obligation and necessity.

Must and have to express a strong obligation. All staff must submit the report by Friday. You have to sign the agreement before starting.

Advice and suggestion.

Should and ought to are used for giving advice. You should double check the figures before sending.

Possibility.

Might, could, and may show something is possible but not certain. The deadline might change next week.`,
      videoTopic: "Hear the difference between obligation, advice, and possibility in a workplace context.",
      readingTitle: "Preparing for the Audit",
      reading: [
        "The finance manager said, “We must finish the audit documents by Monday.”",
        "She added, “You should also prepare a short summary for the director.”",
        "One employee asked if the deadline might change, but the manager said it was unlikely.",
        "In the end, the team finished everything on time and avoided any last-minute stress.",
      ],
      readingSpeakText: `Preparing for the audit.

The finance manager said, we must finish the audit documents by Monday.

She added, you should also prepare a short summary for the director.

One employee asked if the deadline might change, but the manager said it was unlikely.

In the end, the team finished everything on time and avoided any last-minute stress.`,
      exercises: [
        "Write one sentence using 'must' about a work obligation.",
        "Write one sentence using 'should' to give advice to a colleague.",
        "Write one sentence using 'might' about an uncertain plan.",
        "Explain the difference between 'must' and 'should'.",
      ],
      speakingTopic: "Give a colleague advice and a strict obligation using modal verbs.",
    },
    {
      id: 3,
      title: "Negotiation Language",
      subtitle: "Learn phrases used to negotiate prices, deadlines, and agreements.",
      sections: [
        {
          heading: "Opening a Negotiation",
          body: [
            "We would like to discuss the terms of the contract.",
            "Let's talk about what we can offer each other.",
          ],
        },
        {
          heading: "Making an Offer",
          body: [
            "We can offer you a 10% discount for a larger order.",
            "Our best offer is...",
            "We are willing to extend the deadline by one week.",
          ],
        },
        {
          heading: "Responding and Compromising",
          body: [
            "That sounds reasonable, but could you also...",
            "We can meet you halfway.",
            "Let's find a solution that works for both sides.",
          ],
        },
        {
          heading: "Closing a Deal",
          body: [
            "I think we have an agreement.",
            "Let's put this in writing.",
            "We look forward to working with you.",
          ],
        },
      ],
      speakText: `Opening a negotiation.

We would like to discuss the terms of the contract. Let's talk about what we can offer each other.

Making an offer.

We can offer you a ten percent discount for a larger order. Our best offer is... We are willing to extend the deadline by one week.

Responding and compromising.

That sounds reasonable, but could you also... We can meet you halfway.

Closing a deal.

I think we have an agreement. Let's put this in writing.`,
      videoTopic: "Watch a full negotiation from opening to closing the deal.",
      readingTitle: "Closing the Deal",
      reading: [
        "The two companies negotiated for almost two hours about the price of the new equipment.",
        "At first, the buyer said the price was too high, but the seller offered a 10% discount for a larger order.",
        "The buyer responded, “That sounds reasonable, but could you also include free delivery?”",
        "The seller agreed, and both sides shook hands, saying, “We look forward to working with you.”",
      ],
      readingSpeakText: `Closing the deal.

The two companies negotiated for almost two hours about the price of the new equipment.

At first, the buyer said the price was too high, but the seller offered a ten percent discount for a larger order.

The buyer responded, that sounds reasonable, but could you also include free delivery?

The seller agreed, and both sides shook hands, saying, we look forward to working with you.`,
      exercises: [
        "Write an opening sentence for a negotiation.",
        "Write a sentence making an offer with a discount.",
        "Write a sentence that compromises between two positions.",
        "Write a closing sentence for a successful negotiation.",
      ],
      speakingTopic: "Role-play a short negotiation about price and delivery time with a partner.",
    },
    {
      id: 4,
      title: "Presentation Skills",
      subtitle: "Learn the language to structure and deliver a clear professional presentation.",
      sections: [
        {
          heading: "Opening a Presentation",
          body: [
            "Good morning everyone, thank you for being here.",
            "Today, I am going to talk about...",
            "The presentation will take about 15 minutes, followed by questions.",
          ],
        },
        {
          heading: "Structuring Your Points",
          body: [
            "First, I'll explain... Then, I'll move on to... Finally, I'll conclude with...",
            "Let's move to the next slide.",
            "As you can see on this chart...",
          ],
        },
        {
          heading: "Closing a Presentation",
          body: [
            "To summarize, the key points are...",
            "Thank you for your attention.",
            "Are there any questions?",
          ],
        },
      ],
      speakText: `Opening a presentation.

Good morning everyone, thank you for being here. Today, I am going to talk about... The presentation will take about fifteen minutes, followed by questions.

Structuring your points.

First, I'll explain... Then, I'll move on to... Finally, I'll conclude with... Let's move to the next slide. As you can see on this chart...

Closing a presentation.

To summarize, the key points are... Thank you for your attention. Are there any questions?`,
      videoTopic: "Watch a short, well-structured professional presentation.",
      readingTitle: "Linda's First Presentation",
      reading: [
        "Linda was nervous before her first presentation to the management team.",
        "She started by saying, “Good morning everyone, thank you for being here.”",
        "She structured her talk clearly: first the problem, then her solution, and finally the results.",
        "At the end, she said, “To summarize, the key points are cost reduction and faster delivery. Thank you for your attention. Are there any questions?”",
        "The team was impressed by how clear and organized her presentation was.",
      ],
      readingSpeakText: `Linda's first presentation.

Linda was nervous before her first presentation to the management team.

She started by saying, good morning everyone, thank you for being here.

She structured her talk clearly: first the problem, then her solution, and finally the results.

At the end, she said, to summarize, the key points are cost reduction and faster delivery. Thank you for your attention. Are there any questions?

The team was impressed by how clear and organized her presentation was.`,
      exercises: [
        "Write an opening line for a presentation about your work.",
        "Write three transition phrases to move between points.",
        "Write a closing line that invites questions.",
        "Plan a 1-minute presentation about your favorite project.",
      ],
      speakingTopic: "Give a short 1-minute presentation about a topic of your choice.",
    },
    {
      id: 5,
      title: "Formal Meetings and Minutes",
      subtitle: "Learn to participate in meetings and write a summary of what was discussed.",
      sections: [
        {
          heading: "During a Meeting",
          body: [
            "Shall we begin?",
            "Can everyone hear me clearly?",
            "I'd like to raise a point.",
            "Can we come back to this later?",
          ],
        },
        {
          heading: "Taking the Floor",
          body: [
            "May I say something?",
            "If I may add...",
            "Sorry to interrupt, but...",
          ],
        },
        {
          heading: "Writing Meeting Minutes",
          body: [
            "Minutes record what was discussed and decided in a meeting.",
            "Attendees: who was present.",
            "Agenda: the list of topics discussed.",
            "Action items: tasks assigned, with who is responsible and the deadline.",
          ],
        },
      ],
      speakText: `During a meeting.

Shall we begin? Can everyone hear me clearly? I'd like to raise a point. Can we come back to this later?

Taking the floor.

May I say something? If I may add... Sorry to interrupt, but...

Writing meeting minutes.

Minutes record what was discussed and decided in a meeting. Attendees means who was present. Agenda means the list of topics discussed. Action items are tasks assigned, with who is responsible and the deadline.`,
      videoTopic: "See how a formal meeting is run from start to finish.",
      readingTitle: "The Monday Meeting",
      reading: [
        "At 9 a.m., the team leader said, “Shall we begin?” and everyone agreed.",
        "During the discussion, Peter said, “If I may add, I think we should also review the budget.”",
        "After the meeting, the secretary wrote the minutes, listing the attendees, the agenda, and three action items with deadlines.",
        "Everyone received a copy of the minutes by email the same day.",
      ],
      readingSpeakText: `The Monday meeting.

At nine a.m., the team leader said, shall we begin? And everyone agreed.

During the discussion, Peter said, if I may add, I think we should also review the budget.

After the meeting, the secretary wrote the minutes, listing the attendees, the agenda, and three action items with deadlines.

Everyone received a copy of the minutes by email the same day.`,
      exercises: [
        "Write a sentence to politely interrupt a meeting.",
        "Write a sentence to ask to add a point.",
        "List the four parts of meeting minutes.",
        "Write one example action item with a responsible person and a deadline.",
      ],
      speakingTopic: "Run a short mock meeting with a partner and practice taking the floor politely.",
    },
    {
      id: 6,
      title: "Business Writing: Reports and Proposals",
      subtitle: "Learn the structure of a professional report or proposal.",
      sections: [
        {
          heading: "Report Structure",
          body: [
            "Introduction: the purpose of the report.",
            "Findings: the facts and data.",
            "Conclusion: a summary of what was found.",
            "Recommendations: suggested next steps.",
          ],
        },
        {
          heading: "Useful Phrases",
          body: [
            "The purpose of this report is to...",
            "The data shows that...",
            "Based on these findings, we recommend...",
            "In conclusion, ...",
          ],
        },
      ],
      speakText: `Report structure.

Introduction explains the purpose of the report. Findings present the facts and data. Conclusion summarizes what was found. Recommendations suggest next steps.

Useful phrases.

The purpose of this report is to... The data shows that... Based on these findings, we recommend... In conclusion...`,
      videoTopic: "See how a business report is organized from introduction to recommendations.",
      readingTitle: "A Report on Customer Satisfaction",
      reading: [
        "The purpose of this report is to evaluate customer satisfaction over the last quarter.",
        "The data shows that 85% of customers were satisfied with the service, an increase from last year.",
        "However, some customers mentioned that response times could be faster.",
        "Based on these findings, we recommend hiring two more support staff.",
        "In conclusion, customer satisfaction is improving, but small changes could make it even better.",
      ],
      readingSpeakText: `A report on customer satisfaction.

The purpose of this report is to evaluate customer satisfaction over the last quarter.

The data shows that eighty five percent of customers were satisfied with the service, an increase from last year.

However, some customers mentioned that response times could be faster.

Based on these findings, we recommend hiring two more support staff.

In conclusion, customer satisfaction is improving, but small changes could make it even better.`,
      exercises: [
        "Write a one-sentence introduction for a report about your work.",
        "Write a sentence presenting a finding using 'The data shows that...'.",
        "Write a recommendation using 'we recommend'.",
        "Write a short conclusion (2 sentences) for an imaginary report.",
      ],
      speakingTopic: "Summarize a short report you imagine writing about your team's performance.",
    },
    {
      id: 7,
      title: "Telephone and Video Call English",
      subtitle: "Learn phrases for professional phone and video calls.",
      sections: [
        {
          heading: "Starting a Call",
          body: [
            "Hello, this is [name] from Brightened Mind Corporation.",
            "I'm calling about...",
            "Is this a good time to talk?",
          ],
        },
        {
          heading: "During the Call",
          body: [
            "Could you repeat that, please?",
            "I'm sorry, the line isn't very clear.",
            "Let me just check that and get back to you.",
            "Can you hear me okay?",
          ],
        },
        {
          heading: "Ending a Call",
          body: [
            "Thank you for your time.",
            "I'll send you an email to confirm.",
            "Talk to you soon. Goodbye.",
          ],
        },
      ],
      speakText: `Starting a call.

Hello, this is... from Brightened Mind Corporation. I'm calling about... Is this a good time to talk?

During the call.

Could you repeat that, please? I'm sorry, the line isn't very clear. Let me just check that and get back to you. Can you hear me okay?

Ending a call.

Thank you for your time. I'll send you an email to confirm. Talk to you soon. Goodbye.`,
      videoTopic: "Listen to a professional phone call from start to finish.",
      readingTitle: "A Client Phone Call",
      reading: [
        "“Hello, this is Sarah from Brightened Mind Corporation. I'm calling about your recent order.”",
        "The client's connection was not very clear, so Sarah said, “I'm sorry, the line isn't very clear, could you repeat that, please?”",
        "After solving the issue, Sarah said, “Thank you for your time, I'll send you an email to confirm everything.”",
        "The client thanked her, and they ended the call politely.",
      ],
      readingSpeakText: `A client phone call.

Hello, this is Sarah from Brightened Mind Corporation. I'm calling about your recent order.

The client's connection was not very clear, so Sarah said, I'm sorry, the line isn't very clear, could you repeat that, please?

After solving the issue, Sarah said, thank you for your time, I'll send you an email to confirm everything.

The client thanked her, and they ended the call politely.`,
      exercises: [
        "Write how you would start a professional phone call.",
        "Write a sentence to ask someone to repeat themselves.",
        "Write a sentence to politely end a call.",
        "Practice a short phone call dialogue with a partner.",
      ],
      speakingTopic: "Role-play a phone call introducing yourself and explaining why you are calling.",
    },
    {
      id: 8,
      title: "Networking and Small Talk",
      subtitle: "Learn to make a good professional impression in informal conversations.",
      sections: [
        {
          heading: "Starting Small Talk",
          body: [
            "So, how do you know the organizers?",
            "What line of work are you in?",
            "Have you been to one of these events before?",
          ],
        },
        {
          heading: "Exchanging Contact Information",
          body: [
            "It was great talking to you. Could I have your business card?",
            "Let's connect on LinkedIn.",
            "I'll follow up with you by email next week.",
          ],
        },
        {
          heading: "Safe Topics vs. Topics to Avoid",
          body: [
            "Safe: work, industry trends, the event itself, travel.",
            "Avoid: salary, politics, personal problems, religion.",
          ],
        },
      ],
      speakText: `Starting small talk.

So, how do you know the organizers? What line of work are you in? Have you been to one of these events before?

Exchanging contact information.

It was great talking to you. Could I have your business card? Let's connect on LinkedIn. I'll follow up with you by email next week.

Safe topics versus topics to avoid.

Safe topics include work, industry trends, the event itself, and travel. Topics to avoid include salary, politics, personal problems, and religion.`,
      videoTopic: "See a natural networking conversation at a business event.",
      readingTitle: "Meeting Someone New at a Conference",
      reading: [
        "At the conference, Michael introduced himself to a stranger standing near the coffee table.",
        "He asked, “What line of work are you in?” and they discovered they worked in similar industries.",
        "They talked about industry trends and travel for about ten minutes.",
        "Before leaving, Michael said, “It was great talking to you, could I have your business card? Let's connect on LinkedIn.”",
      ],
      readingSpeakText: `Meeting someone new at a conference.

At the conference, Michael introduced himself to a stranger standing near the coffee table.

He asked, what line of work are you in? And they discovered they worked in similar industries.

They talked about industry trends and travel for about ten minutes.

Before leaving, Michael said, it was great talking to you, could I have your business card? Let's connect on LinkedIn.`,
      exercises: [
        "Write two small talk questions you could ask at a business event.",
        "Write a sentence to ask for someone's contact information.",
        "List two safe topics and two topics to avoid.",
        "Practice a short networking conversation with a partner.",
      ],
      speakingTopic: "Practice introducing yourself and making small talk at an imaginary networking event.",
    },
    {
      id: 9,
      title: "Problem Solving and Decision Making",
      subtitle: "Learn language for identifying problems and making decisions at work.",
      sections: [
        {
          heading: "Identifying a Problem",
          body: [
            "We've run into an issue with...",
            "The main problem seems to be...",
            "This has caused a delay in...",
          ],
        },
        {
          heading: "Suggesting Solutions",
          body: [
            "One option would be to...",
            "We could try...",
            "What if we...?",
          ],
        },
        {
          heading: "Making a Decision",
          body: [
            "Let's go with this option.",
            "I think that's our best course of action.",
            "We've decided to move forward with...",
          ],
        },
      ],
      speakText: `Identifying a problem.

We've run into an issue with... The main problem seems to be... This has caused a delay in...

Suggesting solutions.

One option would be to... We could try... What if we...?

Making a decision.

Let's go with this option. I think that's our best course of action. We've decided to move forward with...`,
      videoTopic: "Watch a team identify a problem and agree on a solution together.",
      readingTitle: "A Delivery Problem",
      reading: [
        "The logistics team said, “We've run into an issue with the delivery truck. The main problem seems to be a mechanical failure.”",
        "The manager asked for suggestions, and one employee said, “What if we rent a truck for today's deliveries?”",
        "After a short discussion, the manager said, “Let's go with this option. We've decided to rent a truck immediately.”",
        "The deliveries were completed on time thanks to the quick decision.",
      ],
      readingSpeakText: `A delivery problem.

The logistics team said, we've run into an issue with the delivery truck. The main problem seems to be a mechanical failure.

The manager asked for suggestions, and one employee said, what if we rent a truck for today's deliveries?

After a short discussion, the manager said, let's go with this option. We've decided to rent a truck immediately.

The deliveries were completed on time thanks to the quick decision.`,
      exercises: [
        "Write a sentence identifying a problem at work.",
        "Write two suggested solutions using 'We could try' and 'What if we'.",
        "Write a sentence making a final decision.",
        "Describe a problem you solved recently using this lesson's phrases.",
      ],
      speakingTopic: "Describe a workplace problem and propose two possible solutions.",
    },
    {
      id: 10,
      title: "Cross-Cultural Communication",
      subtitle: "Learn to communicate respectfully and effectively with international colleagues.",
      sections: [
        {
          heading: "Why Cultural Awareness Matters",
          body: [
            "Different cultures have different norms around time, formality, and directness.",
            "Being aware of these differences helps avoid misunderstandings.",
          ],
        },
        {
          heading: "Useful Phrases",
          body: [
            "Could you help me understand how this is usually done in your country?",
            "I want to make sure I understood you correctly.",
            "Please let me know if I say something that isn't clear.",
          ],
        },
        {
          heading: "Tips for Clear Communication",
          body: [
            "Speak clearly and avoid complicated idioms.",
            "Check understanding with simple follow-up questions.",
            "Be patient and respectful of different communication styles.",
          ],
        },
      ],
      speakText: `Why cultural awareness matters.

Different cultures have different norms around time, formality, and directness. Being aware of these differences helps avoid misunderstandings.

Useful phrases.

Could you help me understand how this is usually done in your country? I want to make sure I understood you correctly. Please let me know if I say something that isn't clear.

Tips for clear communication.

Speak clearly and avoid complicated idioms. Check understanding with simple follow up questions. Be patient and respectful of different communication styles.`,
      videoTopic: "See how an international team communicates clearly across cultures.",
      readingTitle: "Working With an International Team",
      reading: [
        "When Brightened Mind Corporation started working with partners abroad, the team noticed some cultural differences.",
        "In some meetings, colleagues were very direct, while in others, people preferred to discuss things more slowly.",
        "To avoid misunderstandings, the team leader often asked, “Could you help me understand how this is usually done in your country?”",
        "This simple habit helped the whole team communicate more respectfully and effectively.",
      ],
      readingSpeakText: `Working with an international team.

When Brightened Mind Corporation started working with partners abroad, the team noticed some cultural differences.

In some meetings, colleagues were very direct, while in others, people preferred to discuss things more slowly.

To avoid misunderstandings, the team leader often asked, could you help me understand how this is usually done in your country?

This simple habit helped the whole team communicate more respectfully and effectively.`,
      exercises: [
        "Write a sentence asking about another culture's way of working.",
        "Write a sentence to check your understanding politely.",
        "List two tips for clear cross-cultural communication.",
        "Describe a time you communicated with someone from a different background.",
      ],
      speakingTopic: "Talk about how you would communicate respectfully with an international colleague.",
    },
    {
      id: 11,
      title: "Leadership and Management Vocabulary",
      subtitle: "Learn key vocabulary used by managers and leaders at work.",
      sections: [
        {
          heading: "Key Vocabulary",
          body: [
            "Delegate: to give a task to someone else.",
            "Motivate: to encourage someone to work well.",
            "Feedback: comments on someone's performance.",
            "Accountability: being responsible for your actions and results.",
          ],
        },
        {
          heading: "Giving Feedback",
          body: [
            "I really appreciate the effort you put into this.",
            "One area you could improve is...",
            "Let's set a clear goal for next time.",
          ],
        },
        {
          heading: "Leading a Team",
          body: [
            "I'd like to delegate this task to you.",
            "Great job motivating the team this week.",
            "We all need to be accountable for our deadlines.",
          ],
        },
      ],
      speakText: `Key vocabulary.

Delegate means to give a task to someone else. Motivate means to encourage someone to work well. Feedback means comments on someone's performance. Accountability means being responsible for your actions and results.

Giving feedback.

I really appreciate the effort you put into this. One area you could improve is... Let's set a clear goal for next time.

Leading a team.

I'd like to delegate this task to you. Great job motivating the team this week. We all need to be accountable for our deadlines.`,
      videoTopic: "See a manager give clear, respectful feedback to a team member.",
      readingTitle: "A New Team Leader",
      reading: [
        "When Joseph became team leader, he learned to delegate tasks instead of doing everything himself.",
        "He also learned to give clear feedback, saying things like, “I really appreciate the effort you put into this. One area you could improve is meeting deadlines.”",
        "His team became more motivated because they felt trusted and accountable for their own work.",
        "Within a few months, the team's performance improved significantly.",
      ],
      readingSpeakText: `A new team leader.

When Joseph became team leader, he learned to delegate tasks instead of doing everything himself.

He also learned to give clear feedback, saying things like, I really appreciate the effort you put into this. One area you could improve is meeting deadlines.

His team became more motivated because they felt trusted and accountable for their own work.

Within a few months, the team's performance improved significantly.`,
      exercises: [
        "Define 'delegate', 'motivate', 'feedback', and 'accountability' in your own words.",
        "Write a sentence giving positive feedback to a colleague.",
        "Write a sentence giving constructive feedback politely.",
        "Describe a good leader you know using this lesson's vocabulary.",
      ],
      speakingTopic: "Give feedback to an imaginary team member about their recent work.",
    },
    {
      id: 12,
      title: "Final Review and Real-Life Business Conversation",
      subtitle: "Review everything learned in Level 3 and practice a complete professional conversation.",
      sections: [
        {
          heading: "Important Things We Learned",
          body: [
            "Using conditionals and modal verbs professionally",
            "Negotiating prices and agreements",
            "Delivering clear presentations",
            "Participating in meetings and writing minutes",
            "Writing reports and proposals",
            "Handling phone and video calls",
            "Networking and making small talk",
            "Solving problems and making decisions",
            "Communicating across cultures",
            "Using leadership and management vocabulary",
          ],
        },
        {
          heading: "Example Real-Life Conversation",
          body: [
            "A: Good morning. Thank you for joining this call.",
            "B: Good morning, happy to be here. I'm calling about the proposal you sent.",
            "A: Of course. What are your thoughts?",
            "B: Overall, it looks strong. If you could extend the delivery deadline by one week, we would sign immediately.",
            "A: That sounds reasonable. Let me check with my team and get back to you today.",
            "B: Perfect, thank you for your time. I look forward to working together.",
          ],
        },
      ],
      speakText: `Important things we learned in Level 3 include using conditionals and modal verbs professionally, negotiating, delivering presentations, participating in meetings, writing reports, handling calls, networking, solving problems, communicating across cultures, and using leadership vocabulary.

Example real life conversation.

Good morning. Thank you for joining this call.
Good morning, happy to be here. I'm calling about the proposal you sent.
Of course. What are your thoughts?
Overall, it looks strong. If you could extend the delivery deadline by one week, we would sign immediately.
That sounds reasonable. Let me check with my team and get back to you today.
Perfect, thank you for your time. I look forward to working together.`,
      videoTopic: "Review all Level 3 topics through one complete business conversation.",
      readingTitle: "Completing the Program",
      reading: [
        "After finishing Levels 1, 2, and 3, Chantal can now confidently lead meetings, write professional reports, and negotiate with international clients.",
        "She remembers struggling with simple greetings when she started, and now she gives full presentations in English.",
        "Chantal says that practicing real conversations, not just grammar rules, made the biggest difference.",
        "She is now ready to use English confidently in her career at Brightened Mind Corporation.",
      ],
      readingSpeakText: `Completing the program.

After finishing Levels 1, 2, and 3, Chantal can now confidently lead meetings, write professional reports, and negotiate with international clients.

She remembers struggling with simple greetings when she started, and now she gives full presentations in English.

Chantal says that practicing real conversations, not just grammar rules, made the biggest difference.

She is now ready to use English confidently in her career at Brightened Mind Corporation.`,
      exercises: [
        "Write a short professional dialogue using at least three Level 3 topics.",
        "Practice the example conversation aloud with a partner.",
        "Write a short paragraph about your English learning journey.",
        "Give a 1-minute summary presentation of what you learned across all three levels.",
      ],
      speakingTopic: "Hold a complete professional phone call: greet, discuss a proposal, negotiate, and close politely.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Quiz 1",
      subtitle: "Conditionals for Business",
      passingScore: 7,
      questions: [
        { question: "Which is a first conditional sentence?", options: ["If we finish early, we will send it today", "If I were rich, I would travel", "If it rained yesterday"], answer: "If we finish early, we will send it today" },
        { question: "Which is a second conditional sentence?", options: ["If I had more time, I would review it again", "If you call, I will answer", "If we win, we celebrate"], answer: "If I had more time, I would review it again" },
        { question: "What structure follows 'if' in the first conditional?", options: ["present simple", "past simple", "would + verb"], answer: "present simple" },
        { question: "What structure follows 'if' in the second conditional?", options: ["past simple", "present simple", "will + verb"], answer: "past simple" },
        { question: "Conditionals are especially common in which business activity?", options: ["Negotiations and planning", "Cleaning the office", "Taking lunch breaks"], answer: "Negotiations and planning" },
        { question: "What did the supplier offer in the reading?", options: ["A discount for a larger order", "A free gift", "Nothing"], answer: "A discount for a larger order" },
        { question: "What did the manager say about the budget?", options: ["If they had a bigger budget, they would order double", "They refused to negotiate", "They had unlimited budget"], answer: "If they had a bigger budget, they would order double" },
        { question: "What happened by the end of the meeting?", options: ["They signed a new contract", "They canceled the deal", "Nothing was decided"], answer: "They signed a new contract" },
        { question: "Which sentence correctly uses 'would'?", options: ["If she were the manager, she would change the schedule", "If she is the manager, she would changed", "If she were manager she will change"], answer: "If she were the manager, she would change the schedule" },
        { question: "Why are conditionals useful in business English?", options: ["They help discuss possibilities and consequences", "They are only used in cooking", "They replace all other grammar"], answer: "They help discuss possibilities and consequences" },
      ],
    },
    {
      lessonId: 2,
      title: "Quiz 2",
      subtitle: "Modal Verbs for Business",
      passingScore: 7,
      questions: [
        { question: "Which modal expresses a strong obligation?", options: ["must", "might", "could"], answer: "must" },
        { question: "Which modal is used for advice?", options: ["should", "must", "will"], answer: "should" },
        { question: "Which modal expresses possibility?", options: ["might", "have to", "must"], answer: "might" },
        { question: "Choose the correct sentence.", options: ["All staff must submit the report by Friday", "All staff might submit the report certainly", "All staff should must submit"], answer: "All staff must submit the report by Friday" },
        { question: "Choose the sentence giving advice.", options: ["You should double-check the figures", "You must double-check maybe", "You might have to check never"], answer: "You should double-check the figures" },
        { question: "What did the finance manager say was necessary?", options: ["Finishing the audit documents by Monday", "Taking a vacation", "Canceling the audit"], answer: "Finishing the audit documents by Monday" },
        { question: "What did she suggest preparing?", options: ["A short summary for the director", "A birthday cake", "Nothing else"], answer: "A short summary for the director" },
        { question: "What did one employee ask about?", options: ["Whether the deadline might change", "Whether lunch was ready", "Whether to quit"], answer: "Whether the deadline might change" },
        { question: "Did the deadline change?", options: ["No, it was unlikely", "Yes, immediately", "The text doesn't say"], answer: "No, it was unlikely" },
        { question: "What is the difference between 'must' and 'should'?", options: ["'Must' is a strong obligation, 'should' is advice", "They mean exactly the same", "'Should' is stronger than 'must'"], answer: "'Must' is a strong obligation, 'should' is advice" },
      ],
    },
    {
      lessonId: 3,
      title: "Quiz 3",
      subtitle: "Negotiation Language",
      passingScore: 7,
      questions: [
        { question: "Which phrase opens a negotiation?", options: ["We would like to discuss the terms", "Goodbye forever", "I don't want to talk"], answer: "We would like to discuss the terms" },
        { question: "Which phrase makes an offer?", options: ["We can offer you a 10% discount", "We refuse everything", "No deal is possible"], answer: "We can offer you a 10% discount" },
        { question: "Which phrase shows compromise?", options: ["We can meet you halfway", "We never compromise", "Take it or leave it"], answer: "We can meet you halfway" },
        { question: "Which phrase closes a deal?", options: ["Let's put this in writing", "Let's forget this ever happened", "I don't agree at all"], answer: "Let's put this in writing" },
        { question: "How long did the two companies negotiate?", options: ["Almost two hours", "Five minutes", "A whole week"], answer: "Almost two hours" },
        { question: "What did the buyer think about the price at first?", options: ["It was too high", "It was too low", "It was perfect"], answer: "It was too high" },
        { question: "What discount did the seller offer?", options: ["10% for a larger order", "50% for everyone", "No discount"], answer: "10% for a larger order" },
        { question: "What extra request did the buyer make?", options: ["Free delivery", "A new logo", "A longer meeting"], answer: "Free delivery" },
        { question: "How did the negotiation end?", options: ["Both sides shook hands and agreed", "The deal collapsed", "They never spoke again"], answer: "Both sides shook hands and agreed" },
        { question: "Which phrase did they use at the end?", options: ["We look forward to working with you", "We never want to meet again", "This was a waste of time"], answer: "We look forward to working with you" },
      ],
    },
    {
      lessonId: 4,
      title: "Quiz 4",
      subtitle: "Presentation Skills",
      passingScore: 7,
      questions: [
        { question: "Which phrase opens a presentation?", options: ["Good morning everyone, thank you for being here", "Goodbye everyone", "I have nothing to say"], answer: "Good morning everyone, thank you for being here" },
        { question: "Which phrase moves to a new point?", options: ["Let's move to the next slide", "The end", "Never mind"], answer: "Let's move to the next slide" },
        { question: "Which phrase closes a presentation?", options: ["To summarize, the key points are...", "I forgot what I wanted to say", "Let's start over"], answer: "To summarize, the key points are..." },
        { question: "Which phrase invites questions?", options: ["Are there any questions?", "No questions allowed", "That's all, goodbye"], answer: "Are there any questions?" },
        { question: "Who was nervous before her first presentation?", options: ["Linda", "Sarah", "Clara"], answer: "Linda" },
        { question: "How did Linda structure her talk?", options: ["Problem, then solution, then results", "Randomly, with no order", "Only jokes"], answer: "Problem, then solution, then results" },
        { question: "What were the key points Linda summarized?", options: ["Cost reduction and faster delivery", "Office decoration", "Lunch menu"], answer: "Cost reduction and faster delivery" },
        { question: "How did the team react to Linda's presentation?", options: ["They were impressed by how clear it was", "They were confused", "They left the room"], answer: "They were impressed by how clear it was" },
        { question: "What should a presentation include at the beginning?", options: ["A clear idea of what will be discussed", "Nothing, just start randomly", "Only the conclusion"], answer: "A clear idea of what will be discussed" },
        { question: "Which phrase helps explain a chart?", options: ["As you can see on this chart...", "I don't understand this chart", "Charts are useless"], answer: "As you can see on this chart..." },
      ],
    },
    {
      lessonId: 5,
      title: "Quiz 5",
      subtitle: "Formal Meetings and Minutes",
      passingScore: 7,
      questions: [
        { question: "Which phrase starts a meeting?", options: ["Shall we begin?", "The meeting is cancelled", "Goodbye"], answer: "Shall we begin?" },
        { question: "Which phrase politely interrupts?", options: ["Sorry to interrupt, but...", "Be quiet", "Stop talking now"], answer: "Sorry to interrupt, but..." },
        { question: "Which phrase asks to add a point?", options: ["If I may add...", "I refuse to speak", "This is pointless"], answer: "If I may add..." },
        { question: "What do meeting minutes record?", options: ["What was discussed and decided", "Only jokes told", "Nothing important"], answer: "What was discussed and decided" },
        { question: "What are 'action items'?", options: ["Tasks assigned with a responsible person and deadline", "Snacks served at the meeting", "The meeting's title"], answer: "Tasks assigned with a responsible person and deadline" },
        { question: "What time did the Monday meeting start?", options: ["9 a.m.", "Noon", "6 p.m."], answer: "9 a.m." },
        { question: "What did Peter suggest reviewing?", options: ["The budget", "The menu", "The logo"], answer: "The budget" },
        { question: "Who wrote the minutes?", options: ["The secretary", "Peter", "No one"], answer: "The secretary" },
        { question: "What did the minutes include?", options: ["Attendees, agenda, and action items", "Only the date", "A list of jokes"], answer: "Attendees, agenda, and action items" },
        { question: "How did the team receive the minutes?", options: ["By email the same day", "They never received them", "By post a month later"], answer: "By email the same day" },
      ],
    },
    {
      lessonId: 6,
      title: "Quiz 6",
      subtitle: "Business Writing: Reports and Proposals",
      passingScore: 7,
      questions: [
        { question: "What is the first part of a report?", options: ["Introduction", "Recommendations", "Findings"], answer: "Introduction" },
        { question: "What section presents facts and data?", options: ["Findings", "Introduction", "Conclusion"], answer: "Findings" },
        { question: "What section suggests next steps?", options: ["Recommendations", "Findings", "Introduction"], answer: "Recommendations" },
        { question: "Which phrase introduces a report's purpose?", options: ["The purpose of this report is to...", "Once upon a time...", "The end."], answer: "The purpose of this report is to..." },
        { question: "Which phrase presents data?", options: ["The data shows that...", "I think maybe...", "Who knows..."], answer: "The data shows that..." },
        { question: "What was the report about?", options: ["Customer satisfaction", "Employee vacations", "Office furniture"], answer: "Customer satisfaction" },
        { question: "What percentage of customers were satisfied?", options: ["85%", "15%", "50%"], answer: "85%" },
        { question: "What did some customers mention?", options: ["Response times could be faster", "Prices were too low", "Nothing at all"], answer: "Response times could be faster" },
        { question: "What did the report recommend?", options: ["Hiring two more support staff", "Closing the company", "Reducing staff"], answer: "Hiring two more support staff" },
        { question: "What was the report's conclusion?", options: ["Satisfaction is improving but could be better", "Everything is perfect", "Everything is terrible"], answer: "Satisfaction is improving but could be better" },
      ],
    },
    {
      lessonId: 7,
      title: "Quiz 7",
      subtitle: "Telephone and Video Call English",
      passingScore: 7,
      questions: [
        { question: "Which phrase starts a professional call?", options: ["Hello, this is [name] from...", "Hey, who's this?", "What do you want?"], answer: "Hello, this is [name] from..." },
        { question: "Which phrase asks someone to repeat?", options: ["Could you repeat that, please?", "I don't care what you said", "Stop talking"], answer: "Could you repeat that, please?" },
        { question: "Which phrase ends a call politely?", options: ["Thank you for your time", "I'm hanging up now", "Whatever"], answer: "Thank you for your time" },
        { question: "Which phrase checks the connection?", options: ["Can you hear me okay?", "I don't care if you hear me", "This call is boring"], answer: "Can you hear me okay?" },
        { question: "Who called the client in the reading?", options: ["Sarah", "Linda", "Clara"], answer: "Sarah" },
        { question: "What was the call about?", options: ["The client's recent order", "A job interview", "A complaint about noise"], answer: "The client's recent order" },
        { question: "What problem happened during the call?", options: ["The line wasn't very clear", "The phone broke", "No one answered"], answer: "The line wasn't very clear" },
        { question: "What did Sarah say she would do after the call?", options: ["Send an email to confirm", "Call again in 5 minutes", "Do nothing"], answer: "Send an email to confirm" },
        { question: "How did the call end?", options: ["Politely, with thanks from both sides", "The client hung up angrily", "It was never resolved"], answer: "Politely, with thanks from both sides" },
        { question: "Which phrase is useful if you didn't understand something?", options: ["I'm sorry, the line isn't very clear", "I understood everything perfectly", "Please stop calling"], answer: "I'm sorry, the line isn't very clear" },
      ],
    },
    {
      lessonId: 8,
      title: "Quiz 8",
      subtitle: "Networking and Small Talk",
      passingScore: 7,
      questions: [
        { question: "Which is a good small talk question?", options: ["What line of work are you in?", "How much money do you make?", "Why are you here?"], answer: "What line of work are you in?" },
        { question: "Which phrase asks for contact information?", options: ["Could I have your business card?", "Give me your phone now", "I don't need your contact"], answer: "Could I have your business card?" },
        { question: "Which topic is generally safe for small talk?", options: ["Industry trends", "Salary", "Personal problems"], answer: "Industry trends" },
        { question: "Which topic should usually be avoided?", options: ["Politics", "The event itself", "Travel"], answer: "Politics" },
        { question: "Where did Michael meet someone new?", options: ["At a conference", "At the gym", "At a restaurant"], answer: "At a conference" },
        { question: "What question did Michael ask?", options: ["What line of work are you in?", "How old are you?", "Where do you live?"], answer: "What line of work are you in?" },
        { question: "What did they discover they had in common?", options: ["They worked in similar industries", "They were neighbors", "They studied together"], answer: "They worked in similar industries" },
        { question: "What did they talk about for ten minutes?", options: ["Industry trends and travel", "The weather only", "Nothing at all"], answer: "Industry trends and travel" },
        { question: "What did Michael ask for before leaving?", options: ["A business card", "Money", "A gift"], answer: "A business card" },
        { question: "What platform did Michael suggest connecting on?", options: ["LinkedIn", "A random website", "No platform"], answer: "LinkedIn" },
      ],
    },
    {
      lessonId: 9,
      title: "Quiz 9",
      subtitle: "Problem Solving and Decision Making",
      passingScore: 7,
      questions: [
        { question: "Which phrase identifies a problem?", options: ["We've run into an issue with...", "Everything is perfect", "No problems here"], answer: "We've run into an issue with..." },
        { question: "Which phrase suggests a solution?", options: ["What if we...?", "I refuse to think", "Nothing can be done"], answer: "What if we...?" },
        { question: "Which phrase makes a final decision?", options: ["Let's go with this option", "Maybe someday", "I can't decide ever"], answer: "Let's go with this option" },
        { question: "What problem did the logistics team face?", options: ["A mechanical failure with the delivery truck", "A missing employee", "A closed office"], answer: "A mechanical failure with the delivery truck" },
        { question: "What solution did an employee suggest?", options: ["Renting a truck for today's deliveries", "Canceling all deliveries", "Waiting one month"], answer: "Renting a truck for today's deliveries" },
        { question: "What did the manager decide?", options: ["To rent a truck immediately", "To do nothing", "To fire the team"], answer: "To rent a truck immediately" },
        { question: "Were the deliveries completed on time?", options: ["Yes, thanks to the quick decision", "No, they were all late", "The text doesn't say"], answer: "Yes, thanks to the quick decision" },
        { question: "Which phrase shows something caused a delay?", options: ["This has caused a delay in...", "Everything is on schedule", "There is no delay"], answer: "This has caused a delay in..." },
        { question: "Which phrase offers an option?", options: ["One option would be to...", "There are no options", "Stop suggesting things"], answer: "One option would be to..." },
        { question: "Why is this language useful at work?", options: ["It helps identify problems and agree on solutions quickly", "It is only used in restaurants", "It has no real use"], answer: "It helps identify problems and agree on solutions quickly" },
      ],
    },
    {
      lessonId: 10,
      title: "Quiz 10",
      subtitle: "Cross-Cultural Communication",
      passingScore: 7,
      questions: [
        { question: "Why does cultural awareness matter at work?", options: ["It helps avoid misunderstandings", "It has no real purpose", "It only matters on vacation"], answer: "It helps avoid misunderstandings" },
        { question: "Which phrase helps understand another culture's approach?", options: ["Could you help me understand how this is usually done in your country?", "Your way is wrong", "I don't care about your culture"], answer: "Could you help me understand how this is usually done in your country?" },
        { question: "Which phrase checks understanding politely?", options: ["I want to make sure I understood you correctly", "You make no sense", "Forget it"], answer: "I want to make sure I understood you correctly" },
        { question: "What is one tip for clear communication?", options: ["Avoid complicated idioms", "Speak as fast as possible", "Use only slang"], answer: "Avoid complicated idioms" },
        { question: "What differences did the team notice?", options: ["Differences in directness and meeting pace", "No differences at all", "Only differences in food"], answer: "Differences in directness and meeting pace" },
        { question: "What did the team leader often ask?", options: ["How things are usually done in a colleague's country", "Nothing, he never asked questions", "Only about the weather"], answer: "How things are usually done in a colleague's country" },
        { question: "What did this habit help the team do?", options: ["Communicate more respectfully and effectively", "Avoid working together", "Ignore cultural differences"], answer: "Communicate more respectfully and effectively" },
        { question: "What should you be when communicating across cultures?", options: ["Patient and respectful", "Impatient and rude", "Silent always"], answer: "Patient and respectful" },
        { question: "What can help check understanding in conversation?", options: ["Simple follow-up questions", "Ignoring the other person", "Changing the subject"], answer: "Simple follow-up questions" },
        { question: "What can different cultures have different norms about?", options: ["Time, formality, and directness", "Only clothing", "Nothing important"], answer: "Time, formality, and directness" },
      ],
    },
    {
      lessonId: 11,
      title: "Quiz 11",
      subtitle: "Leadership and Management Vocabulary",
      passingScore: 7,
      questions: [
        { question: "What does 'delegate' mean?", options: ["To give a task to someone else", "To ignore a task", "To cancel a meeting"], answer: "To give a task to someone else" },
        { question: "What does 'motivate' mean?", options: ["To encourage someone to work well", "To discourage someone", "To fire someone"], answer: "To encourage someone to work well" },
        { question: "What does 'feedback' mean?", options: ["Comments on someone's performance", "A type of meeting room", "A company holiday"], answer: "Comments on someone's performance" },
        { question: "What does 'accountability' mean?", options: ["Being responsible for your actions and results", "Avoiding responsibility", "Working alone always"], answer: "Being responsible for your actions and results" },
        { question: "What did Joseph learn to do as team leader?", options: ["Delegate tasks instead of doing everything himself", "Do every task alone", "Avoid giving feedback"], answer: "Delegate tasks instead of doing everything himself" },
        { question: "What kind of feedback did Joseph give?", options: ["Clear and constructive feedback", "No feedback at all", "Only negative comments"], answer: "Clear and constructive feedback" },
        { question: "Why did the team become more motivated?", options: ["They felt trusted and accountable", "They were paid more", "They worked fewer hours"], answer: "They felt trusted and accountable" },
        { question: "What happened to the team's performance?", options: ["It improved significantly", "It got worse", "It stayed exactly the same"], answer: "It improved significantly" },
        { question: "Which phrase gives positive feedback?", options: ["I really appreciate the effort you put into this", "You did nothing right", "I don't care about your work"], answer: "I really appreciate the effort you put into this" },
        { question: "Which phrase is about accountability?", options: ["We all need to be accountable for our deadlines", "Deadlines don't matter", "Only managers have deadlines"], answer: "We all need to be accountable for our deadlines" },
      ],
    },
    {
      lessonId: 12,
      title: "Quiz 12",
      subtitle: "Final Review and Real-Life Business Conversation",
      passingScore: 7,
      questions: [
        { question: "What grammar was reviewed in Lesson 1?", options: ["Conditionals", "Colors", "Numbers"], answer: "Conditionals" },
        { question: "What was Lesson 3 about?", options: ["Negotiation language", "Cooking vocabulary", "Sports"], answer: "Negotiation language" },
        { question: "What skill did Lesson 4 focus on?", options: ["Presentation skills", "Gardening", "Driving"], answer: "Presentation skills" },
        { question: "What did Chantal struggle with when she started?", options: ["Simple greetings", "Advanced negotiation", "Writing novels"], answer: "Simple greetings" },
        { question: "What can Chantal do now?", options: ["Lead meetings, write reports, and negotiate", "Nothing new", "Only greet people"], answer: "Lead meetings, write reports, and negotiate" },
        { question: "What made the biggest difference for Chantal?", options: ["Practicing real conversations", "Memorizing grammar books only", "Avoiding speaking"], answer: "Practicing real conversations" },
        { question: "In the example call, what did speaker B ask for?", options: ["An extended delivery deadline", "A lower salary", "A new office"], answer: "An extended delivery deadline" },
        { question: "How did speaker A respond to the request?", options: ["Agreed to check with the team", "Refused immediately", "Hung up the phone"], answer: "Agreed to check with the team" },
        { question: "How did the example call end?", options: ["Politely, looking forward to working together", "In an argument", "With no resolution"], answer: "Politely, looking forward to working together" },
        { question: "What is Chantal now ready to do?", options: ["Use English confidently in her career", "Stop learning English", "Avoid speaking English at work"], answer: "Use English confidently in her career" },
      ],
    },
  ],

  finalQuiz: {
    title: "Final Quiz - Level 3",
    subtitle: "This quiz covers all Level 3 lessons.",
    passingScore: 15,
    questions: [
      { question: "Which is a first conditional sentence?", options: ["If we finish early, we will send it today", "If I had wings, I would fly", "If it rained"], answer: "If we finish early, we will send it today" },
      { question: "Which modal expresses a strong obligation?", options: ["must", "might", "could"], answer: "must" },
      { question: "Which phrase makes a negotiation offer?", options: ["We can offer you a discount", "We refuse to talk", "No deal"], answer: "We can offer you a discount" },
      { question: "Which phrase opens a presentation?", options: ["Good morning everyone, thank you for being here", "Goodbye", "I have nothing to say"], answer: "Good morning everyone, thank you for being here" },
      { question: "Which phrase starts a meeting?", options: ["Shall we begin?", "The meeting is over", "No comment"], answer: "Shall we begin?" },
      { question: "What is the first section of a business report?", options: ["Introduction", "Recommendations", "Conclusion"], answer: "Introduction" },
      { question: "Which phrase starts a professional phone call?", options: ["Hello, this is [name] from...", "Hey, who is this", "What do you want"], answer: "Hello, this is [name] from..." },
      { question: "Which is a safe small talk topic?", options: ["Industry trends", "Salary", "Politics"], answer: "Industry trends" },
      { question: "Which phrase identifies a problem?", options: ["We've run into an issue with...", "Everything is fine", "No problems"], answer: "We've run into an issue with..." },
      { question: "Which phrase helps with cross-cultural understanding?", options: ["Could you help me understand how this is usually done in your country?", "Your way is wrong", "I don't care"], answer: "Could you help me understand how this is usually done in your country?" },
      { question: "What does 'delegate' mean?", options: ["To give a task to someone else", "To do everything alone", "To cancel a task"], answer: "To give a task to someone else" },
      { question: "What did the supplier offer in the Lesson 1 reading?", options: ["A discount for a larger order", "Free shipping only", "Nothing"], answer: "A discount for a larger order" },
      { question: "What did Linda's presentation summarize?", options: ["Cost reduction and faster delivery", "The weather", "Her vacation"], answer: "Cost reduction and faster delivery" },
      { question: "What did the Monday meeting minutes include?", options: ["Attendees, agenda, and action items", "Only a joke", "Nothing useful"], answer: "Attendees, agenda, and action items" },
      { question: "What percentage of customers were satisfied in the report?", options: ["85%", "15%", "50%"], answer: "85%" },
      { question: "What problem happened during Sarah's call?", options: ["The line wasn't very clear", "The client never answered", "The call was too short"], answer: "The line wasn't very clear" },
      { question: "What did Michael ask for at the networking event?", options: ["A business card", "Money", "A new job"], answer: "A business card" },
      { question: "What solution did the logistics team choose?", options: ["Renting a truck", "Canceling deliveries", "Waiting a month"], answer: "Renting a truck" },
      { question: "What helped Joseph's team become more motivated?", options: ["Feeling trusted and accountable", "Working longer hours", "Getting less feedback"], answer: "Feeling trusted and accountable" },
      { question: "What made the biggest difference in Chantal's learning?", options: ["Practicing real conversations", "Reading grammar books only", "Avoiding English at work"], answer: "Practicing real conversations" },
    ],
  },
};
