import {useParams} from "react-router";
import DisplayClient from "./DisplayClient";

const EditClient = () => {
    const { id } = useParams();

    return (
        <DisplayClient type={"edit"} id={id}/>
    )
}

export default EditClient