import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/testApp3Tab/index.html")
@PreventIframe("/testApp3Tab/config.html")
@PreventIframe("/testApp3Tab/remove.html")
export class TestApp3Tab {
}
