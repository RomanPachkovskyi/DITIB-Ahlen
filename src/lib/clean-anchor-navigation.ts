import type { MouseEvent } from "react";

const CLEAN_ANCHOR_IDS = new Set(["spenden", "projekt"]);

const getCleanUrl = () => `${window.location.pathname}${window.location.search}`;

const normalizeHash = (hash: string) => hash.replace(/^#/, "");

export const scrollToCleanAnchor = (
  hash: string,
  behavior: ScrollBehavior = "smooth",
) => {
  const id = normalizeHash(hash);
  if (!CLEAN_ANCHOR_IDS.has(id)) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior, block: "start" });
  window.history.replaceState(window.history.state, document.title, getCleanUrl());

  return true;
};

export const handleCleanAnchorClick = (
  event: MouseEvent<HTMLAnchorElement>,
  hash: string,
) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  ) {
    return;
  }

  const didScroll = scrollToCleanAnchor(hash);
  if (didScroll) {
    event.preventDefault();
  }
};
