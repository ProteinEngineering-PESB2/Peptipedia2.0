import Alignment from './Alignment'

const RenderSection = ({ section }) => {
    return (
        <>
        {section === "alignments" && <Alignment/>}
        </>
    )
}

export default RenderSection