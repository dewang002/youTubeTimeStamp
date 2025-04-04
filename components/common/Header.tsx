
interface HeaderProp {
    text: string;
}

const Header = ({ text }: HeaderProp) => {
    return (
        <div className="w-full px-10 flex items-center justify-end gap-2">
          Hello  <h1 className="w-8 h-8 font-bold uppercase rounded-full bg-blue-700 text-white flex items-center justify-center">{text.slice(0,1)}</h1>
        </div>
    )
}

export default Header