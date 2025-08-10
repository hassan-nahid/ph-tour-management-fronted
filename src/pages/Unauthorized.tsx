import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-scree px-6 py-12">
      <div className="max-w-md w-full text-center p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4">
          Access Denied
        </h1>
        <p className=" mb-8">
          Sorry, tumi authorized na ei page access korar jonno.
          Please check your credentials or contact support.
        </p>
        <Link to="/">
          <a className={buttonVariants({ variant: "default", className: "w-full" })}>
            Go to Homepage
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
