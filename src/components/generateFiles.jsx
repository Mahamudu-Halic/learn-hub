const GenerateFiles = props => {
    const {content, course} = props
    return(
        <>
            <a href={`https://firebasestorage.googleapis.com/v0/b/learnhub-a3bd7.appspot.com/o/overview%2Ffiles%2F${content.name}?alt=media&token=85e91ed4-0860-49c1-9242-982c8d6fe6e7`}>
                <div>
                    <h3>
                        <i className='fa-solid fa-book'></i> {content.name}
                    </h3>
                </div>
            </a>
        </>
    )
}

export default GenerateFiles