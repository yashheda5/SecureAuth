import React from 'react';
import { Input } from '../ui/input';

export default function CommonFormElement({ currentItem, value, onChange }) {
  let content = null;
  switch (currentItem.ComponentType) {
    case 'input':
      content = (
        <Input
          name={currentItem.name}
          id={currentItem.name}
          placeholder={currentItem.placeholder}
          value={value}
          onChange={onChange}
          type={currentItem.type}
        />
      );
      break;
    default:
      break;
  }
  return content;
}
