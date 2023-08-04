import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as portals from 'react-reverse-portal';

import { styled } from '../../styles';

import { SendStore } from '../../model/send/send-store';

import { ThemedContainerSizedEditor } from '../editor/base-editor';

import { SplitPane } from '../split-pane';
import { RequestPane } from './request-pane';
import { ResponsePane } from './response-pane';

const SendPageContainer = styled.div`
    height: 100vh;
    position: relative;
`;

@inject('sendStore')
@observer
export class SendPage extends React.Component<{
    sendStore?: SendStore
}> {

    private requestEditorNode = portals.createHtmlPortalNode<typeof ThemedContainerSizedEditor>({
        attributes: { 'style': 'height: 100%' }
    });
    private responseEditorNode = portals.createHtmlPortalNode<typeof ThemedContainerSizedEditor>({
        attributes: { 'style': 'height: 100%' }
    });

    render() {
        const {
            requestInput,
            sendRequest,
            sentExchange
        } = this.props.sendStore!;

        return <SendPageContainer>
            <SplitPane
                split='vertical'
                primary='second'
                defaultSize='50%'
                minSize={300}
                maxSize={-300}
            >
                <RequestPane
                    requestInput={requestInput}
                    sendRequest={sendRequest}
                    editorNode={this.requestEditorNode}
                />
                <ResponsePane
                    exchange={sentExchange}
                    editorNode={this.responseEditorNode}
                />
            </SplitPane>

            <portals.InPortal node={this.requestEditorNode}>
                <ThemedContainerSizedEditor contentId={null} />
            </portals.InPortal>
            <portals.InPortal node={this.responseEditorNode}>
                <ThemedContainerSizedEditor contentId={null} />
            </portals.InPortal>
        </SendPageContainer>;
    }

}