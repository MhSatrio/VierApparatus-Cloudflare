"use client";

/** Collects the ticked column checkboxes into the form's `cols` value, then submits (a plain GET, so it is bookmarkable). */
export function ColumnApply() {
  return (
    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={(ev) => {
        const form = ev.currentTarget.form;
        if (!form) return;
        const cols = [...form.querySelectorAll<HTMLInputElement>("input[data-col]:checked")].map((i) => i.value);
        (form.elements.namedItem("cols") as HTMLInputElement).value = cols.join(",");
        form.submit();
      }}
    >
      Show selected columns
    </button>
  );
}
