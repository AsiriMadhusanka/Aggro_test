// components/DataItem.js

import React from 'react';

export default function DataItem({ item, onSelect }) {
  return (
    <div>
      <p>{`Value: ${item.value}`}</p>
      <p>{`Device ID: ${item.device_id}`}</p>
      <button onClick={() => onSelect(item.id)}>Select</button>
    </div>
  );
}
