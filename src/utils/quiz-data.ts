// Types for the quiz system
export type LearningPreference = "auditory" | "visual" | "kinesthetic" | "reading/writing"
export type QuestionType = "multiple-choice" | "true-false" | "fill-blank" | "matching"
export type Difficulty = "easy" | "medium" | "hard"

export interface Question {
  id: string
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  difficulty: Difficulty
  learningPreference: LearningPreference
  subject: string
  tags?: string[]
}

export interface QuizSession {
  id: string
  title: string
  subject: string
  questions: Question[]
  currentQuestionIndex: number
  score: number
  totalQuestions: number
  timeLimit: number // in minutes
  timeRemaining: number // in seconds
  isCompleted: boolean
}

// Comprehensive question database organized by learning preferences
export const questionDatabase: Question[] = [
  // Visual Learning Questions
  {
    id: "v1",
    type: "multiple-choice",
    question: "What is the name of the planet we live on?",
    options: ["Saturn", "Earth", "Venus", "Mars"],
    correctAnswer: "Earth",
    explanation: "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
    difficulty: "easy",
    learningPreference: "visual",
    subject: "Science",
    tags: ["astronomy", "planets"]
  },
  {
    id: "v2",
    type: "multiple-choice",
    question: "Which of the following is a primary color?",
    options: ["Green", "Purple", "Red", "Orange"],
    correctAnswer: "Red",
    explanation: "Red is one of the three primary colors along with blue and yellow.",
    difficulty: "easy",
    learningPreference: "visual",
    subject: "Art",
    tags: ["colors", "art-theory"]
  },
  {
    id: "v3",
    type: "multiple-choice",
    question: "What shape has 4 equal sides and 4 right angles?",
    options: ["Triangle", "Circle", "Square", "Rectangle"],
    correctAnswer: "Square",
    explanation: "A square is a quadrilateral with four equal sides and four right angles.",
    difficulty: "easy",
    learningPreference: "visual",
    subject: "Mathematics",
    tags: ["geometry", "shapes"]
  },
  {
    id: "v4",
    type: "multiple-choice",
    question: "Which animal is known for its black and white stripes?",
    options: ["Lion", "Tiger", "Zebra", "Elephant"],
    correctAnswer: "Zebra",
    explanation: "Zebras are known for their distinctive black and white striped coat pattern.",
    difficulty: "easy",
    learningPreference: "visual",
    subject: "Biology",
    tags: ["animals", "patterns"]
  },

  // Auditory Learning Questions
  {
    id: "a1",
    type: "multiple-choice",
    question: "Which musical instrument is known as the 'king of instruments'?",
    options: ["Piano", "Violin", "Organ", "Guitar"],
    correctAnswer: "Organ",
    explanation: "The pipe organ is often called the 'king of instruments' due to its size, complexity, and powerful sound.",
    difficulty: "medium",
    learningPreference: "auditory",
    subject: "Music",
    tags: ["instruments", "classical-music"]
  },
  {
    id: "a2",
    type: "multiple-choice",
    question: "What is the term for the speed of music?",
    options: ["Pitch", "Tempo", "Volume", "Rhythm"],
    correctAnswer: "Tempo",
    explanation: "Tempo refers to the speed or pace of a piece of music.",
    difficulty: "easy",
    learningPreference: "auditory",
    subject: "Music",
    tags: ["music-theory", "tempo"]
  },
  {
    id: "a3",
    type: "multiple-choice",
    question: "Which language has the most native speakers in the world?",
    options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correctAnswer: "Mandarin Chinese",
    explanation: "Mandarin Chinese has the most native speakers, with over 1 billion people speaking it as their first language.",
    difficulty: "medium",
    learningPreference: "auditory",
    subject: "Language",
    tags: ["languages", "statistics"]
  },

  // Kinesthetic Learning Questions
  {
    id: "k1",
    type: "multiple-choice",
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    explanation: "Basic arithmetic: 2 + 2 = 4",
    difficulty: "easy",
    learningPreference: "kinesthetic",
    subject: "Mathematics",
    tags: ["arithmetic", "basic-math"]
  },
  {
    id: "k2",
    type: "multiple-choice",
    question: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
    explanation: "A triangle is a polygon with exactly three sides and three angles.",
    difficulty: "easy",
    learningPreference: "kinesthetic",
    subject: "Mathematics",
    tags: ["geometry", "polygons"]
  },
  {
    id: "k3",
    type: "multiple-choice",
    question: "What is the result of 5 × 6?",
    options: ["25", "30", "35", "40"],
    correctAnswer: "30",
    explanation: "Multiplication: 5 × 6 = 30",
    difficulty: "easy",
    learningPreference: "kinesthetic",
    subject: "Mathematics",
    tags: ["multiplication", "arithmetic"]
  },
  {
    id: "k4",
    type: "multiple-choice",
    question: "Which sport involves hitting a ball with a racket over a net?",
    options: ["Soccer", "Tennis", "Basketball", "Baseball"],
    correctAnswer: "Tennis",
    explanation: "Tennis is a racket sport that involves hitting a ball over a net.",
    difficulty: "easy",
    learningPreference: "kinesthetic",
    subject: "Sports",
    tags: ["racket-sports", "physical-activity"]
  },

  // Reading/Writing Learning Questions
  {
    id: "r1",
    type: "multiple-choice",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    explanation: "Paris is the capital and most populous city of France.",
    difficulty: "easy",
    learningPreference: "reading/writing",
    subject: "Geography",
    tags: ["capitals", "europe"]
  },
  {
    id: "r2",
    type: "multiple-choice",
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    explanation: "William Shakespeare wrote the famous tragedy 'Romeo and Juliet' in the late 16th century.",
    difficulty: "medium",
    learningPreference: "reading/writing",
    subject: "Literature",
    tags: ["shakespeare", "classic-literature"]
  },
  {
    id: "r3",
    type: "multiple-choice",
    question: "What is the main purpose of a dictionary?",
    options: ["To tell stories", "To define words", "To show pictures", "To teach grammar"],
    correctAnswer: "To define words",
    explanation: "A dictionary is a reference book that contains definitions, pronunciations, and other information about words.",
    difficulty: "easy",
    learningPreference: "reading/writing",
    subject: "Language",
    tags: ["reference-books", "vocabulary"]
  },
  {
    id: "r4",
    type: "multiple-choice",
    question: "Which punctuation mark is used to end a declarative sentence?",
    options: ["Question mark (?)", "Exclamation point (!)", "Period (.)", "Comma (,)"],
    correctAnswer: "Period (.)",
    explanation: "A period (.) is used to end declarative sentences, which make statements.",
    difficulty: "easy",
    learningPreference: "reading/writing",
    subject: "Language",
    tags: ["punctuation", "grammar"]
  },

  // Mixed Learning Preference Questions (Medium difficulty)
  {
    id: "m1",
    type: "multiple-choice",
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    correctAnswer: "Au",
    explanation: "Au comes from the Latin word 'aurum' which means gold.",
    difficulty: "medium",
    learningPreference: "visual",
    subject: "Chemistry",
    tags: ["chemical-symbols", "elements"]
  },
  {
    id: "m2",
    type: "multiple-choice",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    explanation: "Mars is called the Red Planet due to its reddish appearance, caused by iron oxide on its surface.",
    difficulty: "medium",
    learningPreference: "visual",
    subject: "Science",
    tags: ["planets", "astronomy"]
  },
  {
    id: "m3",
    type: "multiple-choice",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    explanation: "The Pacific Ocean is the largest and deepest ocean on Earth, covering about one-third of the Earth's surface.",
    difficulty: "medium",
    learningPreference: "reading/writing",
    subject: "Geography",
    tags: ["oceans", "earth-science"]
  }
]

// Question generation functions
export const generateQuestionsForPreferences = (
  preferences: LearningPreference[],
  count: number = 10,
  difficulty?: Difficulty
): Question[] => {
  // Filter questions that match user's learning preferences
  let filteredQuestions = questionDatabase.filter(q => 
    preferences.includes(q.learningPreference)
  )
  
  // If no questions match preferences, return all questions
  if (filteredQuestions.length === 0) {
    filteredQuestions = questionDatabase
  }
  
  // Filter by difficulty if specified
  if (difficulty) {
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty)
  }
  
  // Shuffle and return requested number of questions
  const shuffled = filteredQuestions.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export const getQuestionsBySubject = (subject: string): Question[] => {
  return questionDatabase.filter(q => q.subject.toLowerCase() === subject.toLowerCase())
}

export const getQuestionsByDifficulty = (difficulty: Difficulty): Question[] => {
  return questionDatabase.filter(q => q.difficulty === difficulty)
}

export const getQuestionsByTags = (tags: string[]): Question[] => {
  return questionDatabase.filter(q => 
    q.tags && tags.some(tag => q.tags!.includes(tag))
  )
}

// Learning preference descriptions
export const learningPreferenceDescriptions = {
  visual: "Learn best through images, diagrams, charts, and visual aids",
  auditory: "Learn best through listening, music, and verbal communication",
  kinesthetic: "Learn best through hands-on activities and physical movement",
  "reading/writing": "Learn best through reading texts and writing notes"
}

// Subject categories
export const subjects = [
  "Mathematics",
  "Science", 
  "Language",
  "Geography",
  "History",
  "Art",
  "Music",
  "Literature",
  "Sports",
  "Chemistry"
]

// Difficulty levels
export const difficulties: Difficulty[] = ["easy", "medium", "hard"] 