import Wrapper from "../helper/Wrapper"

const Invest = props => {
    let investedAmount = 0
    const onInvestClicked = () => {
        console.log('Invest')
    }
    return (
        <Wrapper>
            <div className="row m-2">
                <div className="col-6">
                    <button className="btn btn-primary" onClick={onInvestClicked}>Invest</button>
                </div>
                <div className="col-6">
                    <label>Total Invested:&nbsp;&nbsp;&nbsp;</label>
                    <label>{investedAmount}</label>
                </div>
            </div>
        </Wrapper>
    )
}

export default Invest