import './index.css'

import { useEffect, useContext } from 'react'
import { ProSeqViewer } from 'proseqviewer/dist'

import { AppContext } from '../../../context/AppContext'

let options = {
    wrapLine: true,
    chunkSize: 20,
    sequenceColor: "clustal",
    lateralIndexes: false,
};

const MSA = ({ showArrow, setShowArrow }) =>  {

    const { state } = useContext(AppContext)

    const { data } = state

    useEffect(() => {
        const psv = new ProSeqViewer("psv")
        psv.draw({ sequences: data, options })
    }, [])

    return (
        <>
        <div className='row my-2'>
            <div className='col-md-12'>
                <h2 className="title fs-2 m-0">Multiple Sequence Alignment</h2>
            </div>
        </div>
        <div className='row g-3 my-2' onClick={() => setShowArrow(false)}>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-body'>
                        {showArrow ? (
                            <div className='arrow d-none d-sm-block'>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        ) : ("")}
                        <div id="psv"></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default MSA