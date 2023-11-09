export const keyMajor = {
  KHMT: 0,
  KTPM: 1,
  HTTT: 2,
  CNTT: 3,
};

export const valueMajor = {
  KHMT: 'Khoa học máy tính',
  KTPM: 'Kỹ thuật phần mềm',
  HTTT: 'Hệ thống thông tin',
  CNTT: 'Công nghệ thông tin',
};

export const getMajor = (key: any) => {
  switch (key) {
    case '0':
      return valueMajor.KHMT;
    case '1':
      return valueMajor.KTPM;
    case '2':
      return valueMajor.HTTT;
    case '3':
      return valueMajor.CNTT;
  }
};
