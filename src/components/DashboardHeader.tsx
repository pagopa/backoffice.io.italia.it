import React, { Component }  from "react";
import {Link} from "react-router-dom";
import { UncontrolledDropdown, DropdownToggle,
    DropdownMenu, Button }
    from 'reactstrap';
import { getUserAgentApplication } from "../helpers/msal";


export class DashboardHeader extends Component {
    public onSignOut = async () => {
        const userAgentApplication = getUserAgentApplication();
        sessionStorage.clear();
        userAgentApplication.logout();
        
      };

    public render() {
        return (
                <>
                    <nav className="navbar navbar-dark bg-dark justify-content-between">
                        <Link to="/"
                        className="text-white">
                        PagoPA
                        </Link>

                        <div className=" d-flex align-items-center">
                            <UncontrolledDropdown
                                nav
                                tag="div"
                            >
                                <DropdownToggle
                                aria-haspopup
                                caret
                                className="text-white"
                                nav
                                >
                                Check IBAN

                                </DropdownToggle>
                                <DropdownMenu
                                flip
                                tag="div"
                                right
                                className="p-2"
                                >
                                    <div>
                                    <input type="text" placeholder="IBAN"
                                            className="mb-2" />
                                    <Button
                                    color="primary"
                                    tag="button"
                                    >
                                    Verifica
                                    </Button>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <div className="it-access-top-wrapper">
                                <Button
                                color="primary"
                                size="sm"
                                tag="button"
                                onClick={this.onSignOut}
                                >
                                Log-out
                                </Button>
                            </div>
                        </div>
                    </nav>

                </>
                
        );
    }
}