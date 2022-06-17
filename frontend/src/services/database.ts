import axios from "axios"

export const getGeneralStatistic = async () => {
    const { data } = await axios.get("/api/get_general_act_statistic/")
}