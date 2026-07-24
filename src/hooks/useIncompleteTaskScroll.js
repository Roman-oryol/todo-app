import { useRef, useState } from "react";

export const useIncompleteTaskScroll = (tasks) => {
  const [highlightedTaskId, setHighlightedTaskId] = useState(null);
  const firstIncompleteTaskRef = useRef(null);

  const firstIncompleteTaskId = tasks.find(
    ({ isCompleted }) => !isCompleted,
  )?.id;

  const scrollToFirstIncomplete = () => {
    if (!firstIncompleteTaskId) return;

    firstIncompleteTaskRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setHighlightedTaskId(firstIncompleteTaskId);
    setTimeout(() => setHighlightedTaskId(null), 1200);
  };

  return {
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
    highlightedTaskId,
    scrollToFirstIncomplete,
  };
};
