"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { inlineToHtml } from "@/lib/content/render";
import type { Inline } from "@/lib/content/schema";
import { domToInline } from "./inline";

type Props = {
  value: Inline[];
  onChange: (v: Inline[]) => void;
  label: string;
  placeholder?: string;
  /** Allow line breaks inside the field (quote, callout, table cell). Single-line fields send Enter to onEnter instead. */
  multiline?: boolean;
  onEnter?: () => void;
  onBackspaceEmpty?: () => void;
  className?: string;
  autoFocus?: boolean;
};

/**
 * A contentEditable text field that stores the canonical inline model, not HTML. The DOM is written once when the field
 * mounts (never re-written while typing, so the caret never jumps) and read back, through domToInline, after each pause.
 * Pasting always inserts plain text, so foreign markup can never enter an article.
 */
export function InlineEditor({ value, onChange, label, placeholder, multiline, onEnter, onBackspaceEmpty, className = "", autoFocus }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef(onChange);
  useEffect(() => {
    latest.current = onChange;
  });

  useLayoutEffect(() => {
    if (ref.current) ref.current.innerHTML = inlineToHtml(value);
    // Written once per mount; the parent remounts the field (new key) after undo/redo or an import.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A contentEditable element ignores <fieldset disabled>, so follow it by hand: inside a disabled fieldset (a draft in review,
  // a published article for a contributor) the field becomes genuinely read-only. The server refuses such saves anyway.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const locked = el.closest("fieldset:disabled") !== null;
    if ((el.getAttribute("contenteditable") === "false") !== locked) el.setAttribute("contenteditable", locked ? "false" : "true");
    el.setAttribute("aria-readonly", locked ? "true" : "false");
  });

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  const flush = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (ref.current) latest.current(domToInline(ref.current));
  };
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <div
      ref={ref}
      role="textbox"
      aria-multiline={multiline ? true : undefined}
      aria-label={label}
      data-placeholder={placeholder}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      className={`inline-edit ${className}`}
      onInput={() => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(flush, 300);
      }}
      onBlur={flush}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
          e.preventDefault();
          if (multiline) document.execCommand("insertLineBreak");
          else {
            flush();
            onEnter?.();
          }
        } else if (e.key === "Enter" && e.shiftKey) {
          e.preventDefault();
          document.execCommand("insertLineBreak");
        } else if (e.key === "Backspace" && onBackspaceEmpty && !(ref.current?.textContent ?? "").length && !ref.current?.querySelector("[data-latex]")) {
          e.preventDefault();
          onBackspaceEmpty();
        }
      }}
      onPaste={(e) => {
        e.preventDefault();
        const t = e.clipboardData.getData("text/plain");
        if (!multiline) document.execCommand("insertText", false, t.replace(/\s*\n\s*/g, " "));
        else
          t.split(/\r?\n/).forEach((line, i) => {
            if (i) document.execCommand("insertLineBreak");
            if (line) document.execCommand("insertText", false, line);
          });
      }}
      onDrop={(e) => e.preventDefault()}
    />
  );
}
