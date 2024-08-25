import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import Button from "./ui/button";

const carsSearchSchema = z.object({
    search: z.string()
})

type CarsSearchSchema = z.infer<typeof carsSearchSchema>

export default function CarsSearch() {
    const [searchParams, setSearchParams] = useSearchParams()

    const { register, handleSubmit } = useForm<CarsSearchSchema>({
        resolver: zodResolver(carsSearchSchema)
    })

    function handleSerchCars(data: CarsSearchSchema) {
        setSearchParams(params => {
            params.set('search', data.search)
            return params
        })
    }

    return (
        <form onSubmit={handleSubmit(handleSerchCars)} className="w-full h-16 flex gap-4">
            <input 
                {...register('search')}
                type="text"
                placeholder="Buscar carro"
                defaultValue={searchParams?.get('search')?.toString()}
                className="w-80 h-10 border border-zinc-400 text-zinc-600 rounded-md py-1 px-3 focus:outline-none focus:border-indigo-900" />
            <Button type="submit">Buscar</Button>
        </form>
    );
}