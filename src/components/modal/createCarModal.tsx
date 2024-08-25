import { IoClose } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import Button from "../ui/button";

const createCarSchema = z.object({
    brand: z.string().min(4, "Marca tem que ter no mínimo 4 digitos"),
    name: z.string().min(3, "Nome tem que ter no mínimo 3 digitos"),
    price: z.coerce.number().min(1000, "O preço deve ser um valor positivo acima de 1000"),
    color: z.string().min(3, "Cor é obrigatória"),
    year: z.coerce.number().min(1886, "Ano inválido").max(new Date().getFullYear(), "Ano inválido")
})

type CreateCarSchema = z.infer<typeof createCarSchema>

interface CreateCarModalProps {
    isOpen?: boolean,
    onClose: () => void
    createCar: (car: Car) => void
}

export default function CreateCarModal({ isOpen, onClose, createCar }: CreateCarModalProps) {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<CreateCarSchema>({
        resolver: zodResolver(createCarSchema),
        mode: "onSubmit"
    })

    function handleCreateCar(data: CreateCarSchema) {
        if (isValid) {
            const newCar = { ...data, id: crypto.randomUUID() }
            createCar(newCar);
            handleCloseModal()
        }
    }

    function handleCloseModal() {
        reset()
        onClose()
    }

    return (
        isOpen && (
            <div className="w-full h-full inset-0 fixed flex justify-center items-center">
                <div className="w-[600px] h-fit bg-zinc-50 rounded-lg opacity-100 relative flex flex-col justify-center items-center">
                    <div className="w-full px-10 pt-10  flex justify-between">
                        <h3 className="font-bold text-xl">Adicione um carro</h3>
                        <button onClick={handleCloseModal}><IoClose className="size-6" /></button>
                    </div>
                    <form onSubmit={handleSubmit(handleCreateCar)} className="w-full h-full p-10 flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[250px]">
                            <div className="w-full">
                                <label htmlFor="brand" className="w-full font-bold text-sm mb-2">Marca</label>
                                <input type="text" id="brand" {...register("brand")} className="w-full border border-zinc-400 rounded py-2 px-4" />
                                {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
                            </div>
                        </div>
                        <div className="flex-1 min-w-[250px]">
                            <div className="w-full">
                                <label htmlFor="brand" className="w-full font-bold text-sm mb-2">Nome</label>
                                <input type="text" id="name" {...register("name")} className="w-full border border-zinc-400 rounded py-2 px-4" />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <div className="w-full">
                                <label htmlFor="color" className="w-full font-bold text-sm mb-2">Cor</label>
                                <input type="text" id="color" {...register("color")} className="w-full border border-zinc-400 rounded py-2 px-4" />
                                {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
                            </div>
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <div className="w-full">
                                <label htmlFor="year" className="w-full font-bold text-sm mb-2">Ano</label>
                                <input type="number" id="year" {...register("year")} className="w-full border border-zinc-400 rounded py-2 px-4" />
                                {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
                            </div>
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <div className="w-full">
                                <label htmlFor="price" className="w-full font-bold text-sm mb-2">Preço</label>
                                <input type="number" id="price" {...register("price")} className="w-full border border-zinc-400 rounded py-2 px-4" />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>
                        </div>
                        <div className="w-full flex justify-end gap-2">
                            <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                            <Button type="submit">Salvar</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}