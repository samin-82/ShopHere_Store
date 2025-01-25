// "use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  // const router = useRouter();
  // const { user } = useUser();

  // if (!user) {
  //   return <SignIn />;
  // }

  // router.push("/");

  return (
    <div className="h-screen flex justify-center items-center">
      <SignIn />
    </div>

  );
}
