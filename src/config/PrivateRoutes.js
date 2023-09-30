import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'


/**
 * Use when strictly should everyone logged
 * @returns if user logged given access all routes otherwise navigate to login page
 */
const PrivateRoutes = () => {
    const isLogged = useSelector(state => state.mainReducer.isLogged);
    return (
        isLogged ? <Outlet /> : <Navigate to="/login" />
    )
}

export default (PrivateRoutes);