const TodoApp = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
      <div className="grid h-[80vh] w-full max-w-md content-start gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        {children}
      </div>
    </div>
  );
};

export default TodoApp;
