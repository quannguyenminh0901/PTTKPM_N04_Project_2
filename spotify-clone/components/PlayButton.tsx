import { FaPlay } from "react-icons/fa";

interface PlayButtonProps {
    onClick: () => void;
}
const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
    
    return ( 
        <button 
            className="
            transition opacity-0 rounded-full flex items-center 
            bg-green-500 
            p-4 drop-shadow-md translate translate-y-1/4 
            group-hover:opacity-100 group-hover:translate-y-0
            hover:scale-110"
            onClick={onClick}
        >
            <FaPlay className="text-black ml-1"/>
        </button>
     );
}
 
export default PlayButton;