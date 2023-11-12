import Heading from "@/components/heading";
import Image from "next/image";
import React from "react";
import LoginIllustration from "@/assets/images/login_illustration.svg";
import SignupForm from "./components/signup-form";

const SignupPage = () => {
  return (
    <div>
      <Heading />
      <div className="flex items-center max-w-5xl mx-auto my-12">
        <div className="flex-1">
          <Image
            src={LoginIllustration}
            alt="Two people with big phone"
            priority={true}
            width={500}
            height={500}
          />
        </div>
        <div className="flex-1">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
