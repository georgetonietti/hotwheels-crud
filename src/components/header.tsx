import menuCategories from "../data/menuCategories";
import NavBar from "./ui/navBar";

export default function Header() {
    return (
        <header className="w-full bg-indigo-950">
            <div className="w-full h-16 max-w-[96rem] mx-auto px-16 flex justify-between items-center">
                <h1 className="font-bold text-2xl text-zinc-50 cursor-pointer">Logo</h1>
                <div>
                    <NavBar categories={menuCategories} />
                </div>
            </div>
        </header>
    );
}