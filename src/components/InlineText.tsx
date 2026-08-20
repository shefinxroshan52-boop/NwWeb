import React, { useState, useRef, useEffect } from 'react';
import { Edit3 } from 'lucide-react';

interface InlineTextProps {
  value: string;
  onChange: (val: string) => void;
  isEditMode: boolean;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'a';
  placeholder?: string;
  multiline?: boolean;
  style?: React.CSSProperties;
  id?: string;
}

export const InlineText: React.FC<InlineTextProps> = ({
  value,
  onChange,
  isEditMode,
  className = '',
  tag: Tag = 'span',
  placeholder = 'Click to edit...',
  multiline = false,
  style,
  id,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue.trim() !== value) {
      onChange(tempValue.trim() || placeholder);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleBlur();
    } else if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (!isEditMode) {
    return (
      <Tag id={id} className={className} style={style}>
        {value || placeholder}
      </Tag>
    );
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`bg-white/95 text-slate-900 border-2 border-indigo-500 rounded px-2 py-1 shadow-lg outline-none w-full resize-y text-inherit font-inherit ${className}`}
          rows={3}
          style={style}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-white/95 text-slate-900 border-2 border-indigo-500 rounded px-2 py-0.5 shadow-lg outline-none w-full text-inherit font-inherit ${className}`}
        style={style}
      />
    );
  }

  return (
    <Tag
      id={id}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`group/inline relative cursor-pointer transition-all duration-150 outline-none hover:outline-dashed hover:outline-2 hover:outline-indigo-400 hover:outline-offset-4 rounded-sm ${className}`}
      style={style}
      title="Click to edit text directly"
    >
      {value || placeholder}
      <span className="opacity-0 group-hover/inline:opacity-100 transition-opacity absolute -top-3 -right-3 bg-indigo-600 text-white p-0.5 rounded shadow pointer-events-none z-20">
        <Edit3 size={11} />
      </span>
    </Tag>
  );
};
