import blasterjs from 'biojs-vis-blasterjs'

import { useEffect, useContext } from 'react'

import { AppContext } from '../../../context/AppContext'

const Blast = () => {
    const { state } = useContext(AppContext)

    const { data } = state

    useEffect(() => {
        new blasterjs({
            string: data,
            multipleAlignments: "blast-multiple-alignments",
            alignmentsTable: "blast-alignments-table",
            singleAlignment: "blast-single-alignment"
        })
    }, [])

    return (
        <>
        <div className='row my-2'>
            <div className='col-12'>
                <h2 className='title fs-2 m-0'>Blast</h2>
            </div>
        </div>
        <div className='row g-3 my-2'>
            <h4>Subtítulo</h4>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-header'>
                        <h2 className='h3 card-title text-center'>No se que es esto</h2>
                    </div>
                    <div className='p-2 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div id="blast-multiple-alignments" className='py-2 d-none d-sm-block'></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='row g-3 my-2'>
            <div className='col-12'>
                <h3>Subtítulo</h3>
                <div className='card'>
                    <div className='card-header'>
                        <h3>asdjsk</h3>
                    </div>
                    <div className='card-body'>
                        <div className='table-responsive'>
                            <div id="blast-alignments-table" className='pt-0'></div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div className='row g-3 mt-2 mb-4'>
            <h4>Subtítulo</h4>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-header'>
                        <h3>asdjkalsdjl</h3>
                    </div>
                    <div className='card-body'>
                        <div id="blast-single-alignment" className='pt-0'></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Blast