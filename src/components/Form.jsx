const Form = ({ children, className, onFormSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit();
  };

  return (
    <form className={`flex ${className}`} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
