import { useContext, useEffect } from "react"
import Layout from "../components/layout"
import AppContext from "../context/AppContext"

export default function Home() {
    const { toggleSection } = useContext(AppContext)

    useEffect(() => {
        toggleSection("home")
    }, [])

    return (
        <Layout>
            <h1>Hello World</h1>
        </Layout>
    )
}