import * as React from "react";
import { Provider, Flex, Header, Input } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

export interface ITestApp3TabConfigState extends ITeamsBaseComponentState {
    value: string;
}

export interface ITestApp3TabConfigProps {

}

/**
 * Implementation of TestAPP3Tab configuration page
 */
export class TestApp3TabConfig  extends TeamsBaseComponent<ITestApp3TabConfigProps, ITestApp3TabConfigState> {

    public async componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));

        if (await this.inTeams()) {
            microsoftTeams.initialize();

            microsoftTeams.getContext((context: microsoftTeams.Context) => {
                this.setState({
                    value: context.entityId
                });
                this.updateTheme(context.theme);
                microsoftTeams.settings.setValidityState(true);
                microsoftTeams.appInitialization.notifySuccess();
            });

            microsoftTeams.settings.registerOnSaveHandler((saveEvent: microsoftTeams.settings.SaveEvent) => {
                // Calculate host dynamically to enable local debugging
                const host = "https://" + window.location.host;
                microsoftTeams.settings.setSettings({
                    contentUrl: host + "/testApp3Tab/?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}",
                    websiteUrl: host + "/testApp3Tab/?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}",
                    suggestedDisplayName: "TestAPP3Tab",
                    removeUrl: host + "/testApp3Tab/remove.html?theme={theme}",
                    entityId: this.state.value
                });
                saveEvent.notifySuccess();
            });
        } else {
        }
    }

    public render() {
        return (
            <Provider theme={this.state.theme}>
                <Flex fill={true}>
                    <Flex.Item>
                        <div>
                            <Header content="Configure your tab" />
                            <Input
                                placeholder="Enter a value here"
                                fluid
                                clearable
                                value={this.state.value}
                                onChange={(e, data) => {
                                    if (data) {
                                        this.setState({
                                            value: data.value
                                        });
                                    }
                                }}
                                required />
                        </div>
                    </Flex.Item>
                </Flex>
            </Provider>
        );
    }
}
