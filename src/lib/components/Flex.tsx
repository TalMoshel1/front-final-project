import styled from 'styled-components'


type Direction = 'row' | 'column'


function Flex({children, direction}: {children: React.ReactNode, direction?: Direction}) {

    return <Style style={{display: 'flex'}}>
        {children}
    </Style>

}

export default Flex

const Style = styled.div`
    @media (min-width: 62.5rem) {
        gap: 6em;
    }

    @media (max-width: 35.9375rem) {
        width:100%;
    }

    @media (max-width: 62.5rem) {
        justify-content: center;
    }

    display: flex;
`