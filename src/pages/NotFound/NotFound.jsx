import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "./../../components/ui/user-button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <p className="text-2xl font-medium text-gray-800 mb-6">
          Page not found
        </p>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or doesn't exist.
        </p>
        <Link to="/user">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
