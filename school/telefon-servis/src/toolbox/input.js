import React from 'react';

const Input = ({
                   disabled,
                   containerClass,
                   label,
                   setForm,
                   form,
                   text,
                   field,
                   type,
                   textColor,
                   labelClass,
                   style,
                   inputClass,
                   maxLength,
                   onlyNumber
               }) => (
    <>
        <div
            className={`flex w-full mt-2 md:flex-row flex-col justify-center items-center ${!!containerClass && containerClass}`}>
            <label
                className={`text-slate-600  w-full md:w-1/5 text-center md:text-right ${labelClass && labelClass}`}
                htmlFor="name">{label}</label>
            <input
                maxLength={maxLength}
                style={style}
                disabled={disabled}
                onChange={({target: {value}}) => setForm({
                    ...form,
                    [field]: onlyNumber ? value.replace(/[^0-9]/g, '') : value
                })}
                className={`outline-none  text-left md:ml-2 items-center w-full md:w-4/5 border-2 py-2 px-3 rounded-2xl ${inputClass ? inputClass : "max-w-350"}`}
                type={type ? type : "text"} placeholder={label}/>
        </div>
        <span style={{color: textColor && `var(${textColor})`}}
              className={`text-xs mt-1 text-center mx-auto w-full flex justify-center ${!textColor && '  text-orange'}`}>{text && text}</span>
    </>
);

export default Input;