import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectInput = ({form, setForm, mappingData, field, defaultValue}) => (
    <>
        <Select
            labelInValue
            className="outline-none mx-auto  text-left md:ml-2 items-center w-full md:w-4/5 border-2 py-2 px-3 rounded-2xl"
            defaultValue={defaultValue ? defaultValue : null}
            onChange={(selected) => setForm({...form, [field]: selected.value})}>
            {!form?.marka ? mappingData?.map((number) => (
                <Option key={number} value={number}>{number}</Option>
            )) : mappingData.filter((number) => number.includes(form?.marka)).map((number) => (
                <Option key={number} value={number}>{number}</Option>
            ))}
        </Select>
    </>
)
export default SelectInput;