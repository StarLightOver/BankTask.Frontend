import {useParams} from "react-router";
import DisplayFounder from "./DisplayFounder";

const EditFounder = () => {
    const { id } = useParams();

    return (
        <DisplayFounder type={"edit"} id={id}/>
    )
}

export default EditFounder