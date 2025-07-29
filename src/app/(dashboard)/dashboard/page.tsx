import Link from "next/link"

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/">Home</Link>
      <p>This is the dashboard</p>
    </div>
  )
}

export default page