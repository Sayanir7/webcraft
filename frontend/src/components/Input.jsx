const Input = ({ label, autoComplete = "off", ...props }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-secondary_text mb-2">
      {label}
    </label>
    <input
      {...props}
      autoComplete={autoComplete}
      className="w-full px-4 py-2.5 bg-primary border border-border rounded-lg 
      text-primary_text placeholder:text-secondary_text/50 
      focus:ring-2 focus:ring-accent focus:border-transparent"
    />
  </div>
);

export default Input;