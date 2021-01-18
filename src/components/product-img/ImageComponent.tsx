import React, { Fragment } from 'react'

interface ComponentProps {
    source: string
}

const ImageConponent: React.FC<ComponentProps> = (props) => {
    return <Fragment>
        {props.source.startsWith('http') ?
            <img src={props.source} alt="img" height="150" /> :
            <img src={`data:image/jpeg;base64,${props.source}`} alt="img" height="150" />
        }
    </Fragment>
}

export default ImageConponent;