type Direction = 'row' | 'column'

function Flex({children, direction}: {children: React.ReactNode, direction?: Direction}) {

    return <div style={{display: 'flex', justifyContent: 'center', gap: '9em'}}>
        {children}
    </div>

}

export default Flex