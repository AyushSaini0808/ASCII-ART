import React from 'react'
import PropTypes from "prop-types";
import {Upload} from "lucide-react"
const UploadSection = ({onImageUpload}) => {
    return (
        <div className={"mt-7 bg-[rgba(120,119,198,0.2)] backdrop-blur-xl shadow-2xl rounded-2xl border-gray-800/40 text-white"}>
            <div className={"mb-8 p-3"}>
                <label htmlFor={"imageUpload"} className={"h-40 group relative flex flex-col items-center justify-center border-2 border-dashed m-2 cursor-pointer border-gray-400 rounded-lg hover:border-purple-400 hover:bg-purple-500/5"}>
                    <Upload/>
                    <p className={"text-sm m-3"}>Click here to upload or drag and drop image</p>
                    <input type={"file"} id={"imageUpload"} className={"hidden"} onChange={onImageUpload}/>
                </label>
            </div>
        </div>
    )
}
UploadSection.propTypes={
    onImageUpload:PropTypes.func
}
export default UploadSection
