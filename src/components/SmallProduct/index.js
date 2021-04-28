import React, {Fragment} from 'react'

const SmallProduct = ({index, product}) => (
    <tr className={`border-b border-gray-200 hover:bg-gray-50`}>
        <td className="py-3 px-6 text-left whitespace-nowrap">
            <div className="flex items-center">
                <span className="font-medium">{index}</span>
            </div>
        </td>
        <td className="py-3 px-3 text-left whitespace-nowrap">
            <div className="flex items-center">
                <span className="font-medium">{product.name}</span>
            </div>
        </td>
        <td className="py-3 px-6 text-left">
            <div className="flex items-center">
                <span className="font-medium">{product.price}</span>
            </div>
        </td>
        <td className="py-6 px-6 text-center">
        </td>
    </tr>
)

export default SmallProduct