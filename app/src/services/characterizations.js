import axios from 'axios'

export const phisicochemical = async (post) => {
    const { data } = await axios.post(`/api/phisicochemical`, post)

    const { result } = data

    return result
}