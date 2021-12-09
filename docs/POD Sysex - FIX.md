This is what the docu `POD Sysex - English.pdf` says:
```
    POD sends and receives Program and Global dump data in High-Low Nibbilized format. Data Locations in the dump are described later in this document with reference to ONE POD Byte.
    ONE POD BYTE (8 bits):
    0: A7 A6 A5 A4 A3 A2 A1 A0
    TRANSMITTED and RECEIVED AS:
    0: 00 00 00 00 A7 A6 A5 A4
    1: 00 00 00 00 A3 A2 A1 A0
```

**IT IS NOT TRUE!!!**

This is what the data is TRANSMITTED and RECEIVED AS:

```
    ONE POD BYTE (8 bits):
    0: A7 A6 A5 A4 A3 A2 A1 A0
    TRANSMITTED and RECEIVED AS:
    0: 0A 07 0A 06 0A 05 0A 04 
    1: 0A 03 0A 02 0A 01 0A 00
```

The HEX value is splitted in 2 parts and every parts gets a `0` prependet