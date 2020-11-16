import React, { Component } from "react";
import {Cittadino} from "../components/Cittadino";
import {ListaTransazioni} from "../components/ListaTransazioni";


export class Sheet extends Component {
    public render() {
        return (
                <>
                
                <Cittadino/>
                
                <hr/>
                
                <ListaTransazioni/>

                </>
                );
    }

}