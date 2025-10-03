/* eslint-disable react/prop-types */
import clsx from "clsx"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"

const MenuItem = ({
    item = {},
    index,
    onClick = () => { },
    open = false
}) => {
    return (item?.children ? (
        <div>
            <button key={index} className="p-2 menu_item flex w-full" onClick={() => onClick(index)}>
                {item?.icon}
                {item?.label}
                <div className="flex-1"></div>
                <ChevronDown className={clsx("transition duration-300", {
                    "transform rotate-180": open
                })} size={18} />

            </button>
            <div className={clsx("border-l pl-4 ml-4 transition duration-500", { "hidden": !open })}>
                {item.children.map((child, index) => (
                    <Link key={index} to={child?.to} className="p-2 menu_item">
                        {child?.icon}
                        {child?.label}
                    </Link>
                ))}
            </div>
        </div>
    ) : (
        <Link key={index} to={item?.to} className="p-2 menu_item">
            {item?.icon}
            {item?.label}
        </Link>
    ))
}

export default MenuItem