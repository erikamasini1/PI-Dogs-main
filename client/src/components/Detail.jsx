import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Detail(props){

    let params = match.params.id

    let dispatch = useDispatch();
    let detail = useSelector(state => state.detail)

    useEffect(() => {}, [])

    return(
        <div>

        </div>
    )
}