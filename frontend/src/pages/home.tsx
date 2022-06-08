import { useEffect } from "react"
import Layout from "../components/layout"
import { useAppContext } from "../hooks/useAppContext"

export default function Home() {
    const { toggleSection } = useAppContext()

    useEffect(() => {
        toggleSection("home")
    }, [])

    return (
        <Layout>
            <h1>Hello World</h1>
        </Layout>
    )
}