import { Link } from "react-router-dom";

interface NavBarProps {
    categories: { name: string, link: string }[]
}

export default function NavBar({ categories }: NavBarProps) {
    return (
        <nav>
            <ul className="flex justify-center items-center gap-4">
                {categories?.map((content, index) => (
                    <li key={index + 1}>
                        <Link to={content.link} className="font-semibold text-zinc-50 hover:text-blue-300 transition duration-150 ease-in-out">{content.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}