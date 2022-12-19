import styled from 'styled-components'

interface Image {
    _id: String;
    author: String;
    body: String;
    likes: Number;
    mediaList: Array<string>;
}

function Image({ post, className, postContext }: { post: Image, className?: string, postContext?: 'user'|'feed'}) {
    const fileServerUrl = 'http://localhost:3000'

    return <div className={className}>
        {post.mediaList.map((media: any) => {
            return <img src={`${fileServerUrl}/${media}`} />
        })
        }
    </div>
}

export default styled(Image)`

    height: ${props => props.postContext === 'user' ? "100%" : "500px"};
    width: 100%;
    img {
        object-fit:cover;
        height: 100%;
        width: 100%;
    }
`