import React from 'react';
import { ReactComponent as userApprove } from './svg/userApprove.svg';
import { ReactComponent as userPending } from './svg/userPending.svg';
import { ReactComponent as arrowDropDown } from './svg/arrow-drop-down.svg';
import { ReactComponent as logOut } from './svg/log-out.svg';
import { ReactComponent as pencil } from './svg/pencil.svg';
import { ReactComponent as remove } from './svg/remove.svg';
import { ReactComponent as news } from './svg/new.svg';
import { ReactComponent as event } from './svg/event.svg';
import { ReactComponent as unChecked } from './svg/unChecked.svg';
import { ReactComponent as checked } from './svg/checked.svg';
import { ReactComponent as major } from './svg/major.svg';
import { ReactComponent as slide } from './svg/slide.svg';
import { ReactComponent as time } from './svg/time.svg';
import { ReactComponent as home } from './svg/home.svg';
import { ReactComponent as infor } from './svg/infor.svg';
import { ReactComponent as money } from './svg/money.svg';

interface iconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

const icons: any = {
  'user-approve': userApprove,
  'user-pending': userPending,
  'arrow-drop-down': arrowDropDown,
  'log-out': logOut,
  pencil: pencil,
  remove: remove,
  news: news,
  event: event,
  unChecked: unChecked,
  checked: checked,
  major: major,
  slide: slide,
  time: time,
  home: home,
  infor: infor,
  money: money,
};

const Icon = ({ name, width = 20, height = width, className }: iconProps) => {
  if (!icons[name]) return null;

  const MapIcon = icons[name];
  return <MapIcon width={width} height={height} className={className} />;
};

export default Icon;
