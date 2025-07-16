import { links } from "@/utils/Data";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="mx-auto max-w-5xl p-5 md:rounded-3xl bg-grey/40 backdrop-blur-xs fixed md:top-5 top-0 left-0 right-0 z-50">
        <div className="w-full flex items-center justify-between">  
          <div className="text-lg font-semibold">
            <Link href="/">AceTutor</Link>
          </div>
          <div className="flex items-center text-lg gap-x-8">
            {/* {links.map((link: { name: string; path: string }, idx: number) => {
              return (
                <Link href={link.path} key={idx}>
                  {link.name}
                </Link>
              );
            })} */}

            <RegisterLink postLoginRedirectURL="/intro">Get Started</RegisterLink>
            <LoginLink>Login</LoginLink>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
