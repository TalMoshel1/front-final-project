import React, { useEffect, useState, useRef } from 'react';

export function Newpost() {
    return <div>
        <form action="/api/posts" encType="multipart/form-data" method="post">
            <div className="form-group">
                <input type="file" className="form-control-file" name="uploaded_file" />
                <input type="text" className="form-control" placeholder="Number of speakers" name="nspeakers" />
                <input type="submit" value="Get me the stats!" className="btn btn-default" />
            </div>
        </form>
    </div>
}