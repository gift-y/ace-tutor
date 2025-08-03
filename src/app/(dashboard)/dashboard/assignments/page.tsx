"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Headphones,
  Hand,
  BookOpen,
  Settings,
  Trophy,
  Target,
  Brain
} from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  Question, 
  QuizSession, 
  LearningPreference, 
  generateQuestionsForPreferences,
  learningPreferenceDescriptions,
  subjects,
  difficulties
} from "@/utils/quiz-data"
import QuizResults from "@/components/quiz-results"

export default function AssignmentsPage() {
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
  const [userLearningPreferences, setUserLearningPreferences] = useState<LearningPreference[]>(["visual", "auditory"])
  const [isSessionStarted, setIsSessionStarted] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("Mixed Subjects")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [questionCount, setQuestionCount] = useState<number>(10)
  const [sessionStartTime, setSessionStartTime] = useState<number>(0)

  // Timer effect
  useEffect(() => {
    if (!quizSession || quizSession.isCompleted) return

    const timer = setInterval(() => {
      setQuizSession((prev: QuizSession | null) => {
        if (!prev || prev.timeRemaining <= 0) {
          clearInterval(timer)
          return prev ? { ...prev, isCompleted: true } : null
        }
        return prev ? { ...prev, timeRemaining: prev.timeRemaining - 1 } : null
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizSession])

  // Learning preference icons mapping
  const learningPreferenceIcons = {
    visual: Eye,
    auditory: Headphones,
    kinesthetic: Hand,
    "reading/writing": BookOpen
  }

  // Reaction emojis
  const reactions = [
    { emoji: "❤️", label: "Love it" },
    { emoji: "💩", label: "Not helpful" },
    { emoji: "🔥", label: "Amazing" },
    { emoji: "😂", label: "Funny" },
    { emoji: "🦢", label: "Interesting" },
    { emoji: "😊", label: "Good" },
    { emoji: "😔", label: "Confusing" },
    { emoji: "🤯", label: "Mind blown" },
    { emoji: "🙈", label: "See no evil" },
    { emoji: "😌", label: "Satisfied" }
  ]

  const startQuizSession = () => {
    const difficulty = selectedDifficulty === "all" ? undefined : selectedDifficulty as any
    const questions = generateQuestionsForPreferences(userLearningPreferences, questionCount, difficulty)
    const newSession: QuizSession = {
      id: Date.now().toString(),
      title: "Adaptive Learning Quiz",
      subject: selectedSubject,
      questions,
      currentQuestionIndex: 0,
      score: 0,
      totalQuestions: questions.length,
      timeLimit: 10, // 10 minutes
      timeRemaining: 600, // 10 minutes in seconds
      isCompleted: false
    }
    setQuizSession(newSession)
    setIsSessionStarted(true)
    setSessionStartTime(Date.now())
  }

  const currentQuestion = quizSession?.questions[quizSession.currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    setIsAnswerCorrect(isCorrect)
    setShowExplanation(true)

    if (isCorrect && quizSession) {
      setQuizSession((prev: QuizSession | null) => prev ? {
        ...prev,
        score: prev.score + 1
      } : null)
    }
  }

  const handleNextQuestion = () => {
    if (!quizSession) return

    if (quizSession.currentQuestionIndex < quizSession.questions.length - 1) {
      setQuizSession((prev: QuizSession | null) => prev ? {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      } : null)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setIsAnswerCorrect(null)
    } else {
      // Quiz completed
      setQuizSession((prev: QuizSession | null) => prev ? {
        ...prev,
        isCompleted: true
      } : null)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = (): number => {
    if (!quizSession) return 0
    return (quizSession.currentQuestionIndex / quizSession.questions.length) * 100
  }

  const LearningPreferenceIcon = currentQuestion ? learningPreferenceIcons[currentQuestion.learningPreference] : Eye

  if (!isSessionStarted) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Assignment Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Ready to start your adaptive learning session?</h3>
              <p className="text-muted-foreground">
                Questions will be tailored to your learning preferences: {userLearningPreferences.join(", ")}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userLearningPreferences.map(pref => {
                const Icon = learningPreferenceIcons[pref]
                return (
                  <div key={pref} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Icon className="h-5 w-5" />
                    <span className="capitalize">{pref}</span>
                  </div>
                )
              })}
            </div>

            {/* Session Configuration */}
            <div className="space-y-4">
              <h4 className="font-semibold text-center">Session Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mixed Subjects">Mixed Subjects</SelectItem>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {difficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Questions</label>
                  <Select value={questionCount.toString()} onValueChange={(value) => setQuestionCount(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={startQuizSession} size="lg" className="px-8">
                Start Quiz Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!quizSession || !currentQuestion) {
    return <div>Loading...</div>
  }

  if (quizSession.isCompleted) {
    const timeSpent = Math.floor((Date.now() - sessionStartTime) / 1000)
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <QuizResults
          score={quizSession.score}
          totalQuestions={quizSession.totalQuestions}
          questions={quizSession.questions}
          timeSpent={timeSpent}
          onRetry={() => {
            setQuizSession(null)
            setIsSessionStarted(false)
            setSelectedAnswer(null)
            setShowExplanation(false)
            setIsAnswerCorrect(null)
          }}
          onNewSession={() => window.location.reload()}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header with progress and time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {quizSession.currentQuestionIndex + 1}
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-sm mt-2">
                {quizSession.score}+
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Question</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LearningPreferenceIcon className="h-4 w-4" />
                <span className="capitalize">{currentQuestion.learningPreference}</span>
                <Badge variant="secondary">{currentQuestion.difficulty}</Badge>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatTime(quizSession.timeRemaining)}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {quizSession.currentQuestionIndex + 1} of {quizSession.totalQuestions}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <Progress value={getProgressPercentage()} className="h-2" />

        {/* Question */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-6 text-center">
              {currentQuestion.question}
            </h3>

            {/* Answer options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options?.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={cn(
                    "h-auto p-4 text-left justify-start",
                    selectedAnswer === option && "bg-purple-600 text-white",
                    showExplanation && option === currentQuestion.correctAnswer && "bg-green-600 text-white",
                    showExplanation && selectedAnswer === option && option !== currentQuestion.correctAnswer && "bg-red-600 text-white"
                  )}
                  onClick={() => !showExplanation && handleAnswerSelect(option)}
                  disabled={showExplanation}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {isAnswerCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className="font-medium">
                    {isAnswerCorrect ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-center mt-6">
              {!showExplanation ? (
                <Button 
                  onClick={handleSubmitAnswer} 
                  disabled={!selectedAnswer}
                  className="px-8"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="px-8">
                  {quizSession.currentQuestionIndex < quizSession.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reactions */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {reactions.map((reaction, index) => (
            <button
              key={index}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              title={reaction.label}
            >
              <span className="text-lg">{reaction.emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}