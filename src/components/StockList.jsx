import { useState, useEffect, useContext } from "react"
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs"
import finnhub from "../APIs/finnhub"
import { WatchListContext } from "../context/watchListContext";

export const StockList = () => {
    /* defaults to an empty array, whatever you pass into the use state will be the default state */
    const [stock, setStock] = useState([])
    const {watchList} = useContext(WatchListContext)
    const changeColor = (change) => {
        return change > 0 ? "success" : "danger"
    }
    
    const renderIcon = (change) => {
        return change > 0 ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>
    }

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            const responses = []
            try {
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnhub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))
                console.log(responses)
                const data = responses.map((response) => {
                    return {
                            data: response.data,
                            symbol: response.config.params.symbol
                        }
                })
                console.log(data)
                if (isMounted){
                    setStock(data)
                }
                
            } catch (err) {
                console.log("Nothing")
            }
        }
        fetchData()

        return () => (isMounted = false)
    }, [watchList])

    return <div>
        <table className="table hover mt-5">
            <thead style={{colors: "rgb(79, 79, 102)"}}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chg</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Pclose</th>
                </tr>
            </thead>
            <tbody>
                {stock.map((stockData) => {
                    return (
                        <tr className="table-row" key={stockData.symbol}>
                            <th scope="row">{stockData.symbol}</th>
                            <td>{stockData.data.c}</td>
                            <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {renderIcon(stockData.data.d)}</td>
                            <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp} {renderIcon(stockData.data.d)}</td>
                            <td>{stockData.data.h}</td>
                            <td>{stockData.data.l}</td>
                            <td>{stockData.data.o}</td>
                            <td>{stockData.data.pc}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
};