import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const OPTIONS = [
  { value: "1", label: "Just me" },
  { value: "2", label: "2 of us" },
  { value: "3", label: "3 of us" },
  { value: "4", label: "4 of us" },
];

export default function GuestSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  const selectedIndex = Math.max(
    0,
    OPTIONS.findIndex((option) => option.value === value)
  );
  const selected = OPTIONS[selectedIndex];

  useEffect(() => {
    if (!open) return undefined;
    setActiveIndex(selectedIndex);
    const frame = window.requestAnimationFrame(() => listRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open, selectedIndex]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const choose = (option) => {
    onChange(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onListKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => (current + direction + OPTIONS.length) % OPTIONS.length);
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : OPTIONS.length - 1);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(OPTIONS[activeIndex]);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        id="rsvp-guests"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="rsvp-guests-list"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onTriggerKeyDown}
        className="field-input flex cursor-pointer items-center justify-between gap-3 pr-2 text-left"
      >
        <span>{selected.label}</span>
        <Icon
          name="arrow"
          className={`h-3.5 w-3.5 shrink-0 rotate-90 text-orchid-dark transition-transform duration-300 ${
            open ? "-rotate-90" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id="rsvp-guests-list"
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`rsvp-guest-option-${OPTIONS[activeIndex].value}`}
          onKeyDown={onListKeyDown}
          className="absolute left-0 right-0 top-[calc(100%+0.45rem)] z-40 overflow-hidden rounded-sm border border-orchid/45 bg-paper p-1.5 shadow-[0_18px_45px_-18px_rgba(40,24,46,0.45)] outline-none"
        >
          {OPTIONS.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={option.value}
                id={`rsvp-guest-option-${option.value}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(option)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-[2px] px-3.5 py-3 text-[0.98rem] transition ${
                  isActive ? "bg-lilac/30 text-plum-deep" : "text-ink-soft hover:bg-cream"
                } ${isSelected ? "font-medium" : ""}`}
              >
                <span>{option.label}</span>
                {isSelected ? <Icon name="heart" filled className="h-3.5 w-3.5 text-plum" /> : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
