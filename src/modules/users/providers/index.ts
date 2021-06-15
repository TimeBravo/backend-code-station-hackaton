import BCryptHashProvider from "@modules/users/providers/hashProvider/implementations/BCryptHashProvider";
import IHashProvider from "@modules/users/providers/hashProvider/models/IHashProvider";
import { container } from "tsyringe";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
