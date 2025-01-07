const InputWithLabel = ({
  label,
  children,
  error,
}: {
  label: React.ReactNode; // Accepts React nodes for complex labels
  children: React.ReactNode; // Accepts React nodes for child components
  error?: string; // Optional error message
}) => {
  return (
    <div>
      <label className="dark:text-whiteSecondary text-blackPrimary block text-base font-semibold mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p> // Display error if provided
      )}
    </div>
  );
};

export default InputWithLabel;
