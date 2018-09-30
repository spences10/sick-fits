import Link from 'next/link'

const Nav = props => {
  return (
    <React.Fragment>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
      <Link href="/">
        <a>Home</a>
      </Link>
    </React.Fragment>
  )
}

Nav.propTypes = {}

export default Nav
