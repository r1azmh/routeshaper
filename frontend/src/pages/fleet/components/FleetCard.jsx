import {useFormContext} from "react-hook-form";
import React, {useMemo} from "react";
import {Card, Label} from "flowbite-react";
import {CiCircleMinus} from "react-icons/ci";
import SearchVehicleProfile from "./SearchVehicleProfile";
import {BiTargetLock} from "react-icons/bi";
import SearchComponent from "../../../components/SearchComponent";

const customTheme = {
    minusButton: "group bg-red-300 text-red-600  m-3 hover:bg-red-600 hover:text-white flex items-stretch rounded-full text-xl text-red-500 items-center justify-center text-center font-medium absolute top-0 right-5",
};
function FleetCard({handleRemove, index, isEdit}) {
    const {register, getValues, setValue, lat: lt, lng: ln} = useFormContext()
    const setLatLang = (value) => {
        // console.log(value)
        setValue(`vehicles.${index}.lat`, value?.Latitude)
        setValue(`vehicles.${index}.lng`, value?.Longitude)
    }
    const lat = useMemo(() => {
        const lat = getValues(`vehicles.${index}.lat`)
        return parseFloat(lat)?.toFixed(4) ?? ''
    }, [getValues(`vehicles.${index}.lat`)])
    const lng = useMemo(() => {
        const lat = getValues(`vehicles.${index}.lng`)
        return parseFloat(lat)?.toFixed(4) ?? ''
    }, [getValues(`vehicles.${index}.lng`)])
    return (
        <>
            <Card className="relative mb-4">

                {!isEdit && <button className={customTheme.minusButton} onClick={handleRemove(index)}
                >
                    <CiCircleMinus/>
                </button>}

                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4 justify-between items-center">


                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                            <input type="text"
                                   id="number-input" {...register(`vehicles.${index}.name`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Vehicle Name" required/>
                        </div>
                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert
                                Capacity:</label>
                            <input pattern="^\d+$" type="number"
                                   id="number-input" {...register(`vehicles.${index}.capacity`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="100" required/>
                        </div>
                        <div className="col-span-2">
                            <div className="mb-2 block">
                                <Label htmlFor="type" value="Vehicle Profile">Vehicle Profile</Label>
                            </div>
                            <SearchVehicleProfile name={`vehicles.${index}.profile`}/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">

                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                                Time:</label>
                            <input step="1" type="datetime-local"
                                   id="number-input" {...register(`vehicles.${index}.start_at`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="100" required/>
                        </div>
                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                                Time:</label>
                            <input pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}" step="1"
                                   type="datetime-local" id="number-input" {...register(`vehicles.${index}.end_at`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="5" required/>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <span className="inline-flex  justify-center items-center "><BiTargetLock
                                className="text-rose-600"/>Longitude:{!isNaN(lng) && lng}</span>
                            <span className="inline-flex justify-center items-center"><BiTargetLock
                                className="text-green-400"/>Latitude:{!isNaN(lat) && lat}</span>
                        </div>
                        <div>
                            <SearchComponent setValue={setLatLang} position={{lat: lt, lng: ln}}/>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default FleetCard;