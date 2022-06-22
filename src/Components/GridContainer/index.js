import React, { useContext } from 'react';
import { ContextState } from '../../App';

const GridContainer = () => {
    const contextData = useContext(ContextState);
    return (
        <div className='gridContainer'>
            {contextData?.albumData?.filter(x => x["title"].toLowerCase().includes(contextData.filter.toString())).map((item) => {
                return (
                    <div onClick={()=> window.open(item.url, "_blank")} className='gridItem' key={item.id}>
                        <img src={item.thumbnailUrl} />
                        <p> {item.title}</p>
                    </div>
                )
            })}
            {contextData.isFetching && <p>Loading...</p>}
        </div>
    )
}

export default GridContainer