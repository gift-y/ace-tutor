import OnboardingSteps from "../components/onboarding-steps";


export default function intro() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-3xl rounded-lg border bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Welcome to AceTutor!
        </h1>
        <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
          Let's set up your personalized learning experience.
        </p>
        <OnboardingSteps />
      </div>
    </div>
  )
}
