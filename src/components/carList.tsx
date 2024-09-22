import { useEffect, useState } from "react";
import CarCard from "./carCard";
import EditCarModal from "./modal/editCarModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios"

interface CarListProps {
    list: Car[] | undefined
}

export default function CarList({ list }: CarListProps) {
    const [cars, setCars] = useState<Car[] | undefined>([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const search = searchParams.get('search')?.toString()

    function handleEditCardClick(car: Car) {
        setSelectedCar(car)
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
        setSelectedCar(null)
    }

        const { mutateAsync: editCarFn } = useMutation({
        mutationFn: async (car: Car) => {
           const response =  await axios.put(`http://localhost:5000/cars`, car)
            if(response.status === 200 || response.status === 204) {
                const data = response.data
                alert(`Carro editado com sucesso! Status: ${response.status}`)
                return data
            } else {
                alert(`Falha ao editar o carro! Error: ${response.status}`)
            }
        },
        onSuccess(_, variables) {
            queryClient.setQueryData<Car[]>(['cars'], (data = []) => {
                return data.map((car) => {
                    if(car.id === variables.id) return variables
                    return car
                })
            })
        }
    })
        const { mutateAsync: removeCarFn } = useMutation({
        mutationFn: async (id: string) => {
           const response =  await axios.delete(`http://localhost:5000/cars/${id}`)
            if(response.status === 200 || response.status === 204) {
                const data = response.data
                alert(`Carro removido com sucesso! Status: ${response.status}`)
                return data
            } else {
                alert(`Falha ao remover o carro! Error: ${response.status}`)
            }
        },
        onSuccess(_, variables) {
            queryClient.setQueryData<Car[]>(['cars'], (data = []) => {
                console.log(variables)
                return data.filter(car => car.id !== variables)
            })
        }
    })

    useEffect(() => {
        if(search) {
            const searchFilters = search.split(' ').map(filter => filter.toLowerCase());
            const filtredCars = list?.filter(car => 
                searchFilters.every(filter => 
                    Object.values(car).some(value => value.toString().toLowerCase().includes(filter))
                )
            );

              setCars(filtredCars)
        }
        else {
            setCars(list)
        }

    }, [list, search])

    return (
        <div className="grid grid-cols-5 gap-4">
            {
                cars?.map(car => (
                    <CarCard key={car.id} car={car} remove={() => removeCarFn(car.id)} edit={() => (handleEditCardClick(car))}/>
                ))
            }
            {
               selectedCar && (
                <EditCarModal isOpen={isOpen} onClose={closeModal} car={selectedCar} editCar={editCarFn}/>
               ) 
            }
        </div>
    );
}