import React, {Fragment} from "react";

const MenuSummary = ({menu}) => (
    <tr>
        <td className="py-3 px-3 text-left whitespace-nowrap">
            <div className="flex items-center">
                <span className="font-medium">{menu.name}</span>
            </div>
        </td>
    </tr>
)

export default MenuSummary