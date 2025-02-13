import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../components/Input";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSignIn from "../hooks/useSignIn";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";

const SignIn = () => {
  const { loading } = useSelector((state) => state.user);
  const { handleSubmit } = useSignIn();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col lg:flex-row flex-1 bg-gradient-to-b from-secondary to-background">
        <AuthLayout 
          title="Welcome back!"
          subtitle="Sign in to continue building amazing websites"
        />
        
        <AuthCard>
          <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-primary_text">Sign In</h2>
              <p className="text-secondary_text">Enter your credentials to access your account</p>
            </div>
            
            <Input
              label="Email"
              type="email"
              placeholder="name@company.com"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <button
              type="submit"
              className="bg-accent hover:bg-hover_accent text-white font-semibold py-2.5 px-4 rounded-md w-full transition-colors duration-300 flex justify-center items-center h-11"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
            
            <div className="flex gap-2 text-sm justify-center text-primary_text">
              <span>Don't have an account?</span>
              <Link to="/sign-up" className="text-accent hover:text-hover_accent transition-colors">
                Create account
              </Link>
            </div>
          </form>
        </AuthCard>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;