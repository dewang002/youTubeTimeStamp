
interface HeaderProp {
    text: string;
}

const Header = ({ text }: HeaderProp) => {
    return (
        <div className=" px-10 flex items-center justify-end gap-2">
            <div className="bg-green-700 shadow-[#00000063] shadow-lg p-1 gap-2 text-white rounded flex items-center justify-center">
                Hello, <h1 className="w-8 h-8 font-bold uppercase rounded-full bg-blue-700 text-white flex items-center justify-center">{text.slice(0, 1)}</h1>
            </div>
        </div>
    )
}

export default Header