import { CommandLineIcon, CursorArrowRaysIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const AuthLayout = ({ title, subtitle }) => {
  return (
    <div className="flex-1 p-6 lg:p-12 flex items-center justify-center lg:justify-start bg-gradient-to-br from-primary via-secondary to-background relative">
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="lg:pl-[15%] max-w-lg relative z-10">
        <div className="mb-12">
          <div className="font-bold text-4xl mb-4">
            <span className="text-6xl bg-gradient-to-r from-accent via-accent to-hover_accent bg-clip-text text-transparent">
              WebCraft
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-primary_text mb-4">{title}</h2>
          <p className="text-xl text-secondary_text">{subtitle}</p>
        </div>
        
        <div className="space-y-8">
          <div className="flex items-start group">
            <CommandLineIcon className="h-6 w-6 text-accent mt-1 mr-4 group-hover:text-hover_accent transition-colors" />
            <div>
              <h3 className="text-lg font-medium text-primary_text mb-2 group-hover:text-accent transition-colors">AI-Powered Generation</h3>
              <p className="text-secondary_text">Transform your ideas into complete websites using natural language description</p>
            </div>
          </div>
          
          <div className="flex items-start group">
            <CursorArrowRaysIcon className="h-6 w-6 text-accent mt-1 mr-4 group-hover:text-hover_accent transition-colors" />
            <div>
              <h3 className="text-lg font-medium text-primary_text mb-2 group-hover:text-accent transition-colors">Visual Editor</h3>
              <p className="text-secondary_text">Fine-tune your website with our intuitive drag-and-drop interface</p>
            </div>
          </div>

          <div className="flex items-start group">
            <Squares2X2Icon className="h-6 w-6 text-accent mt-1 mr-4 group-hover:text-hover_accent transition-colors" />
            <div>
              <h3 className="text-lg font-medium text-primary_text mb-2 group-hover:text-accent transition-colors">Component Library</h3>
              <p className="text-secondary_text">Access hundreds of pre-built components to speed up your development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;