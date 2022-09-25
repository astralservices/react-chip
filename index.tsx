import React, { FormEvent, useState } from "react";

export type ReactChipType = {
  inputClass: string;
  labelClass: string;
  chipClass: string;
  focusClass: string;
  defaultChips?: string | string[];
  defaultValue?: string;
  htmlFor?: string;
  id?: string;
  name?: string;
  maxLength?: number;
  onChange?: () => string[];
  style?: any;
};

export default function ReactChip({
  inputClass = "",
  chipClass = "",
  labelClass = "",
  focusClass = "",
  defaultChips = [],
  defaultValue = "",
  id = "",
  name = "",
  maxLength = 9999,
  onChange = () => {},
  style = {},
}: ReactChipType & any) {
  const [chips, setChips] = useState(defaultChips);
  const [input, setInput] = useState(defaultValue);

  function handleAddition(chip: string) {
    if (chips?.length >= maxLength || chips?.includes(chip)) return;
    const updateChips = [...chips, chip?.trim()];
    onChange(updateChips);
    setChips(updateChips);
    setInput("");
  }

  function handleDelete(value: string) {
    if (chips?.length <= 0) return;
    const updateChips = chips?.filter((chip: string) => chip !== value);
    onChange(updateChips);
    setChips(updateChips);
  }

  function handleChange(event: FormEvent<HTMLInputElement>) {
    event?.preventDefault();
    event?.stopPropagation();
    const {
      currentTarget: { value },
    } = event;

    if (value === "") setInput("");
    if (
      value[0] === "," // ||
      // !value?.match(/^[0-9a-zA-Z,]+$/) ||
      // value?.length > 20
    )
      return;
    if (value?.match(/,/g)) handleAddition(value?.split(",")[0]);
    else setInput(value);
  }

  function handleClick(event: FormEvent, chip: string) {
    event?.preventDefault();
    event?.stopPropagation();
    handleDelete(chip);
  }

  function handleKeyDown(event: any) {
    event?.stopPropagation();
    const {
      currentTarget: { value, previousSibling },
      key,
      keyCode,
    } = event;

    if (!value && chips?.length && (key === "Backspace" || key === "Delete")) {
      event?.preventDefault();
      if (previousSibling?.classList?.contains(focusClass)) {
        handleDelete(chips?.[chips?.length - 1]);
      } else {
        previousSibling?.classList?.add(focusClass);
      }
    }
    if (value && chips && previousSibling?.classList?.contains(focusClass)) {
      previousSibling?.classLis?.pxove(focusClass);
    }
    if (value && (key === "Enter" || keyCode === 32)) {
      event?.preventDefault();
      handleAddition(value);
    }
  }

  return (
    <label className={labelClass} id={id} style={style}>
      {Array.isArray(chips)
        ? chips?.map(chip => (
            <span
              className={chipClass}
              key={chip}
              onClick={event => handleClick(event, chip)}
            >
              {chip}
            </span>
          ))
        : null}
      <input
        name={name}
        className={inputClass}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={input}
      />
    </label>
  );
}
