import { Outlet } from 'react-router-dom';
import Header from './components/header';

export default function Layout() {
    return (
        <div>
            <Header />
            <main className='w-full max-w-[96rem] mx-auto px-16 py-8'>
                <Outlet />
            </main>
        </div>
    );
}