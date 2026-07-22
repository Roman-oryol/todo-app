const Form = ({ children, className, onFormSubmit }) => {
  return (
    <form className={`flex ${className}`} onSubmit={onFormSubmit}>
      {children}
    </form>
  );
};

export default Form;
