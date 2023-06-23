const GenerateVideos = props => {
    const {content} = props
    return(
        <>
            <div className='video'>
                <video controls muted src={`https://firebasestorage.googleapis.com/v0/b/learnhub-a3bd7.appspot.com/o/overview%2Fvideos%2F${content.name}?alt=media&token=85e91ed4-0860-49c1-9242-982c8d6fe6e7`} />
                <h3>{content.name}</h3>
            </div>
        </>
    )
}

export default GenerateVideos