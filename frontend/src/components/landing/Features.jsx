import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { CursorArrowRaysIcon, CommandLineIcon, Squares2X2Icon, ArrowPathIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI-Powered Generation',
    description: 'Transform your ideas into complete websites using natural language descriptions',
    icon: CommandLineIcon,
  },
  {
    name: 'Visual Editor',
    description: 'Edit your website visually with our intuitive drag-and-drop interface',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Pre-built Components',
    description: 'Choose from hundreds of pre-built components to speed up your development',
    icon: Squares2X2Icon,
  },
  {
    name: 'Real-time Preview',
    description: 'See changes instantly and fine-tune with AI-assisted modifications',
    icon: ArrowPathIcon,
  },
];

const FeatureCard = ({ feature, index }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div
      ref={ref}
      className={`relative p-6 rounded-lg bg-tertiary border border-border transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center mb-4">
        <feature.icon className="h-6 w-6 text-accent mr-3" />
        <h3 className="text-lg font-semibold text-primary_text">{feature.name}</h3>
      </div>
      <p className="text-secondary_text">{feature.description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <div className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary_text mb-4">
            Everything You Need to Build a Website
          </h2>
          <p className="text-xl text-secondary_text">
            Powerful features that make website creation effortless
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.name} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;