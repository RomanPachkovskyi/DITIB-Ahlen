import { useEffect } from "react";

let lockCount = 0;
let scrollY = 0;

const originalBodyStyles = {
  left: "",
  overflow: "",
  position: "",
  right: "",
  top: "",
  width: "",
};

const originalHtmlStyles = {
  overflow: "",
  overscrollBehavior: "",
  scrollBehavior: "",
};

export const useLockBodyScroll = (locked = true) => {
  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) {
      scrollY = window.scrollY;

      originalBodyStyles.left = document.body.style.left;
      originalBodyStyles.overflow = document.body.style.overflow;
      originalBodyStyles.position = document.body.style.position;
      originalBodyStyles.right = document.body.style.right;
      originalBodyStyles.top = document.body.style.top;
      originalBodyStyles.width = document.body.style.width;
      originalHtmlStyles.overflow = document.documentElement.style.overflow;
      originalHtmlStyles.overscrollBehavior =
        document.documentElement.style.overscrollBehavior;
      originalHtmlStyles.scrollBehavior =
        document.documentElement.style.scrollBehavior;

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    }

    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);

      if (lockCount > 0) return;

      const restoreY = scrollY;

      document.documentElement.style.scrollBehavior = "auto";
      document.documentElement.style.overflow = originalHtmlStyles.overflow;
      document.documentElement.style.overscrollBehavior =
        originalHtmlStyles.overscrollBehavior;
      document.body.style.overflow = originalBodyStyles.overflow;
      document.body.style.position = originalBodyStyles.position;
      document.body.style.top = originalBodyStyles.top;
      document.body.style.left = originalBodyStyles.left;
      document.body.style.right = originalBodyStyles.right;
      document.body.style.width = originalBodyStyles.width;

      window.scrollTo({ top: restoreY, left: 0, behavior: "instant" });

      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior =
          originalHtmlStyles.scrollBehavior;
      });
    };
  }, [locked]);
};
