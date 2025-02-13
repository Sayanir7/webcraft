const AuthCard = ({ children }) => {
    return (
      <div className="flex-1 p-6 lg:p-12 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-tertiary/50 backdrop-blur-sm rounded-lg border border-border p-8">
            {children}
          </div>
        </div>
      </div>
    );
  };
  
export default AuthCard;