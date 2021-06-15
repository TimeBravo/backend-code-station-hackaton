import { container } from "tsyringe";

import TwilioProvider from "./implementations/TwilioProvider";
import IMessageProvider from "./models/IMessageProvider";

container.registerSingleton<IMessageProvider>("MessageProvider", TwilioProvider);
