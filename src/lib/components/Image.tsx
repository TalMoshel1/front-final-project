import styled from 'styled-components'

interface Image {
    _id: String;
    author: String;
    body: String;
    likes: Number;
    mediaList: Array<string>;
}

function Image({ post, className }: { post: Image, className?: string}) {
    const fileServerUrl = 'http://localhost:3000'

    return <div className={className}>
        {post.mediaList.map((media: any) => {
            return <img src={`${fileServerUrl}/${media}`} />
        })
        }
    </div>
}

export default styled(Image)`
    height: 100%;
    width: 100%;
    img {
        object-fit:cover;
        height: 30rem;
        width: 25rem;
    }

    @media (max-width: 35.833125rem) {
        img {
            height: 100%;
            width: 100%;
        }
    }
`