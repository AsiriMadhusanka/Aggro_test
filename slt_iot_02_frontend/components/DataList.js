// components/DataList.js

import React from 'react';
import DataItem from './DataItem';

export default function DataList({ data, onSelect }) {
  return (
    <div>
      {data.map((item) => (
        <DataItem key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}
