// ** React Imports
import classNames from 'classnames'
import {useEffect, useState, Fragment} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

// ** Reactstrap Imports
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap'

const TabComponent = ({
  data = [],
  vertical = false,
  pillVertical = 3,
  classNavLink = '',
  RightNavComponent = null,
  ...rest
}) => {
  // ** Router Dom
  const {type} = useParams()
  const navigate = useNavigate()

  // ** State
  const [active, setActive] = useState(1)

  useEffect(() => {
    if (data.length > 0) {
      data.forEach(d => {
        if (d.param && d.param === type) {
          setActive(d.id)
        }
      })
    }
  }, [data, type])

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const RowElement = rest.pills && vertical ? Row : 'div'
  const ColElement = rest.pills && vertical ? Col : Fragment

  return (
    <RowElement
      className={classNames({
        'nav-vertical': vertical && rest.pills === undefined,
      })}
    >
      <ColElement md={pillVertical} sm="12">
        <div className="d-flex justify-content-between align-item-center">
          <Nav {...rest} vertical={vertical && rest.pills}>
            {data.length > 0 &&
              data.map((nav, idx) => (
                <NavItem key={idx}>
                  <NavLink
                    active={active === nav.id}
                    onClick={() => {
                      if (nav.navigate) {
                        navigate(nav.navigate)
                      } else {
                        toggle(nav.id)
                      }
                    }}
                    className={classNavLink}
                    disabled={nav.disabled}
                  >
                    {nav.icon}
                    {nav.name}
                  </NavLink>
                </NavItem>
              ))}
          </Nav>
          {RightNavComponent && <div>{RightNavComponent}</div>}
        </div>
      </ColElement>

      <ColElement md={12 - pillVertical} sm="12">
        <TabContent className="py-50" activeTab={active}>
          {data.length > 0 &&
            data.map((tab, idx) => (
              <TabPane tabId={tab.id} key={idx}>
                {tab.component}
              </TabPane>
            ))}
        </TabContent>
      </ColElement>
    </RowElement>
  )
}
export default TabComponent
