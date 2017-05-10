import { EnvStore, Project } from '../../../common';
import { NodeEnvProvider } from '../provider.class';
export declare const command: (store: EnvStore<Project, NodeEnvProvider<Project>>) => Promise<boolean>;
