import styled from 'styled-components'

interface IPropsLike {
    onLike: () => void;
    children: JSX.Element;
  }

function Like({ onLike, children }: IPropsLike) {
    return <button style={{ padding: '0px', borderWidth: '0px', backgroundColor: 'white' }} onClick={onLike}>{children}</button>
}

export default styled(Like)`
    padding: 0px;
    border-width: 0px;
    background-color: white
`