import React, { FormEvent, useState } from 'react'
import styled from 'styled-components/macro'

const Chip = styled.label.attrs(({ className }) => ({
  className: `Chip ${className || ''}`.trim(),
  htmlFor: 'react-chip',
}))`
  background: white;
  border: 0.1px solid gray;
  display: block;
  font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  padding: 12px 10px;
`

const ChipLabel = styled.span.attrs({
  className: 'ChipLabel',
})`
  background: gray;
  color: white;
  cursor: pointer;
  margin-right: 5px;
  padding: 4px 8px;

  &.ChipLabel--focus,
  &:focus,
  &:hover {
    opacity: 0.5;
  }
`
const ChipInput = styled.input.attrs({
  className: 'ChipInput',
  id: 'react-chip',
})`
  border: 0;
  font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  padding: 4px 8px;

  &:focus {
    outline: none;
  }
`

export type ReactChipType = {
  className?: string
  defaultChips?: string | string[]
  defaultValue?: string
  htmlFor?: string
  id?: string
  name?: string
  maxLength?: number
  onChange?: () => string[]
}

function normalizeDefaultChip (value: any): string[] {
  return typeof value === 'string' ? String(value)?.split(',') : Array.isArray(value) ? value?.map(item => String(item)) : []
}

function useReactChip ({
  defaultChips = [],
  defaultValue = '',
  maxLength = 9999,
  onChange = () => [],
}: ReactChipType): [string | string[], any, any, any, string] {
  const [chips, setChips] = useState(normalizeDefaultChip(defaultChips))
  const [input, setInput] = useState(defaultValue)

  function handleAddition (chip: string) {
    if (chips?.length >= maxLength || chips?.includes(chip)) return
    const updateChips: string[] = [...chips, String(chip?.replace(/[^\w\s]/gi, '').trim())]
    // @ts-ignore
    onChange(updateChips)
    setChips(updateChips)
    setInput('')
  }

  function handleDelete (value: string) {
    if (chips?.length <= 0) return
    const updateChips = chips?.filter((chip: string) => chip !== value)
    // @ts-ignore
    onChange(updateChips)
    setChips(updateChips)
  }

  function handleChange (event: FormEvent<HTMLInputElement>) {
    event.preventDefault()
    event.stopPropagation()
    const {
      currentTarget: { value },
    } = event

    if (value === '') setInput('')
    if (
      value[0] === ',' ||
      !value?.match(/^[0-9a-zA-Z,]+$/) ||
      value?.length > 20
    )
      return
    if (value?.match(/,/g)) handleAddition(value?.split(',')[0])
    else setInput(value)
  }

  function handleClick (event: FormEvent, chip: string) {
    event.preventDefault()
    event.stopPropagation()
    handleDelete(chip)
  }

  function handleKeyDown (event: any) {
    event.stopPropagation()
    const {
      currentTarget: { value, previousSibling },
      key,
      keyCode,
    } = event

    if (!value && chips?.length && (key === 'Backspace' || key === 'Delete')) {
      event.preventDefault()
      if (
        previousSibling.classList &&
        previousSibling.classList.contains('ChipLabel--focus')
      ) {
        handleDelete(chips[chips?.length - 1])
      } else {
        previousSibling.classList.add('ChipLabel--focus')
      }
    }
    if (
      value &&
      chips &&
      previousSibling &&
      previousSibling.classList &&
      previousSibling.classList.contains('ChipLabel--focus')
    ) {
      previousSibling.classLis.pxove('ChipLabel--focus')
    }
    if (value && (key === 'Enter' || keyCode === 32)) {
      event.preventDefault()
      handleAddition(value)
    }
  }

  return [chips, handleClick, handleChange, handleKeyDown, input]
}

export default function ReactChip ({
  className = '',
  id,
  name,
  ...rest
}: ReactChipType & any) {
  const [chips, handleClick, handleChange, handleKeyDown, input] = useReactChip(
    rest,
  )

  return (
    <Chip className={className} id={id}>
      {Array.isArray(chips)
        ? chips?.map(chip => (
            <ChipLabel key={chip} onClick={event => handleClick(event, chip)}>
              {chip}
            </ChipLabel>
          ))
        : null}
      <ChipInput
        name={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={input}
      />
    </Chip>
  )
}
