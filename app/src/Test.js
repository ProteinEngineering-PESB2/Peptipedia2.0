import axios from 'axios'

import Stack from "@mui/material/Stack"
import Input from "@mui/material/Input"

const Test = () => {

    const handleChangeFileInput = async (e) => {
        const file = e.target.files[0]
        
        const dto_object = new Blob([JSON.stringify({
            description: 'description',
        })], {
         type: 'application/json'
        })

        const post = new FormData() 
        post.append('file', file)
        post.append('json', dto_object)

        const res = await axios.post('/api/test', post)
        console.log(res)
    }

    return (
        <>
        <h1>Testing...</h1>

        <Stack direction="row" spacing={2}>
            <label htmlFor="contained-button-file">
                <Input
                    id="contained-button-file"
                    type="file"
                    onChange={handleChangeFileInput}
                />
                
            </label>
        </Stack>
        </>
    )
}

export default Test