import CarList from "../components/carList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CarsFilter from "../components/carsSearch";
import CreateCarModal from "../components/modal/createCarModal";
import { useState } from "react";
import Button from "../components/ui/button";
import axios from "axios"

export type CarResponse = Car[]

export default function Cars() {
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    const { data: carsResponse, isLoading } = useQuery<CarResponse>({
        queryKey: ['cars'],
        queryFn: async () => {
            try {
                const response = await axios.get<CarResponse>('http://localhost:5000/cars');

                if (response.status === 200) {
                    const data = response.data;
                    return data;
                } else {
                    throw new Error('Failed to fetch cars');
                }
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching cars');
            }
        }
    })

    const { mutateAsync: createCarFn } = useMutation({
        mutationFn: async (car: Car) => {

            const response = await axios.post('http://localhost:5000/cars',car)

            if (response.status === 200 || response.status === 201) {
                const data = response.data
                alert(`Carro cadastrado com sucesso! Status: ${response.status}`)
                return data
            } else {
                alert(`Falha ao cadastrar o carro! Error: ${response.status}`)
            }
        },
        onSuccess(_, variables) {
            queryClient.setQueryData<Car[]>(['cars'], (data = []) => {
                return [...data, variables]
            })
        }
    })

    return (
        isLoading ? (
            <h1>Carregando...</h1>
        ) : (
            <div className="">
                <div className="w-full flex justify-between">
                    <CarsFilter />
                    <Button onClick={openModal}>
                        Adicionar carro
                    </Button>
                </div>
                <CarList list={carsResponse} />
                <CreateCarModal createCar={createCarFn} isOpen={isOpen} onClose={closeModal} />

            </div>
        )
    );
}