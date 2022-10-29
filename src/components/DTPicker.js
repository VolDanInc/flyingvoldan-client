import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

function DTPicker() {
  const [value, onChange] = useState(new Date());

//console.log("It's picked datetime .... " + value.toLocaleTimeString());
  return (
    <div>
      <DateTimePicker onChange={onChange} value={value} />
      <p>{value.valueOf()}</p>
    </div>
  );
}

export default DTPicker;