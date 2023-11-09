import avatarDefault from '../../atoms/images/default-avatar.png';

export const setAvatar = (avatar: string) => {
  if (avatar && avatar !== 'undefined') return `${process.env.REACT_APP_DOMAIN}/${avatar}`;
  return avatarDefault;
};

export const replace = (keyword: any) => {
  if (!keyword) return '';

  return keyword
    .toLowerCase()
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
};

export const searchMember = (name: any, keyword: any) => {
  if (name.includes(keyword)) return true;

  const wordsOfName = name.split(' ');
  const wordsOfKeyword = keyword.split(' ');

  if (wordsOfName.every((item: any) => wordsOfKeyword.indexOf(item) > -1)) return true;
  return false;
};
