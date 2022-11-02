import Wrapper from "../helper/Wrapper"

const Invest = props => {
    let investedAmount = 0
    const onInvestClicked = () => {
        console.log('Invest')
    }
    return (
        <Wrapper>
            <div className="row m-2 mb-4">
                <div className="col-6">
                    <button className="btn btn-primary" onClick={onInvestClicked}>Invest</button>
                </div>
                <div className="col-6">
                    <label>Total Supply:&nbsp;&nbsp;&nbsp;</label>
                    <label>{investedAmount}</label>
                </div>
            </div>
            <div className="row m-2 mt-4">
                <div className="col-4">
                    <label>User's MPay Balance</label>
                </div>
                <div className="col-4">
                    <button className="form-control btn btn-primary">Cancel Investment</button>
                </div>
                <div className="col-4">
                    <button className="form-control btn btn-primary">Stake Investment</button>
                </div>
            </div>
        </Wrapper>
    )
}

export default Invest