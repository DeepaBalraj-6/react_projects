import { useNavigate } from 'react-router-dom';
import { FaTasks, FaCalculator, FaMoneyBillWave, FaUsersCog, FaGlobe } from 'react-icons/fa';

function Home(){
    const navigate = useNavigate();

    return(
        <div className="home-container">
            <IconButton icon={<FaTasks />} label="To-Do" onClick={() => navigate('/todo')} />
            <IconButton icon={<FaCalculator />} label="Calculator" onClick={() => navigate('/calculator')} />
            <IconButton icon={<FaMoneyBillWave />} label="Currency" onClick={() => navigate('/currencyConvertor')} />
            <IconButton icon={<FaUsersCog />} label="Allocator" onClick={() => navigate('/workAllocator')} />
            <IconButton icon={<FaGlobe />} label="Country" onClick={() => navigate('/countryLens')} />
        </div>
    );
}

function IconButton({ icon, label, onClick }) {
    return (
        <button className="icon-button" onClick={onClick}>
            {icon}
            <span>{label}</span>
        </button>
    );
}

export default Home;