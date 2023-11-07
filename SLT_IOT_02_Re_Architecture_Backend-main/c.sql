```
CREATE TABLE data_value (
  dataid UUID PRIMARY KEY,
  userid UUID,
  farmid UUID,
  device_id UUID,
  datetime TIMESTAMP,
  smois TEXT,
  temp TEXT,
  hum TEXT,
  stemp TEXT,
  sec TEXT,
  ph TEXT,
  n TEXT,
  p TEXT,
  k TEXT,
  r TEXT,
  si TEXT,
  b TEXT,
);

 dataid  | b   | datetime  | device_id  | farmid | hum  | k | n | p | ph | r   | sec | si | smois | stemp | temp | userid
---------+-----+-----------+------------+--------+------+---+---+---+----+-----+-----+----+-------+-------+------+--------
```