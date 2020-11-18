import React, { Component , useState }  from "react";
import {Link} from "react-router-dom";
import { UncontrolledDropdown, DropdownToggle,
    DropdownMenu, Button }
    from 'reactstrap';
import { getUserAgentApplication } from "../helpers/msal";


export class DashboardHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedUser: ""
        };
      }

    public onSignOut = async () => {
        const userAgentApplication = getUserAgentApplication();
        sessionStorage.clear();
        userAgentApplication.logout();
      };

    public componentDidMount = async () => {
        const idToken = await getUserAgentApplication().getAccount().idToken;
        this.setState({ loggedUser: `${idToken.given_name} ${idToken.family_name} / ${idToken.emails[0]}` });
    }

    public render() {
        return (
                <>
                    <nav className="navbar navbar-dark bg-dark justify-content-between">
                        <Link to="/"
                        className="text-white">
                        PagoPA
                        </Link>

                        <div className=" d-flex align-items-center">
                            <div className="text-white small mr-3">
                            {this.state.loggedUser}
                            </div>
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