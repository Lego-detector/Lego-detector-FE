type paramProp = {
    id: string
}

export default async function Result({ params }: { params: paramProp }) {
    const { id } = await params;
    
    return (
        <>
            <h2>Result</h2>
            <p>ID: {id}</p>
        </>
    );
}