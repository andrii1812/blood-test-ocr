import React = require("react");
import { IngestResult } from "../model/state";
import { Card, CardHeader, CardText, TextField } from "material-ui";
import TestResult from "./TestResult";

interface IResultDisplayProps {
    data: IngestResult,
    references: string[]
}

export default class ResultsDisplay extends React.Component { //<IResultDisplayProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            "data":{
                "date":"10.07.2018",
                "values":[["RBC—Alyuvarlar","2.99"],["Hâlâ—Hemoglobin","8.8"],["_li_lÇTıljematokrit","24.8"],["_MÇX","82.9"],["MÇFL","29.4"],["MCHC","35.5"],["RDW—SD","37.2"],["RDW","12.3"],["WBC-Akyuvarlar","5.55"],["Nötrofil","84.1"],["Lenfosit","13.7"],["Monosit 1_3",0],["Eozinofil","0.0"],["Bazofil","0.9"],["Nötrofil","4.67"],["Lenfosit","0.76"],["Monosit","0.07"],["Eozinofil","0.00"],["Bazofil","0.05"],["PLT-Trombosit","98"],["MPV","10.2"],["PDW","12.0"],["PCT","0.10"]],
                "url":"/static/img/images/IMG_20180710_170326_1.jpg"
            },
            "references":["RBC-Alyuvarlar","HGB-Hemoglobin","HCT-Hematokrit","MCV","MCH","MCHC","RDW-SD","RDW","WBC-Akyuvarlar","Nötrofıl%","Lenfosıt%","Monosıt%","Eosınofıl%","Basofıl%","Nötrofıl#","Lenfosıt#","Monosıt#","Eosınofıl#","Basofıl#","PLT-Trombosit","MPV","PDW","PCT","GLUKOZ, AÇLIK","KALSIUM (CA), TOTAL, SERUM","MAGNESIUM (Mg), TOTAL, SERUM","CRP, KANTITATIF","SODYUM (Na), SERUM","POTASYUM (K), SERUM","aPPT","PT%#","PROTROMBIN ZAMANI","PTIRN#","tFGH (CKD-EPI)#","tFGH (MDRD)#","KREATININ, SERUM#","ÜRE, SERUM","ÜRIK ACIT, SERUM","PROTEIN, TOTAL, SERUM","ALBUMIN, SERUM","MAGNESYUM (Mg), SERUM","SGOT (AST)","SGPT (ALT)","ALP (ALKALEN FOSFATAZ)","GGT (G-GLUTAMIL TRANSFERAZ)","LDH (LAKTAK DEHID.), SERUM","BILIRUBIN, DIREKT, SERUM","BILIRUBIN, TOTAL"]
            };
    }

    render() {
        return (
            <Card>
                <CardHeader title="Parsed results"/>
                <CardText>
                    <div>
                        <div>Date:</div>
                        {this.state.data.date}
                    </div>
                    <div>
                    {this.state.data.values.map(x => {
                        return <TestResult name={x[0]} value={x[1]} references={this.state.references}/>
                    })}  
                    </div>                  
                </CardText>
            </Card>
        )
    }   
}