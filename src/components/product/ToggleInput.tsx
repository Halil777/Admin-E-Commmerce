import { useController } from "react-hook-form";

const ToggleInput = ({
  control,
  name,
  label,
}: {
  control: any; // The control object from react-hook-form
  name: string; // The field name
  label?: string; // Optional label
}) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium dark:text-whiteSecondary text-blackPrimary"
        >
          {label}
        </label>
      )}
      <div className="flex items-center relative">
        <input
          type="checkbox"
          id={name}
          className="sr-only"
          checked={field.value}
          {...field}
        />
        <div
          className={`w-10 h-5 bg-gray-400 rounded-full p-0.5 cursor-pointer flex items-center transition-colors duration-200 relative ${
            field.value ? "justify-end bg-green-500" : "justify-start"
          }`}
        >
          <span
            className={`w-4 h-4 bg-white rounded-full transition-transform duration-200`}
          />
        </div>
      </div>
    </div>
  );
};

export default ToggleInput;
