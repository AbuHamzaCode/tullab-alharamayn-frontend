import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'


//private routes for application
const PrivateRoutes = () => {
    const isLogged = useSelector(state => state.mainReducer.isLogged);
    return (
        isLogged ? <Outlet /> : <Navigate to="/login" />
    )
}

export default (PrivateRoutes);