import { useEffect, useState } from "react";

const TodoApp = ({ children }) => {
  const [isPortraitBlocked, setIsPortraitBlocked] = useState(false);

  useEffect(() => {
    const updateOrientationState = () => {
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      setIsPortraitBlocked(isMobile && isLandscape);
    };

    updateOrientationState();

    if (window.screen?.orientation?.lock) {
      window.screen.orientation.lock("portrait").catch(() => {});
    }

    window.addEventListener("resize", updateOrientationState);
    window.addEventListener("orientationchange", updateOrientationState);

    return () => {
      window.removeEventListener("resize", updateOrientationState);
      window.removeEventListener("orientationchange", updateOrientationState);
    };
  }, []);

  return (
    <div className="flex min-h-dvh w-full items-stretch justify-center overflow-hidden bg-zinc-950 p-0 sm:p-6">
      {isPortraitBlocked && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950/95 px-6 text-center text-sm font-medium text-zinc-200">
          Поверните устройство в вертикальное положение
        </div>
      )}
      <div className="grid h-dvh min-h-0 w-full grid-rows-[auto_auto_auto_auto_minmax(0,1fr)] gap-4 overflow-hidden bg-zinc-900 p-4 sm:h-[80vh] sm:w-full sm:max-w-md sm:gap-6 sm:rounded-2xl sm:border sm:border-zinc-800 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default TodoApp;
