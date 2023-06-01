import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import App from "../app/App";
import { ReduxStoreProviderDecorator } from "./decorators/ReduxStoreProviderDecorator";

export default {
  title: "App",
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

export const AppExample: ComponentStory<typeof App> = () => <App demo={true} />;
