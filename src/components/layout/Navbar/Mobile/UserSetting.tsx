import React, { ReactNode } from 'react';

type UserSettingProps = {
  label: string;
  icon: ReactNode;
};

export default function UserSetting({ label, icon }: UserSettingProps) {
  return (
    <div className='flex items-center gap-2'>
      {icon}
      <span>{label}</span>
    </div>
  );
}
