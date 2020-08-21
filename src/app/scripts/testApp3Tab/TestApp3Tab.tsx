import * as React from "react";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import Content from "./Content";
import SidePanel from "./SidePanel";
/**
 * State for the testApp3TabTab React component
 */
export interface ITestApp3TabState extends ITeamsBaseComponentState {
    entityId?: string;
    frameContext: string;
}

/**
 * Properties for the testApp3TabTab React component
 */
export interface ITestApp3TabProps {

}

/**
 * Implementation of the TestAPP3Tab content page
 */
export class TestApp3Tab extends TeamsBaseComponent<ITestApp3TabProps, ITestApp3TabState> {

    public async componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));


        if (await this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.getContext((context: any) => {
                microsoftTeams.appInitialization.notifySuccess();
                this.setState({
                    entityId: context.entityId,
                    frameContext: context.frameContext
                });

                this.updateTheme(context.theme);
            });

        } else {
            this.setState({
                entityId: "This is not hosted in Microsoft Teams"
            });
        }
    }

    /**
     * The render() method to create the UI of the tab
     */
    public render() {
        return (
            this.state.frameContext === "content" ?
                <Content theme={this.state.theme} entityId={this.state.entityId}></Content> :
            this.state.frameContext === "sidePanel" ?
                <SidePanel></SidePanel> : null
        );
    }
}
