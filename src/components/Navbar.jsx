import dayjs from 'dayjs';
import {navIcons, navLinks} from '#constants';
import { useState, useEffect } from 'react';
import useWindowStore from '#store/window';

const Navbar = () => {
    const {openWindow} = useWindowStore();
    const [time, setTime] = useState(dayjs());

    useEffect(() => {
        const interval = setInterval(() => setTime(dayjs()), 60000);
        return () => clearInterval(interval);
    }, []);

  return (
    <nav>
        <div>
            <img src='/images/logo.svg' alt='logo'/>
            <p className='font-bold'>Ayush's Portfolio</p>

            <ul>
                {navLinks.map(({id, name, type}) => (
                    <li key={id} onClick={() => openWindow(type)}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>

        <div>
            <ul>
                {navIcons.map(({id, img }) => (
                    <li key={id}>
                        <img src={img} className='icon-hover' alt={`icon-${id}`}/>
                    </li>
                ))}
            </ul>
            <time>{time.format('ddd MMM D h:mm A')}</time>
        </div>
    </nav>
  )
}

export default Navbar