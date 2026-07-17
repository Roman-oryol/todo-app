const Field = ({
  className = '',
  id,
  label,
  type = 'text',
  onInput,
  value,
}) => {
  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="field__input"
        type={type}
        id={id}
        placeholder=" "
        autoComplete="off"
        onInput={onInput}
        value={value}
      />
    </div>
  );
};

export default Field;
