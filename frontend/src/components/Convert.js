import { useRef } from "react"
import Wrapper from "../helper/Wrapper"

const Convert = () => {
    let eth = useRef(0)
    let mpay = useRef(0)

    const onEthChange = (event) => {
        let ethQuantity = eth.current.value
        mpay.current.value = ethQuantity*1000
    }

    return (
        <Wrapper>
            <div className="row">
                <div className="col-5">
                    <label className="m-4">ETH</label>
                    <input type='text' onChange={onEthChange} ref={eth} />
                </div>
                <div className="col-2">
                    <label className="m-4">Equals</label>
                </div>
                <div className="col-5">
                    <label className="m-4">MPAY</label>
                    <input type='text' ref={mpay} />
                </div>
            </div>
        </Wrapper>
    )
}

export default Convert