interface Image {
    _id: String;
    author: String;
    body: String;
    likes: Number;
    mediaList: Array<string>;
}

export function Image({ post }: { post: Image }) {
    const fileServerUrl = 'http://localhost:3000'
    console.log('medialist:  ')
    console.log((post.mediaList))

    return <div>
        {post.mediaList.map((media: any) => {
            return <img src={`${fileServerUrl}/${media}`} style={{ width: '100%', height: '400px' }} />
        })
        }
    </div>
}