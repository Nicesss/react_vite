import './index.less'
import { Outlet, Link } from 'react-router-dom'
export default function Main() {
    return (
        <div id="main">
            <div id="sider">
                <ul>
                    <li>
                        <Link to={`/module-1`}>module-1</Link>
                    </li>
                    <li>
                        <Link to={`/module-2`}>module-2</Link>
                    </li>
                    <li>
                        <Link to={`/module-3`}>module-3</Link>
                    </li>
                </ul>
            </div>
            <div id="content">
                <Outlet />
            </div>
        </div>
    )
}