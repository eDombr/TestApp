import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";

interface IContentProps {
    theme: any;
    entityId: string | undefined;
}

const Content: React.FC<IContentProps> = (props) => {

    return (
        <Provider theme={props.theme}>
            <Flex fill={true} column styles={{
                padding: ".8rem 0 .8rem .5rem"
            }}>
                <Flex.Item>
                    <Header content="This is your tab" />
                </Flex.Item>
                <Flex.Item>
                    <div>

                        <div>
                            <Text content={props.entityId} />
                        </div>

                        <div>
                            <Button onClick={() => alert("It worked!")}>A sample button</Button>
                        </div>
                    </div>
                </Flex.Item>
                <Flex.Item styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    <Text size="smaller" content="(C) Copyright SolbegSoft" />
                </Flex.Item>
            </Flex>
        </Provider>
    );
};

export default Content;
