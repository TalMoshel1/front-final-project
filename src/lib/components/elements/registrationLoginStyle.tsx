import styled from "styled-components"

function Style({page, children, className}:{page?: 'register'|'login', children: JSX.Element, className?: string}) {
   
    return <div className={className}>
            {children}
    </div>
}

export default styled(Style) `
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 1em;
    align-items: center;
    width: 70%;
    min-width: 150px;
    max-width: 500px;
    background-color: white;
    border: 0.1em solid black;
    position: relative;
    top: calc(50%);
    transform: translateY(-50.0%);
    /* height: fit-content; */
    height: ${props => props.page === 'register' ? "fit-content" : "fit-content"};
    box-shadow: rgba(220, 99, 204, 0.25) 0px 5px 30px;
    border-radius: 20px;
    border: 1.5px solid #eeeeee;
`