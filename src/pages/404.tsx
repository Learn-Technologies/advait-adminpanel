import { useRouter } from "next/router";
import React from "react";

export default function Status404() {
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000); // Redirect to home page after 5 seconds
  }, []);
  return (
    <div className="flex justify-center items-center text-black">
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <p>You will be redirected to the home page shortly...</p>
      </div>
      <img alt="404" height={180} src="/assets/status/404.svg" />
    </div>
  );
}
