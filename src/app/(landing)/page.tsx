import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import Button from "@/components/Button";
import Link from "next/link";
import { content } from "@/utils/Data";
import Features from "@/components/Features";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
  <>
      <Wrapper>
        <section className="">
          <div className="flex items-center justify-center flex-col gap-6 min-h-[100dvh] w-full">
            <h1 className="text-4xl md:text-7xl md:leading-22 tracking-tight font-semibold max-w-5xl text-center text-milk ">
              Personalized Education, Driven by AI
            </h1>
            <p className="text-base md:text-2xl leading-7 max-w-xs md:max-w-2xl text-center md:py-6  text-milk">
              Empower every learner with AI-crafted education, unlocking
              personalized paths to success and growth.
            </p>
            <div className="hidden md:flex items-center justify-center gap-5">
           <Button size="large" variant="primary">
                <RegisterLink>Get Started</RegisterLink>
              </Button>
              <Button size="large" variant="secondary">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            <div className="md:hidden flex items-center justify-center gap-3">
              <Button size="small" variant="primary">
                <RegisterLink>Get Started</RegisterLink>
              </Button>
              <Button size="small" variant="secondary">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </Wrapper>

      <Wrapper>
        <section className="mt-24 px-4 w-full">
          <div className="max-w-6xl mx-auto w-full rounded-2xl overflow-hidden bg-white shadow-md">
            <img
              src="#"
              alt="App Interface Preview"
              className="w-full h-[28rem] object-cover"
            />
            <div className="py-6 text-center">
              <h2 className="text-[var(--primary-color)] font-bold text-3xl md:text-4xl">
                Image of the interface
              </h2>
            </div>
          </div>

          <div className="mt-20 md:mt-32 px-4">
            <h2 className="text-3xl lg:text-6xl text-center font-semibold text-milk leading-tight">
              Involve your audience with dynamic, interactive quizzes.
            </h2>
          </div>
        </section>
      </Wrapper>

      <Wrapper>
        <Features />
      </Wrapper>

      <Wrapper>
        <div className="flex flex-col items-start justify-center w-full">
          <h2 className="text-3xl text-milk md:text-5xl w-full md:w-xl text-left font-semibold pt-20 md:pt-20 lg:pt-40 py-10">
            Designed for student groups, study sessions, and collaborative
            projects.
          </h2>

          <div className="flex flex-col md:flex-row w-full gap-4 h-[80dvh]">
            {content.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col w-full md:w-1/3 h-full p-5 bg-[var(--accent)] rounded-xl"
                >
                  <div className={`w-full h-72 rounded-2xl py-3 px-5 ${item.bgColor}`}>
                    <h4 className="md:text-2xl text-milk text-3xl font-bold py-6">
                      {item.title}
                    </h4>
                    <p className="text-milk font-semibold">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </>
  );
}
