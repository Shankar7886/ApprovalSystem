import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import WhiteLogoIcon from "@/assets/logoIcon";
import app11 from '@/assets/app11.png';
import app12 from '@/assets/app12.png';
import app13 from '@/assets/app13.png';
import app14 from '@/assets/app14.png'

interface CarouselImage {
  url: string;
  title: string;
  description: string;
}

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    captchaValue: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<
    { email?: string; password?: string } | undefined
  >();

  const handleReset = () => {
    setForm({
      email: "",
      password: "",
      captchaValue: "",
    });
    setError({});
  };

  const handleChange = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Successfully logged in", {
        duration: 2000,
        position: "top-right",
      });

      handleReset();

      setTimeout(() => {
        navigate("/home/Dashboard");
      }, 1500);
    } catch (err) {
      toast.error("Login failed. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Sample images for the carousel - using your provided image paths
  const carouselImages: CarouselImage[] = [
    {
      url: app14,
      title: "Modern Office Space",
      description: "Streamline your approval processes",
    },
    {
      url: app13,
      title: "Team Collaboration",
      description: "Work together seamlessly",
    },
    {
      url: app12,
      title: "Digital Innovation",
      description: "Transform your workflow",
    },
    {
      url: app11,
      title: "Analytics Dashboard",
      description: "Track progress in real-time",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-[30%] flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white relative">
        {/* Logo */}
        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-10">
          <WhiteLogoIcon width={50} height={50} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full pt-16 sm:pt-20 lg:pt-0">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-800 mb-2"
              style={{
                fontFamily: `"Dancing Script", cursive`,
              }}
            >
              Approval
            </h1>
            <span className="text-sm sm:text-base text-gray-600 block ml-8 sm:ml-12 lg:ml-20 -mt-2 lg:-mt-4">
              System
            </span>
          </div>

          {/* Form Section */}
          <div className="w-full">
            <form onSubmit={onSubmit} className="space-y-4 lg:space-y-6">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Welcome back!
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Please sign in to your account
                </p>
              </div>

              <div className="space-y-4">
                <FloatingLabelInput
                  label="Username or Email"
                  id="loginEmail"
                  type="email"
                  className="w-full px-4 py-3 sm:py-4 rounded-lg bg-white text-black border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={error?.email}
                  disabled={loading}
                />

                <FloatingLabelInput
                  type="password"
                  label="Password"
                  id="loginPassword"
                  className="w-full px-4 py-3 sm:py-4 rounded-lg bg-white text-black border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                  value={form.password}
                  error={error?.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="text-right">
                <Link
                  to="/forget-password"
                  className="text-sm text-green-600 hover:text-green-700 hover:underline transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                className="w-full bg-green-400 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed py-3 sm:py-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6 lg:mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-center space-x-4">
                <button
                  type="button"
                  className="p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Sign in with GitHub"
                >
                  <img
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    className="w-5 h-5"
                    alt="GitHub"
                  />
                </button>
                <button
                  type="button"
                  className="p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Sign in with Facebook"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                    className="w-5 h-5"
                    alt="Facebook"
                  />
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6 lg:mt-8">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <p
                 
                  className="font-semibold text-green-600 hover:text-green-700 hover:underline transition-colors duration-200"
                >
                  try admin@gmail.com , 123456
                </p>
              </p>
            </div>
          </div>
        </div>

        {/* Footer space */}
        <div className="h-4" />
      </div>

      {/* Right Panel - Enhanced Carousel */}
      <div className="hidden lg:flex lg:w-[70%] relative overflow-hidden">
        {/* Carousel Container */}
        <div className="relative w-full h-full">
          {/* Images - Fixed visibility issue */}
          <div className="relative w-full h-full">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 visible z-10' 
                    : 'opacity-0 invisible z-0'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Failed to load image: ${image.url}`);
                    // Fallback to a placeholder if image fails to load
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                  <div className="max-w-lg transform transition-all duration-1000 ease-out">
                    <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">
                      {image.title}
                    </h3>
                    <p className="text-xl opacity-90 drop-shadow-md">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Small Progress Dots - Bottom Right */}
          <div className="absolute bottom-6 right-6 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Enhanced Decorative Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/5 rounded-full blur-md animate-pulse delay-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;