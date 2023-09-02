
import { Outlet, Navigate} from 'react-router-dom';

const Protected = ({route}) => {
    if ( route === 'loggedin'){
        return (
        <div>
            <Outlet/>
        </div>
    );
    }
    return <Navigate to='/login'/>
};

export default Protected; 