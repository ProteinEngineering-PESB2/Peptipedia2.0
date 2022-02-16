import { useEffect } from 'react'

import 'jquery/dist/jquery.min.js'

import 'datatables.net-dt/js/dataTables.dataTables.js'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css'
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import $ from 'jquery'

const Prueba = () => {

    useEffect(() => {
        $("#example").DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        })
    }, [])

    return (
        <div className='container p-4'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-8'>
                <table id="example" className='table table-striped text-center'>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Claudio</td>
                    <td>Claudio@gmail.com</td>
                </tr>
            </tbody>
        </table>
                </div>
            </div>
        </div>
    )
}

export default Prueba