const TodoApp = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 p-6">
      <div className="grid h-[80vh] min-h-0 w-full max-w-md grid-rows-[auto_auto_auto_auto_minmax(0,1fr)] gap-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        {children}
      </div>
    </div>
  );
};

export default TodoApp;
