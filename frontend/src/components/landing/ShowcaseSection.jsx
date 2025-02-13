import { CodeBracketIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const ShowcaseSection = () => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-primary_text mb-6">
              Two Ways to Build
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <CodeBracketIcon className="h-8 w-8 text-accent mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-primary_text mb-2">
                    AI Text-to-Website
                  </h3>
                  <p className="text-secondary_text">
                    Describe your website in natural language and let our AI create it for you instantly
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <PaintBrushIcon className="h-8 w-8 text-accent mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-primary_text mb-2">
                    Visual Builder
                  </h3>
                  <p className="text-secondary_text">
                    Design your website visually using our intuitive drag-and-drop interface
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* Placeholder for interface preview */}
            <div className="aspect-video bg-tertiary rounded-lg border border-border p-4">
              <div className="h-full bg-background/50 rounded flex items-center justify-center">
                <span className="text-secondary_text">Interface Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;