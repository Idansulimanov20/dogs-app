import { Link,NavLink,Outlet,useParams } from "react-router-dom"

function Header() {
    return <header>
    <Link to='/'>Home</Link>
    <NavLink to='/page/1'>Page 1</NavLink>
    <NavLink to='/page/2'>Page 2</NavLink>
    <NavLink to='/page/3'>Page 3</NavLink>
    </header>
}
export function Content() {
    const params = useParams();
    return <h2>This is page {params.num}</h2>
}

export function Page({num}) {
    return<>
    <Header/>
  <Outlet/>
    </>
}
