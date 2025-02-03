import React from 'react'
import AddGoods from './AddGoods'
import { useState } from 'react'

const GoodsDetail = ({id}) => {
    
    return (
        <>
            <AddGoods detail={id} />
        </>

    )
}

export default GoodsDetail
