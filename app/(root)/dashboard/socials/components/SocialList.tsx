"use client"
import { selectUser, removeSocial } from '@/redux/features/users/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from 'react-icons/rx';

import { IconType } from 'react-icons';
import { getIconByName } from '@/libs/socials';
import { BarLoader } from 'react-spinners';

function SocialPlatformIcon(name: string) {
    const Icon: IconType = getIconByName(name);
    if (!Icon) return <RxCross1 />
    return <Icon size={30} />;
}


export default function SocialList() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    if (user === null) {
        return <BarLoader width={200} color="#26D38A" />
    }

    console.log('SocialList', user)

    const handleDelete = (id: string) => {
        dispatch(removeSocial(id));
    }

    return (
        <div>
            {user?.socials.map(entry => (<div className='flex mb-5 border-b border-slate-400' key={entry.provider}>
                <div className='flex flex-col items-center grow'>
                    {SocialPlatformIcon(entry.provider)}
                    <span className='font-bold text-xs'>{entry.provider}</span>
                    <span >{entry.username}</span>
                </div>
                <RxCross1 onClick={() => { handleDelete(entry.provider) }} />
            </div>))}
        </div>
    )
}