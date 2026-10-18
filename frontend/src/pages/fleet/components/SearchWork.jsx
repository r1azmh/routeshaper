import React from 'react';

import AsyncSelect from 'react-select/async';
import {getWork} from "../../../managers/jobManage";
import {Controller, useFormContext} from "react-hook-form";

const filterWork = async (inputValue) => {
    return getWork(inputValue.toLowerCase())
};

const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(filterWork(inputValue));
        }, 1000);
    });

export default () => {
    const {control: hookControl} = useFormContext();
    return (
        <Controller
            control={hookControl}
            name="work"
            render={({field}) => (
                <AsyncSelect
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            "*": {
                                boxShadow: "none !important",
                            },
                        })
                    }}
                    cacheOptions
                    defaultOptions
                    loadOptions={promiseOptions}
                    {...field}
                    isClearable
                    // value={options.find(c => c.value === value)}
                    // onChange={val => onChange(val?.value)}
                />
            )}
        />

    );
}
