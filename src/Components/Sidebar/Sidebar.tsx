import React from "react";
import { CSSTransition } from "react-transition-group";

import { Wrapper, CloseIconWrapper, Footer, Header, Body } from "./elements";
import { IPathWithIcon } from "@src/types/path";
import Logo from "@src/components/Logo";
import SidebarNav from "@src/components/SidebarNav";
import getIcon from "@src/icons";

const CloseIcon = getIcon("Close");

const sidebarLinks: IPathWithIcon[] = [
  { path: "/catalog", label: "Katalog", icon: "Catalog" },
  { path: "/contact", label: "Kontakt", icon: "Contact" },
];

export const Sidebar: React.FC<{
  sidebarStatus: boolean;
  onClose?: () => void;
}> = ({ sidebarStatus, onClose }) => (
  <CSSTransition
    in={sidebarStatus}
    timeout={200}
    classNames="sidebar"
    unmountOnExit
  >
    <Wrapper>
      <Header>
        {onClose && (
          <CloseIconWrapper onClick={onClose}>
            <CloseIcon />
          </CloseIconWrapper>
        )}
      </Header>
      <Body>
        <SidebarNav items={sidebarLinks} />
      </Body>
      <Footer>
        <Logo small />
      </Footer>
    </Wrapper>
  </CSSTransition>
);
