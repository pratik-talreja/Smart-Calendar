import React from 'react'
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarWrap,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute
} from './SidebarElements';

const Sidebar = ({isOpen, toggle}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
          <CloseIcon />
      </Icon>
      <SidebarWrapper>
          <SidebarMenu>
              <SidebarLink to="about">Why Donna?
              </SidebarLink>
              <SidebarLink to="calendar">Calendar
              </SidebarLink>
              <SidebarLink to="features">Features
              </SidebarLink>
              <SidebarLink to="notifications">Notifications
              </SidebarLink>
          </SidebarMenu>
      </SidebarWrapper>
<SideBtnWrap>
    <SidebarRoute to='/signin'>Sign In</SidebarRoute>
</SideBtnWrap>
    </SidebarContainer>
  )
}

export default Sidebar;
