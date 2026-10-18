import {useFormContext} from "react-hook-form";
import React, {useMemo} from "react";
import {IoIosAddCircleOutline} from "react-icons/io";
import FleetCard from "./FleetCard";


const customTheme = {
    addButton: "bg-green-300 hover:bg-green-600 text-green-600 hover:text-white p-2 rounded"
};

function FleetFormDefinition({isEdit}) {
    const {watch, getValues, setValue, formState: {errors}} = useFormContext()
    const newVehicles = {lng: '', lat: '', start_at: '', capacity: 0, end_at: ''}


    const MultiField = useMemo(() => {
        return getValues('vehicles')
    }, [watch('vehicles')])

    const handleAddJob = () => {
        const vehicles = getValues('vehicles')
        setValue('vehicles', [...vehicles, newVehicles])
    }
    const handleRemove = (index) => () => {
        if (index !== 0) {
            const vehicles = getValues('vehicles')
            vehicles.splice(index, 1)
            setValue('vehicles', vehicles)
        }
    }

    // useMemo(() => {
    //     setValue('vehicles', [newVehicles])
    // }, [])
    return (
        <>
            {MultiField?.map((element, index) => <FleetCard isEdit={isEdit} key={index} index={index}
                                                            handleRemove={handleRemove}
            />)}

            <div className="flex justify-center items-center my-4">
                {!isEdit && <button className={customTheme.addButton} onClick={handleAddJob}>
                    <IoIosAddCircleOutline className="h-6 w-6"/>
                </button>}
            </div>

        </>
    )
}

export default FleetFormDefinition
