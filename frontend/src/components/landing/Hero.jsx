import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold text-primary_text mb-6">
            Create Websites with
            <span className="text-accent"> No Code</span>
          </h1>
          <p className="text-xl text-secondary_text mb-8 max-w-3xl mx-auto">
            Build professional websites instantly using AI-powered generation and intuitive drag-and-drop interface
          </p>
          <Link
            to="/sign-up"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-accent hover:bg-hover_accent transition-colors duration-300"
          >
            Start Creating Free
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;