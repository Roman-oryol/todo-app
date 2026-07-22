const FormField = ({
  label,
  type = "text",
  className = "",
  icon,
  value,
  onFormFieldInput,
  newTaskFieldRef,
  isEmptyTasks,
}) => {
  return (
    <div className="relative flex-1">
      <input
        className={`peer w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 transition-colors focus:outline-none ${className}`}
        type={type}
        placeholder=" "
        id={label}
        value={value}
        onChange={onFormFieldInput}
        ref={newTaskFieldRef}
        disabled={isEmptyTasks}
      />
      <label
        htmlFor={label}

        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs text-zinc-500 transition-all peer-not-placeholder-shown:-top-4.5 peer-not-placeholder-shown:translate-y-0 peer-focus:-top-4.5 peer-focus:translate-y-0 peer-focus:text-xs"
      >
        {label}
      </label>
      {icon && (
        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 peer-not-placeholder-shown:hidden">
          {icon}
        </span>
      )}
    </div>
  );
};

export default FormField;
