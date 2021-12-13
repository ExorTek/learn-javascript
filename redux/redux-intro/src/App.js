import Counter from './component/Counter';
import Counter2 from './component/Counter2';
import { routes } from './constants/routes';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function App () {
    const { user } = useSelector(state => state.auth);
    return (
        <Router>
            <div style={{ marginLeft: '1em', marginTop: '1em' }}>
                {/*Component 1*/}
                {/*<Counter/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*Component 2*/}
                {/*<Counter2/>*/}
                <Link to="/" style={{ marginRight: '1em' }}>Home</Link>
                <Link to="/about" style={{ marginRight: '1em' }}>About</Link>
                <Link to="/profile" style={{ marginRight: '1em' }}>Profile</Link>
                <Link to="/login" style={{ marginRight: '1em' }}>Login</Link>
                <br/>
                <br/>
                <Switch>
                    {routes.map(route => (
                        <Route exact={route.exact} path={route.path} render={() => {
                            if (route.auth && !user) {
                                return <Redirect to={'/login'}/>
                            }
                            return <route.component/>
                        }}>
                        </Route>
                    ))}
                </Switch>
            </div>
        </Router>


    );
}