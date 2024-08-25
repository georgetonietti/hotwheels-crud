import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";

interface CarCardProps {
    car: Car,
    remove: (id: string) => void
    edit: () => void
}

export default function CarCard({ car, remove, edit }: CarCardProps) {
    return (
        <div className="w-full h-36 border border-solid border-zinc-300 rounded-lg p-4 flex flex-col justify-between">
            <div className="flex justify-between">
                <h1 className="font-semibold text-lg">{car.brand}</h1>
                <div className="flex gap-1">
                    <button
                        onClick={() => remove(car.id)}
                        className="flex justify-center items-center px-2 border border-slate-300 rounded-lg text-slate-500 hover:bg-indigo-900 hover:text-slate-50 transition duration-150 ease-in-out"
                    >
                        <CiTrash />
                    </button>

                    <button
                        onClick={edit}
                        className="flex justify-center items-center px-2 border border-slate-300 rounded-lg text-slate-500 hover:bg-indigo-900 hover:text-slate-50  transition duration-150 ease-in-out"
                    >
                        <FaRegEdit />
                    </button>
                </div>
            </div>
            <div >
                <div className="flex justify-between">
                    <span className="font-medium">{car.name}</span>
                    <span className="font-medium">{car.color}</span>
                </div>
                <div className="flex justify-between">
                    <span>{car.year}</span>
                    <span>{car.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
            </div>
        </div>
    );
}